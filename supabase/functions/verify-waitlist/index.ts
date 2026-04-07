import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const CANONICAL_SITE_URL = 'https://aroundyou.com.ng'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const brevoApiKey = Deno.env.get('BREVO_API_KEY') || ''
const brevoListId = Number(Deno.env.get('BREVO_LIST_ID') || '')
const brevoSenderEmail = Deno.env.get('BREVO_SENDER_EMAIL') || 'info@aroundyou.com.ng'
const brevoSenderName = Deno.env.get('BREVO_SENDER_NAME') || 'AroundYou'
const aroundYouSiteUrl = resolveAroundYouSiteUrl()

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
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
}

function resolveAroundYouSiteUrl() {
  const configuredUrl = (Deno.env.get('AROUNDYOU_SITE_URL') || CANONICAL_SITE_URL).trim()

  try {
    const parsedUrl = new URL(configuredUrl)

    if (parsedUrl.hostname === 'aroundyou.ng') {
      parsedUrl.hostname = 'aroundyou.com.ng'
    }

    return parsedUrl.origin
  } catch {
    return CANONICAL_SITE_URL
  }
}

function jsonResponse(
  payload: { status: 'success' | 'error'; message: string; code?: string },
  httpStatus = 200,
) {
  return new Response(JSON.stringify(payload), {
    status: httpStatus,
    headers: corsHeaders,
  })
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
  if (!supabaseAdmin) return false
  if (!brevoApiKey || Number.isNaN(brevoListId) || brevoListId <= 0) return false

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
          SMS: signup.phone || '',
          ROLE: signup.role,
          SERVICES: signup.services?.join(', ') || '',
          LOCATION: signup.location,
          REFERRAL_SOURCE: signup.referral_source || '',
        },
      }),
    })

    if (!response.ok) {
      console.error('Brevo sync failed', await response.text())
      return false
    }

    await supabaseAdmin
      .from('waitlist_signups')
      .update({ brevo_synced: true })
      .eq('id', signup.id)

    return true
  } catch (error) {
    console.error('Unexpected Brevo sync failure', error)
    return false
  }
}

