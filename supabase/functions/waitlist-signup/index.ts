import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const RATE_LIMIT_PER_MINUTE = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const brevoApiKey = Deno.env.get('BREVO_API_KEY') || ''
const brevoListId = Number(Deno.env.get('BREVO_LIST_ID') || '')
const brevoSenderEmail =
  Deno.env.get('BREVO_SENDER_EMAIL') || 'info@aroundyou.com.ng'
const brevoSenderName = Deno.env.get('BREVO_SENDER_NAME') || 'AroundYou'
const aroundYouSiteUrl =
  Deno.env.get('AROUNDYOU_SITE_URL') || 'https://aroundyou.ng'
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

function duplicateSignupResponse(field: 'email' | 'phone' | 'account' = 'account') {
  const messageMap = {
    email:
      'That email is already on the AroundYou waitlist. Please share the waitlist link with someone else in your city.',
    phone:
      'That phone number is already on the AroundYou waitlist. Please share the waitlist link with someone else in your city.',
    account:
      'That email or phone number is already on the AroundYou waitlist. Please share the waitlist link with someone else in your city.',
  }

  const codeMap = {
    email: 'DUPLICATE_EMAIL',
    phone: 'DUPLICATE_PHONE',
    account: 'DUPLICATE_SIGNUP',
  }

  return jsonResponse({
    status: 'already_joined',
    code: codeMap[field],
    message: messageMap[field],
  })
}

function normalizeText(value: unknown, maxLength = 120) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function normalizeEmail(value: unknown) {
  return normalizeText(value, 254).toLowerCase()
}

