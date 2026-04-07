import { useEffect, useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { verifyWaitlistSignup } from '../lib/waitlistApi'

function VerifyWaitlistPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [result, setResult] = useState(() =>
    token
      ? { status: 'loading', message: '', code: '' }
      : {
          status: 'error',
          message: 'Invalid verification link. The URL is missing a token.',
          code: 'MISSING_TOKEN',
        },
  )
  const [shareMessage, setShareMessage] = useState('')

  const shareUrl = useMemo(
    () =>
      `${window.location.origin}/waitlist?referral_source=${encodeURIComponent(
        'Friend or family',
      )}`,
    [],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (!token) {
      return
    }

    let isSubscribed = true

    async function verifyNow() {
      const result = await verifyWaitlistSignup(token)
      if (isSubscribed) {
        setResult({
          status: result.status,
          message: result.message || 'Verification complete.',
          code: result.code || '',
        })
      }
    }

    verifyNow()

    return () => {
      isSubscribed = false
    }
  }, [token])

  const shareWaitlist = async () => {
    const sharePayload = {
      title: 'Join the AroundYou Waitlist',
      text: 'I just joined AroundYou. Get early access to trusted local services too.',
      url: shareUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(sharePayload)
        setShareMessage('Thanks for sharing AroundYou with your network.')
        return
      }

      await navigator.clipboard.writeText(shareUrl)
      setShareMessage('Waitlist link copied. Share it with your friends.')
    } catch {
      setShareMessage(`Share this link: ${shareUrl}`)
    }
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center justify-center p-6"
      style={{
        background:
          'linear-gradient(135deg,#0B1D3A 0%,#0D6B6E 50%,#0B1D3A 100%)',
      }}
    >
      <Helmet>
        <title>Verify Waitlist - AroundYou</title>
      </Helmet>

      <div
        className="absolute top-16 right-10 h-72 w-72 rounded-full opacity-10"
        style={{ background: '#3EC6C8', filter: 'blur(90px)' }}
      />
      <div
        className="absolute bottom-16 left-10 h-80 w-80 rounded-full opacity-10"
        style={{ background: '#6EE7A8', filter: 'blur(100px)' }}
      />

      <div className="relative z-10 w-full max-w-md rounded-4xl border border-white/15 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
        {result.status === 'loading' && (
          <div className="flex flex-col items-center text-center">
            <Icon name="loader-circle" size={48} className="animate-spin text-[#0D6B6E]" />
            <h1 className="mt-6 text-2xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>
              Verifying your spot...
            </h1>
            <p className="mt-3 text-gray-600">Please wait while we secure your place on the AroundYou waitlist.</p>
          </div>
        )}

        {result.status === 'success' && (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 mb-6">
              <Icon name="check-circle-2" size={40} color="#059669" />
            </div>
            <h1 className="text-2xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>
              {result.code === 'ALREADY_VERIFIED'
                ? "You're already verified"
                : "You're verified!"}
            </h1>
            <p className="mt-3 text-gray-600">
              {result.message}
            </p>

            <div className="mt-8 w-full rounded-3xl bg-[#F8FAFB] p-6 border border-gray-100">
              <p className="text-sm font-semibold text-[#0B1D3A]">Help us grow faster</p>
              <p className="mt-1 text-xs text-gray-500">The more people in your city, the faster we launch.</p>
              
              <button
                type="button"
                onClick={shareWaitlist}
                className="mt-4 inline-flex w-full justify-center items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg,#0D6B6E,#3EC6C8)' }}
              >
                <Icon name="share-2" size={16} color="white" />
                Share Waitlist Link
              </button>
              {shareMessage && (
                <p className="mt-3 text-xs font-medium text-[#0D6B6E]">
                  {shareMessage}
                </p>
              )}
            </div>

            <Link
              to="/"
              className="mt-6 text-sm font-medium text-gray-500 hover:text-[#0D6B6E] transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        )}

        {result.status === 'error' && (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100 mb-6">
              <Icon name="alert-triangle" size={40} color="#DC2626" />
            </div>
            <h1 className="text-2xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>
              Verification Failed
            </h1>
            <p className="mt-3 text-gray-600">
              {result.message}
            </p>
            <Link
              to="/waitlist"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: '#0D6B6E' }}
            >
              Join Waitlist Again
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default VerifyWaitlistPage
