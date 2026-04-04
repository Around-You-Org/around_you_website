import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const RATE_LIMIT_PER_MINUTE = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const brevoApiKey = Deno.env.get('BREVO_API_KEY') || ''
const brevoListId = Number(Deno.env.get('BREVO_LIST_ID') || '')
const rateLimitSalt =
  Deno.env.get('WAITLIST_RATE_LIMIT_SALT') || 'aroundyou-waitlist'

const supabaseAdmin =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
}

function jsonResponse(
  payload: {
    status: 'success' | 'already_joined' | 'error'
    message: string
    code?: string
  },
  httpStatus = 200,
) {
  return new Response(JSON.stringify(payload), {
    status: httpStatus,
    headers: corsHeaders,
  })
}

function normalizeText(value: unknown, maxLength = 120) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function normalizeEmail(value: unknown) {
  return normalizeText(value, 254).toLowerCase()
}

function normalizeServices(value: unknown) {
  if (!Array.isArray(value)) return []

  const normalizedServices = new Map<string, string>()

  for (const item of value) {
    const service = normalizeText(item, 80)
    const key = service.toLowerCase()

    if (service && !normalizedServices.has(key)) {
      normalizedServices.set(key, service)
    }
  }

  return Array.from(normalizedServices.values())
}

function slugifyLocation(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function extractClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(',')
    const normalizedIp = firstIp?.trim()
    if (normalizedIp) return normalizedIp
  }

  return (
    request.headers.get('cf-connecting-ip')?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    '127.0.0.1'
  )
}

function getMinuteBucket() {
  return new Date(Math.floor(Date.now() / 60000) * 60000).toISOString()
}