function normalizePhone(value: unknown) {
  const rawPhone = normalizeText(value, 32)
  if (!rawPhone) return ''

  let normalizedPhone = rawPhone.replace(/[^\d+]/g, '')

  if (normalizedPhone.startsWith('00')) {
    normalizedPhone = `+${normalizedPhone.slice(2)}`
  }

  if (/^0\d{10}$/.test(normalizedPhone)) {
    normalizedPhone = `+234${normalizedPhone.slice(1)}`
  }

  if (!normalizedPhone.startsWith('+')) {
    normalizedPhone = normalizedPhone.replace(/\+/g, '')
  } else {
    normalizedPhone = `+${normalizedPhone.slice(1).replace(/\+/g, '')}`
  }

  return normalizedPhone
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function normalizeBrevoErrorText(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80)
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

async function findExistingSignup(email: string, phone: string) {
  if (!supabaseAdmin) return null

  const [emailMatch, phoneMatch] = await Promise.all([
    supabaseAdmin
      .from('waitlist_signups')
      .select('id')
      .eq('email', email)
      .limit(1)
      .maybeSingle(),
    supabaseAdmin
      .from('waitlist_signups')
      .select('id')
      .eq('phone', phone)
      .limit(1)
      .maybeSingle(),
  ])

  if (emailMatch.error) {
    console.error('Waitlist duplicate email check failed', emailMatch.error.message)
    return { field: 'lookup_error' as const }
  }

  if (phoneMatch.error) {
    console.error('Waitlist duplicate phone check failed', phoneMatch.error.message)
    return { field: 'lookup_error' as const }
  }

  if (emailMatch.data) return { field: 'email' as const }
  if (phoneMatch.data) return { field: 'phone' as const }

  return null
}

async function syncBrevoContact(signup: {
  id: string
  name: string
  email: string
  phone: string
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
          SMS: signup.phone,
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

function buildWaitlistEmailHtml(signup: {
  name: string
  role: string
  services: string[]
  location: string
}) {
  const safeName = escapeHtml(signup.name)
  const safeLocation = escapeHtml(signup.location)
  const roleLabel = signup.role === 'worker' ? 'worker' : 'customer'
  const servicesLabel =
    signup.role === 'worker' && signup.services.length > 0
      ? escapeHtml(signup.services.join(', '))
      : 'Trusted local services near you'
  const waitlistUrl = `${aroundYouSiteUrl.replace(/\/$/, '')}/waitlist?referral_source=${encodeURIComponent(
    'Friend or family',
  )}`

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to the AroundYou Waitlist</title>
  </head>
  <body style="margin:0;padding:0;background:#F4F7F8;font-family:Inter,Arial,sans-serif;color:#0B1D3A;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F4F7F8;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border-radius:32px;overflow:hidden;background:#FFFFFF;box-shadow:0 24px 70px rgba(11,29,58,0.18);">
            <tr>
              <td style="background:linear-gradient(135deg,#0B1D3A 0%,#0D6B6E 55%,#0B1D3A 100%);padding:40px 32px 32px;">
                <p style="margin:0;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:#6EE7A8;font-weight:700;">AroundYou Waitlist</p>
                <h1 style="margin:16px 0 0;font-size:36px;line-height:1.1;color:#FFFFFF;font-family:Sora,Inter,Arial,sans-serif;font-weight:700;">
                  You’re officially on the <span style="color:#3EC6C8;">AroundYou</span> waitlist
                </h1>
                <p style="margin:18px 0 0;font-size:16px;line-height:1.8;color:#D5DEE7;">
                  Hi ${safeName}, thanks for joining as a <strong style="color:#FFFFFF;">${roleLabel}</strong> in <strong style="color:#FFFFFF;">${safeLocation}</strong>. We’ll email you first when AroundYou launches in your city.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F8FAFB;border:1px solid #E5ECEC;border-radius:24px;padding:24px;">
                  <tr>
                    <td>
                      <p style="margin:0;font-size:14px;font-weight:700;color:#0D6B6E;text-transform:uppercase;letter-spacing:0.16em;">Your signup summary</p>
                      <p style="margin:16px 0 0;font-size:15px;line-height:1.8;color:#425466;"><strong style="color:#0B1D3A;">Location:</strong> ${safeLocation}</p>
                      <p style="margin:8px 0 0;font-size:15px;line-height:1.8;color:#425466;"><strong style="color:#0B1D3A;">Role:</strong> ${roleLabel}</p>
                      <p style="margin:8px 0 0;font-size:15px;line-height:1.8;color:#425466;"><strong style="color:#0B1D3A;">Interest:</strong> ${servicesLabel}</p>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;">
                  <tr>
                    <td width="50%" style="padding-right:8px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #E5ECEC;border-radius:24px;padding:20px;">
                        <tr>
                          <td>
                            <p style="margin:0;font-size:15px;font-weight:700;color:#0B1D3A;">City-first rollout</p>
                            <p style="margin:10px 0 0;font-size:14px;line-height:1.7;color:#5E6B7A;">Your city helps us decide where to activate customers and workers first.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td width="50%" style="padding-left:8px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #E5ECEC;border-radius:24px;padding:20px;">
                        <tr>
                          <td>
                            <p style="margin:0;font-size:15px;font-weight:700;color:#0B1D3A;">Private by design</p>
                            <p style="margin:10px 0 0;font-size:14px;line-height:1.7;color:#5E6B7A;">We only use your details to manage early access and launch updates.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:28px;text-align:center;">
                  <a href="${waitlistUrl}" style="display:inline-block;background:linear-gradient(135deg,#0D6B6E,#3EC6C8);color:#FFFFFF;text-decoration:none;padding:16px 32px;border-radius:999px;font-size:15px;font-weight:700;box-shadow:0 16px 40px rgba(13,107,110,0.25);">
                    Share the waitlist
                  </a>
                  <p style="margin:16px 0 0;font-size:13px;line-height:1.7;color:#5E6B7A;">
                    Invite a friend, teammate, or service provider so we can grow your city faster.
                  </p>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px 32px;text-align:center;">
                <p style="margin:0;font-size:13px;line-height:1.7;color:#748191;">
                  Around<span style="color:#0D6B6E;font-weight:700;">You</span> • Connecting customers to trusted local services
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function buildWaitlistEmailText(signup: {
  name: string
  role: string
  services: string[]
  location: string
}) {
  const servicesText =
    signup.role === 'worker' && signup.services.length > 0
      ? signup.services.join(', ')
      : 'Trusted local services near you'
  const waitlistUrl = `${aroundYouSiteUrl.replace(/\/$/, '')}/waitlist?referral_source=${encodeURIComponent(
    'Friend or family',
  )}`

  return [
    `Hi ${signup.name},`,
    '',
    `You're officially on the AroundYou waitlist as a ${signup.role} in ${signup.location}.`,
    `Interest: ${servicesText}`,
    '',
    "We'll email you first when AroundYou launches in your city.",
    `Share the waitlist: ${waitlistUrl}`,
    '',
    'AroundYou',
    'Connecting customers to trusted local services',
  ].join('\n')
}

async function sendWaitlistWelcomeEmail(signup: {
  id: string
  name: string
  email: string
  role: string
  services: string[]
  location: string
}) {
  if (!brevoApiKey || !brevoSenderEmail) {
    console.error(
      'Waitlist welcome email skipped because BREVO_API_KEY or BREVO_SENDER_EMAIL is missing',
    )
    return {
      sent: false,
      code: 'WELCOME_EMAIL_CONFIG_MISSING',
    }
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          email: brevoSenderEmail,
          name: brevoSenderName,
        },
        to: [
          {
            email: signup.email,
            name: signup.name,
          },
        ],
        subject: "You're on the AroundYou waitlist",
        htmlContent: buildWaitlistEmailHtml(signup),
        textContent: buildWaitlistEmailText(signup),
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      const parsedDetails = JSON.parse(details || '{}') as {
        code?: string
        message?: string
      }
      console.error('Waitlist welcome email failed', {
        signupId: signup.id,
        status: response.status,
        details,
      })
      return {
        sent: false,
        code: `WELCOME_EMAIL_HTTP_${response.status}_${parsedDetails.code || 'ERROR'}_${normalizeBrevoErrorText(
          parsedDetails.message || 'unknown',
        )}`,
      }
    }

    return {
      sent: true,
      code: 'WELCOME_EMAIL_SENT',
    }
  } catch (error) {
    console.error('Unexpected waitlist welcome email failure', {
      signupId: signup.id,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return {
      sent: false,
      code: 'WELCOME_EMAIL_EXCEPTION',
    }
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
  const phone = normalizePhone(body.phone)
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

  if (!phone || phone.length > 20 || !PHONE_PATTERN.test(phone)) {
    return jsonResponse(
      {
        status: 'error',
        code: 'INVALID_PHONE',
        message:
          'Please provide a valid phone number with your country code, for example +2348012345678.',
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

  const existingSignup = await findExistingSignup(email, phone)
  if (existingSignup?.field === 'lookup_error') {
    return jsonResponse(
      {
        status: 'error',
        code: 'DUPLICATE_LOOKUP_FAILED',
        message: 'We could not verify your signup right now. Please try again.',
      },
      500,
    )
  }

  if (existingSignup?.field === 'email' || existingSignup?.field === 'phone') {
    return duplicateSignupResponse(existingSignup.field)
  }

  const { data, error } = await supabaseAdmin.rpc('insert_waitlist_signup', {
    p_name: name,
    p_email: email,
    p_phone: phone,
    p_role: role,
    p_services: role === 'worker' ? services : [],
    p_location: location,
    p_location_slug: locationSlug,
    p_referral_source: referralSource,
  })

  if (error) {
    console.error('Waitlist insert failed', error.message)

    if (error.code === '23505') {
      return duplicateSignupResponse('account')
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
    return duplicateSignupResponse('account')
  }

  await syncBrevoContact({
    id: insertedSignup.id,
    name,
    email,
    phone,
    role,
    services: role === 'worker' ? services : [],
    location,
    referral_source: referralSource,
  })

  const welcomeEmailResult = await sendWaitlistWelcomeEmail({
    id: insertedSignup.id,
    name,
    email,
    role,
    services: role === 'worker' ? services : [],
    location,
  })

  return jsonResponse({
    status: 'success',
    code: welcomeEmailResult.code,
    message:
      "You're on the AroundYou waitlist. We'll email you directly when we launch in your city.",
  })
})