function buildWaitlistEmailHtml(signup: { name: string; role: string; services: string[]; location: string }) {
  const safeName = escapeHtml(signup.name)
  const safeLocation = escapeHtml(signup.location)
  const roleLabel = signup.role === 'worker' ? 'worker' : 'customer'
  const servicesLabel =
    signup.role === 'worker' && signup.services && signup.services.length > 0
      ? escapeHtml(signup.services.join(', '))
      : 'Trusted local services near you'
  const waitlistUrl = `${aroundYouSiteUrl.replace(/\/$/, '')}/waitlist?referral_source=${encodeURIComponent('Friend or family')}`
  const logoUrl = `${aroundYouSiteUrl.replace(/\/$/, '')}/logo.png`

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to the AroundYou Waitlist</title>
  </head>
  <body style="margin:0;padding:0;background:#F4F7F8;font-family:Inter,Arial,sans-serif;color:#0B1D3A;color-scheme:light only;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F4F7F8;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border-radius:32px;overflow:hidden;background:#FFFFFF;box-shadow:0 24px 70px rgba(11,29,58,0.18);">
            <tr>
              <td bgcolor="#0B1D3A" style="background:#0B1D3A;background-image:linear-gradient(135deg,#0B1D3A 0%,#0D6B6E 55%,#0B1D3A 100%);padding:40px 32px 32px;">
                <img src="${logoUrl}" width="72" height="72" alt="AroundYou" style="display:block;width:72px;height:72px;border-radius:20px;border:1px solid rgba(255,255,255,0.24);object-fit:cover;margin:0 0 24px;" />
                <p style="margin:0;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:#6EE7A8 !important;font-weight:700;-webkit-text-fill-color:#6EE7A8;">
                  <span style="color:#6EE7A8 !important;-webkit-text-fill-color:#6EE7A8;">AROUNDYOU WAITLIST</span>
                </p>
                <h1 style="margin:16px 0 0;font-size:36px;line-height:1.1;color:#FFFFFF !important;font-family:Sora,Inter,Arial,sans-serif;font-weight:700;-webkit-text-fill-color:#FFFFFF;text-shadow:0 2px 12px rgba(0,0,0,0.35);">
                  <span style="color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF;">You’re officially on the</span>
                  <span style="color:#3EC6C8 !important;-webkit-text-fill-color:#3EC6C8;"> AroundYou </span>
                  <span style="color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF;">waitlist</span>
                </h1>
                <p style="margin:18px 0 0;font-size:16px;line-height:1.8;color:#EAF4F4 !important;-webkit-text-fill-color:#EAF4F4;">
                  <span style="color:#EAF4F4 !important;-webkit-text-fill-color:#EAF4F4;">Hi ${safeName}, thanks for joining as a</span>
                  <strong style="color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF;"> ${roleLabel}</strong>
                  <span style="color:#EAF4F4 !important;-webkit-text-fill-color:#EAF4F4;"> in</span>
                  <strong style="color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF;"> ${safeLocation}</strong>
                  <span style="color:#EAF4F4 !important;-webkit-text-fill-color:#EAF4F4;">. We’ll email you first when AroundYou launches in your city.</span>
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

                <div style="margin-top:28px;text-align:center;">
                  <a href="${waitlistUrl}" style="display:inline-block;background:linear-gradient(135deg,#0D6B6E,#3EC6C8);color:#FFFFFF;text-decoration:none;padding:16px 32px;border-radius:999px;font-size:15px;font-weight:700;box-shadow:0 16px 40px rgba(13,107,110,0.25);">
                    Share the waitlist
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function buildWaitlistEmailText(signup: { name: string; role: string; services: string[]; location: string }) {
  const waitlistUrl = `${aroundYouSiteUrl.replace(/\/$/, '')}/waitlist?referral_source=${encodeURIComponent('Friend or family')}`
  return `Hi ${signup.name},\n\nYou're officially on the AroundYou waitlist as a ${signup.role} in ${signup.location}.\nWe'll email you first when AroundYou launches in your city.\n\nShare the waitlist: ${waitlistUrl}\n\nAroundYou`
}

async function sendWaitlistWelcomeEmail(signup: {
  id: string
  name: string
  email: string
  role: string
  services: string[]
  location: string
}) {
  if (!brevoApiKey || !brevoSenderEmail) return false

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: brevoSenderEmail, name: brevoSenderName },
        to: [{ email: signup.email, name: signup.name }],
        subject: "You're on the AroundYou waitlist",
        htmlContent: buildWaitlistEmailHtml(signup),
        textContent: buildWaitlistEmailText(signup),
      }),
    })

    if (!response.ok) {
      console.error('Welcome email failed:', await response.text())
      return false
    }
    return true
  } catch (error) {
    console.error('Email failure', error)
    return false
  }
}

serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return jsonResponse({ status: 'error', code: 'METHOD_NOT_ALLOWED', message: 'POST only' }, 405)
  }

  if (!supabaseAdmin) {
    return jsonResponse({ status: 'error', code: 'SERVER_ERROR', message: 'Not configured' }, 500)
  }

  const { token } = await request.json().catch(() => ({}))

  if (!token) {
    return jsonResponse({ status: 'error', code: 'MISSING_TOKEN', message: 'Invalid or missing link.' }, 400)
  }

  // Find the signup by token
  const { data: signup, error: findError } = await supabaseAdmin
    .from('waitlist_signups')
    .select('*')
    .eq('verification_token', token)
    .single()

  if (findError || !signup) {
    return jsonResponse({ status: 'error', code: 'INVALID_TOKEN', message: 'This verification link is invalid or has expired.' }, 400)
  }

  if (signup.is_verified) {
    return jsonResponse({ status: 'success', code: 'ALREADY_VERIFIED', message: 'You have already verified your spot on the waitlist!' })
  }

  // Mark as verified
  const { error: updateError } = await supabaseAdmin
    .from('waitlist_signups')
    .update({ is_verified: true })
    .eq('id', signup.id)

  if (updateError) {
    return jsonResponse({ status: 'error', code: 'VERIFY_FAILED', message: 'Could not verify your spot. Try again later.' }, 500)
  }

  // Send to Brevo
  await syncBrevoContact(signup)

  // Send the Welcome Email
  const welcomeEmailSent = await sendWaitlistWelcomeEmail(signup)

  return jsonResponse({
    status: 'success',
    code: welcomeEmailSent ? 'VERIFIED' : 'VERIFIED_WELCOME_EMAIL_FAILED',
    message: welcomeEmailSent
      ? 'Your spot is now officially secured! We have sent you a welcome email.'
      : 'Your spot is now officially secured! You are verified, even if the welcome email does not arrive right away.',
  })
})