async function hashRateKey(value: string) {
  const bytes = new TextEncoder().encode(`${rateLimitSalt}:${value}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function enforceRateLimit(clientIp: string, email: string) {
  if (!supabaseAdmin) {
    return { allowed: false, code: 'SERVER_NOT_CONFIGURED' }
  }

  const bucketStart = getMinuteBucket()
  const hashedIp = await hashRateKey(`ip:${clientIp}`)
  const hashedEmail = await hashRateKey(`email:${email}`)
  const hashedComposite = await hashRateKey(`pair:${clientIp}|${email}`)
  const rateKeys = [hashedIp, hashedEmail, hashedComposite]

  const rateChecks = await Promise.all(
    rateKeys.map((rateKey) =>
      supabaseAdmin.rpc('bump_waitlist_rate_limit', {
        p_rate_key: rateKey,
        p_window_start: bucketStart,
      }),
    ),
  )

  const hasRateLimitError = rateChecks.some(({ error }) => error)
  if (hasRateLimitError) {
    console.error(
      'Waitlist rate-limit update failed',
      rateChecks.map(({ error }) => error?.message).filter(Boolean),
    )
    return { allowed: false, code: 'RATE_LIMIT_ERROR' }
  }

  const isOverLimit = rateChecks.some(({ data }) => (data || 0) > RATE_LIMIT_PER_MINUTE)
  return {
    allowed: !isOverLimit,
    code: isOverLimit ? 'RATE_LIMITED' : undefined,
  }
}

async function syncBrevoContact(signup: {
  id: string
  name: string
  email: string
  role: string
  services: string[]
  location: string
  referral_source: string
}) {
  if (!supabaseAdmin) {
    console.error('Brevo sync skipped because Supabase admin is unavailable')
    return false
  }

  if (!brevoApiKey || Number.isNaN(brevoListId) || brevoListId <= 0) {
    console.error(
      'Brevo sync skipped because BREVO_API_KEY or BREVO_LIST_ID is missing',
    )
    return false
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: signup.email,
        updateEnabled: true,
        listIds: [brevoListId],
        attributes: {
          FIRSTNAME: signup.name,
          ROLE: signup.role,
          SERVICES: signup.services.join(', '),
          LOCATION: signup.location,
          REFERRAL_SOURCE: signup.referral_source || '',
        },
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      console.error('Brevo sync failed', {
        signupId: signup.id,
        status: response.status,
        details,
      })
      return false
    }

    const { error } = await supabaseAdmin
      .from('waitlist_signups')
      .update({ brevo_synced: true })
      .eq('id', signup.id)

    if (error) {
      console.error('Failed to mark Brevo sync success', {
        signupId: signup.id,
        error: error.message,
      })
      return false
    }

    return true
  } catch (error) {
    console.error('Unexpected Brevo sync failure', {
      signupId: signup.id,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return false
  }
}

serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return jsonResponse(
      {
        status: 'error',
        code: 'METHOD_NOT_ALLOWED',
        message: 'Only POST requests are allowed.',
      },
      405,
    )
  }

  if (!supabaseAdmin) {
    return jsonResponse(
      {
        status: 'error',
        code: 'SERVER_NOT_CONFIGURED',
        message: 'Waitlist service is not configured yet.',
      },
      500,
    )
  }

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return jsonResponse(
      {
        status: 'error',
        code: 'INVALID_JSON',
        message: 'Invalid request payload.',
      },
      400,
    )
  }

  const name = normalizeText(body.name, 120)
  const email = normalizeEmail(body.email)
  const role = normalizeText(body.role, 20).toLowerCase()
  const location = normalizeText(body.location, 120)
  const referralSource = normalizeText(body.referral_source, 160)
  const company = normalizeText(body.company, 120)
  const services = normalizeServices(body.services)

  if (company.length > 0) {
    return jsonResponse(
      {
        status: 'error',
        code: 'BOT_REJECTED',
        message: 'We could not process this request.',
      },
      400,
    )
  }

  if (!name) {
    return jsonResponse(
      {
        status: 'error',
        code: 'INVALID_NAME',
        message: 'Please provide your full name.',
      },
      400,
    )
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return jsonResponse(
      {
        status: 'error',
        code: 'INVALID_EMAIL',
        message: 'Please provide a valid email address.',
      },
      400,
    )
  }

  if (role !== 'customer' && role !== 'worker') {
    return jsonResponse(
      {
        status: 'error',
        code: 'INVALID_ROLE',
        message: 'Please choose whether you are joining as a customer or worker.',
      },
      400,
    )
  }

  if (!location) {
    return jsonResponse(
      {
        status: 'error',
        code: 'INVALID_LOCATION',
        message: 'Please provide your city so we can prioritize your location.',
      },
      400,
    )
  }

  if (role === 'worker' && services.length === 0) {
    return jsonResponse(
      {
        status: 'error',
        code: 'INVALID_SERVICES',
        message: 'Please select at least one service you can offer.',
      },
      400,
    )
  }

  const locationSlug = slugifyLocation(location)
  if (!locationSlug) {
    return jsonResponse(
      {
        status: 'error',
        code: 'INVALID_LOCATION',
        message: 'Please enter a valid city name.',
      },
      400,
    )
  }

  const clientIp = extractClientIp(request)
  const rateLimitResult = await enforceRateLimit(clientIp, email)

  if (!rateLimitResult.allowed) {
    return jsonResponse(
      {
        status: 'error',
        code: rateLimitResult.code || 'RATE_LIMITED',
        message:
          rateLimitResult.code === 'RATE_LIMITED'
            ? 'Too many waitlist attempts. Please try again in a minute.'
            : 'We could not process your request right now.',
      },
      rateLimitResult.code === 'RATE_LIMITED' ? 429 : 500,
    )
  }

  const { data, error } = await supabaseAdmin.rpc('insert_waitlist_signup', {
    p_name: name,
    p_email: email,
    p_role: role,
    p_services: role === 'worker' ? services : [],
    p_location: location,
    p_location_slug: locationSlug,
    p_referral_source: referralSource,
  })

  if (error) {
    console.error('Waitlist insert failed', error.message)

    if (error.code === '23505') {
      return jsonResponse(
        {
          status: 'already_joined',
          code: 'DUPLICATE_EMAIL',
          message:
            'That email is already on the AroundYou waitlist. Please share the waitlist link with someone else in your city.',
        },
        200,
      )
    }

    return jsonResponse(
      {
        status: 'error',
        code: 'DB_INSERT_FAILED',
        message: 'We could not save your signup right now. Please try again.',
      },
      500,
    )
  }

  const insertedSignup = Array.isArray(data) ? data[0] : null
  if (!insertedSignup) {
    return jsonResponse(
      {
        status: 'already_joined',
        code: 'DUPLICATE_EMAIL',
        message:
          'That email is already on the AroundYou waitlist. Please share the waitlist link with someone else in your city.',
      },
      200,
    )
  }

  await syncBrevoContact({
    id: insertedSignup.id,
    name,
    email,
    role,
    services: role === 'worker' ? services : [],
    location,
    referral_source: referralSource,
  })

  return jsonResponse({
    status: 'success',
    message:
      "You're on the AroundYou waitlist. We'll email you directly when we launch in your city.",
  })
})
