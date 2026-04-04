import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return

  const lines = fs.readFileSync(filePath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')

    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

loadEnvFile(path.join(projectRoot, '.env'))
loadEnvFile(path.join(projectRoot, '.env.local'))

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID || '')
const batchSize = Number(process.env.BREVO_RETRY_BATCH_SIZE || '100')

function assertConfig() {
  const missing = []
  if (!SUPABASE_URL) missing.push('SUPABASE_URL')
  if (!SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY')
  if (!BREVO_API_KEY) missing.push('BREVO_API_KEY')

  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`)
  }
}

async function fetchPendingSignups() {
  const url = new URL(
    '/rest/v1/waitlist_signups',
    SUPABASE_URL.replace(/\/$/, ''),
  )
  url.searchParams.set(
    'select',
    'id,name,email,phone,role,services,location,referral_source',
  )
  url.searchParams.set('brevo_synced', 'eq.false')
  url.searchParams.set('order', 'created_at.asc')
  url.searchParams.set('limit', String(batchSize))

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Could not fetch pending rows: HTTP ${response.status}`)
  }

  return response.json()
}

async function markSynced(signupId) {
  const url = new URL(
    '/rest/v1/waitlist_signups',
    SUPABASE_URL.replace(/\/$/, ''),
  )
  url.searchParams.set('id', `eq.${signupId}`)

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ brevo_synced: true }),
  })

  if (!response.ok) {
    throw new Error(
      `Could not mark signup ${signupId} as synced: HTTP ${response.status}`,
    )
  }
}

async function syncBrevoContact(signup) {
  const attributes = {
    FIRSTNAME: signup.name,
    ROLE: signup.role,
    SERVICES: Array.isArray(signup.services) ? signup.services.join(', ') : '',
    LOCATION: signup.location,
    REFERRAL_SOURCE: signup.referral_source || '',
  }

  if (signup.phone) {
    attributes.SMS = signup.phone
  }

  const body = {
    email: signup.email,
    updateEnabled: true,
    attributes,
  }

  if (!Number.isNaN(BREVO_LIST_ID) && BREVO_LIST_ID > 0) {
    body.listIds = [BREVO_LIST_ID]
  }

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(
      `Brevo sync failed for ${signup.email}: HTTP ${response.status} ${details}`,
    )
  }
}

async function main() {
  assertConfig()

  const pendingSignups = await fetchPendingSignups()
  if (!Array.isArray(pendingSignups) || pendingSignups.length === 0) {
    console.log('No pending Brevo sync rows found.')
    return
  }

  let syncedCount = 0
  let failedCount = 0

  for (const signup of pendingSignups) {
    try {
      await syncBrevoContact(signup)
      await markSynced(signup.id)
      syncedCount += 1
      console.log(`Synced ${signup.email}`)
    } catch (error) {
      failedCount += 1
      console.error(
        `Failed to sync ${signup.email}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      )
    }
  }

  console.log(
    `Brevo retry complete. Synced: ${syncedCount}. Failed: ${failedCount}.`,
  )
}

main().catch((error) => {
  console.error(
    error instanceof Error ? error.message : 'Brevo retry script failed.',
  )
  process.exitCode = 1
})
