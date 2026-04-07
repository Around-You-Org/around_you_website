const WAITLIST_FUNCTION_NAME = 'waitlist-signup'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const WORKER_SERVICE_OPTIONS = [
  'Driver',
  'Hair Stylist',
  'Barber',
  'Cleaner',
  'Chef/Caterer',
  'Plumber',
  'Electrician',
  'AC/Refrigeration Technician',
  'Carpenter/Furniture Maker',
  'Tailor/Fashion Designer',
  'Makeup Artist',
  'Nanny/Babysitter',
  'Dispatch/Delivery',
  'Security',
  'Fumigation/Pest Control',
  'Generator Repair',
  'Solar/Inverter Installation',
  'CCTV Installation',
  'Mechanic/Auto Electrician',
  'Painter',
  'Bricklayer/Mason',
  'Gardener',
  'Event Planner/Decorator',
  'Photographer/Videographer',
]

export async function submitWaitlistSignup(payload) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return {
      status: 'error',
      code: 'MISSING_CONFIG',
      message: 'Waitlist is not fully configured yet. Please try again soon.',
    }
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL.replace(/\/$/, '')}/functions/v1/${WAITLIST_FUNCTION_NAME}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      },
    )

    const data = await response.json().catch(() => null)

    if (!data?.status) {
      return {
        status: 'error',
        code: 'BAD_RESPONSE',
        message: 'We could not confirm your waitlist request. Please try again.',
      }
    }

    return data
  } catch {
    return {
      status: 'error',
      code: 'NETWORK_ERROR',
      message: 'Network error. Please check your connection and try again.',
    }
  }
}

export async function verifyWaitlistSignup(token) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return {
      status: 'error',
      code: 'MISSING_CONFIG',
      message: 'Waitlist is not fully configured yet.',
    }
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL.replace(/\/$/, '')}/functions/v1/verify-waitlist`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ token }),
      },
    )

    const data = await response.json().catch(() => null)

    if (!data?.status) {
      return {
        status: 'error',
        code: 'BAD_RESPONSE',
        message: 'Could not verify the link at this time.',
      }
    }

    return data
  } catch {
    return {
      status: 'error',
      code: 'NETWORK_ERROR',
      message: 'Network error. Please check your connection and try again.',
    }
  }
}
