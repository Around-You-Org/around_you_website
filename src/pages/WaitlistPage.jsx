import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import {
  WORKER_SERVICE_OPTIONS,
  submitWaitlistSignup,
} from '../lib/waitlistApi'

const ROLE_OPTIONS = [
  {
    value: 'customer',
    label: 'Customer',
    description: 'I want early access to trusted services near me.',
    icon: 'user-round',
  },
  {
    value: 'worker',
    label: 'Worker',
    description: 'I want to offer services and get discovered by customers.',
    icon: 'briefcase',
  },
]

const REFERRAL_SOURCES = [
  'Friend or family',
  'Instagram',
  'LinkedIn',
  'X / Twitter',
  'Facebook',
  'Google search',
  'Event or community',
  'Other',
]

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  phone: '',
  role: 'customer',
  services: [],
  otherServiceRequest: '',
  location: '',
  referral_source: '',
  company: '',
}

function getInitialRole(searchParams) {
  const role = searchParams.get('role')
  return role === 'worker' ? 'worker' : 'customer'
}

function buildServicesPayload(role, services, otherServiceRequest) {
  if (role !== 'worker') return []

  const uniqueServices = new Set(
    services.map((service) => service.trim()).filter(Boolean),
  )
  const customService = otherServiceRequest.trim()

  if (customService) uniqueServices.add(customService)

  return Array.from(uniqueServices)
}

function WaitlistPage() {
  const [searchParams] = useSearchParams()
  const [formState, setFormState] = useState({
    ...INITIAL_FORM_STATE,
    role: getInitialRole(searchParams),
    referral_source: searchParams.get('referral_source') || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({
    status: 'idle',
    message: '',
    code: '',
  })
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
  }, [])

  const selectedServices = useMemo(
    () =>
      buildServicesPayload(
        formState.role,
        formState.services,
        formState.otherServiceRequest,
      ),
    [formState.otherServiceRequest, formState.role, formState.services],
  )

  const updateField = (name, value) => {
    setFormState((current) => ({
      ...current,
      [name]: value,
      ...(name === 'role' && value === 'customer'
        ? { services: [], otherServiceRequest: '' }
        : {}),
    }))
  }

  const toggleService = (service) => {
    setFormState((current) => {
      const nextServices = current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service]

      return {
        ...current,
        services: nextServices,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if ((formState.company || '').trim().length > 0) {
      setFeedback({
        status: 'error',
        code: 'HONEYPOT_REJECTED',
        message: 'We could not process this request.',
      })
      return
    }

    if (formState.role === 'worker' && selectedServices.length === 0) {
      setFeedback({
        status: 'error',
        code: 'MISSING_SERVICES',
        message: 'Please select at least one service or request a new one.',
      })
      return
    }

    setIsSubmitting(true)
    setShareMessage('')
    setFeedback({ status: 'idle', message: '', code: '' })

    const result = await submitWaitlistSignup({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      role: formState.role,
      services: selectedServices,
      location: formState.location,
      referral_source: formState.referral_source,
      company: formState.company,
    })

    setFeedback({
      status: result.status,
      message: result.message,
      code: result.code || '',
    })

    if (result.status === 'success') {
      setFormState((current) => ({
        ...INITIAL_FORM_STATE,
        role: current.role,
      }))
    }

    setIsSubmitting(false)
  }

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

  const showSuccessPanel =
    feedback.status === 'success' || 
    feedback.status === 'already_joined' ||
    feedback.status === 'verification_required'

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg,#0B1D3A 0%,#0D6B6E 50%,#0B1D3A 100%)',
      }}
    >
      <Helmet>
        <title>Waitlist - AroundYou</title>
        <meta
          name="description"
          content="Join the AroundYou waitlist to get early access to trusted local services in your city. Sign up as a customer or worker and be the first to experience AroundYou."
        />
      </Helmet>

    
      <div
        className="absolute top-16 right-10 h-72 w-72 rounded-full opacity-10"
        style={{ background: '#3EC6C8', filter: 'blur(90px)' }}
      />
      <div
        className="absolute bottom-16 left-10 h-80 w-80 rounded-full opacity-10"
        style={{ background: '#6EE7A8', filter: 'blur(100px)' }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="text-white">

          <div
            className="mt-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          >
            <span className="h-2 w-2 rounded-full bg-[#6EE7A8]" />
            Early access waitlist
          </div>

          <h1
            className="mt-6 text-4xl font-bold leading-tight md:text-5xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Join the first wave of people building{' '}
            <span style={{ color: '#3EC6C8' }}>AroundYou</span>.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 md:text-lg">
            Sign up as a customer or worker, help shape the launch, and get
            notified the moment AroundYou goes live in your city.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: 'shield-check',
                title: 'Private and secure',
                text: 'Your signup is stored in Supabase and synced securely to Brevo for launch emails.',
              },
              {
                icon: 'map-pin',
                title: 'City-based rollout',
                text: 'We use city location to prioritize where workers and customers want us first.',
              },
              {
                icon: 'sparkles',
                title: 'Worker discovery',
                text: 'Workers can request services that are not yet listed, so we can expand supply fast.',
              },
              {
                icon: 'rocket',
                title: 'Launch notifications',
                text: 'Everyone on the waitlist can be notified directly by email at launch.',
              },
            ].map(({ icon, title, text }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Icon name={icon} size={20} color="#6EE7A8" />
                  </div>
                  <h2 className="text-base font-semibold">{title}</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-white/15 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0D6B6E]">
                Waitlist signup
              </p>
              <h2
                className="mt-2 text-3xl font-bold text-[#0B1D3A]"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Reserve your spot
              </h2>
            </div>

            <div className="inline-flex rounded-full bg-[#F1F7F7] p-1">
              {ROLE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateField('role', value)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    formState.role === value
                      ? 'bg-[#0D6B6E] text-white'
                      : 'text-[#0B1D3A]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {showSuccessPanel && (
            <div
              className={`mt-8 rounded-3xl border p-6 ${
                feedback.status === 'success' || feedback.status === 'verification_required'
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-cyan-200 bg-cyan-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    feedback.status === 'success' || feedback.status === 'verification_required'
                      ? 'bg-emerald-100'
                      : 'bg-cyan-100'
                  }`}
                >
                  <Icon
                    name={
                      feedback.status === 'success' || feedback.status === 'verification_required'
                        ? 'check-circle'
                        : 'clock-3'
                    }
                    size={22}
                    color={
                      feedback.status === 'success' || feedback.status === 'verification_required' ? '#059669' : '#0E7490'
                    }
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#0B1D3A]">
                    {feedback.status === 'success'
                      ? "You're officially on the waitlist!"
                      : feedback.status === 'verification_required'
                      ? 'Check your email to verify your spot'
                      : 'You are already on the waitlist'}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {feedback.message}
                  </p>
                  {feedback.status !== 'verification_required' && (
                    <>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Want faster momentum? Share AroundYou with a friend,
                        teammate, or service provider in your city.
                      </p>
                      <button
                        type="button"
                        onClick={shareWaitlist}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0D6B6E] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <Icon name="share-2" size={16} color="white" />
                        Share waitlist link
                      </button>
                      {shareMessage && (
                        <p className="mt-3 text-xs font-medium text-gray-600">
                          {shareMessage}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {!showSuccessPanel && (
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <input
                type="text"
                name="company"
                value={formState.company}
                onChange={(event) => updateField('company', event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-[#0B1D3A]">
                    Full Name *
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(event) =>
                      updateField('name', event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-[#F8FAFB] px-4 py-3 text-sm text-[#0B1D3A] outline-none transition-all focus:border-[#3EC6C8] focus:ring-2 focus:ring-[#3EC6C8]/30"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[#0B1D3A]">
                    Email Address *
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(event) =>
                      updateField('email', event.target.value)
                    }
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-[#F8FAFB] px-4 py-3 text-sm text-[#0B1D3A] outline-none transition-all focus:border-[#3EC6C8] focus:ring-2 focus:ring-[#3EC6C8]/30"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-[#0B1D3A]">
                    Phone Number *
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={(event) =>
                      updateField('phone', event.target.value)
                    }
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+234 801 234 5678"
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-[#F8FAFB] px-4 py-3 text-sm text-[#0B1D3A] outline-none transition-all focus:border-[#3EC6C8] focus:ring-2 focus:ring-[#3EC6C8]/30"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-[#0B1D3A]">
                    City / Location *
                  </span>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formState.location}
                    onChange={(event) =>
                      updateField('location', event.target.value)
                    }
                    placeholder="Lagos, Abuja, Asaba..."
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-[#F8FAFB] px-4 py-3 text-sm text-[#0B1D3A] outline-none transition-all focus:border-[#3EC6C8] focus:ring-2 focus:ring-[#3EC6C8]/30"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="text-sm font-medium text-[#0B1D3A]">
                    Referral Source
                  </span>
                  <select
                    name="referral_source"
                    value={formState.referral_source}
                    onChange={(event) =>
                      updateField('referral_source', event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-[#F8FAFB] px-4 py-3 text-sm text-[#0B1D3A] outline-none transition-all focus:border-[#3EC6C8] focus:ring-2 focus:ring-[#3EC6C8]/30"
                  >
                    <option value="">How did you hear about us?</option>
                    {REFERRAL_SOURCES.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {ROLE_OPTIONS.map(({ value, label, description, icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateField('role', value)}
                    className={`rounded-3xl border p-5 text-left transition-all ${
                      formState.role === value
                        ? 'border-[#0D6B6E] bg-[#EAF7F7]'
                        : 'border-gray-200 bg-white hover:border-[#3EC6C8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                          formState.role === value
                            ? 'bg-[#0D6B6E]'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          name={icon}
                          size={20}
                          color={
                            formState.role === value ? 'white' : '#0B1D3A'
                          }
                        />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-[#0B1D3A]">
                          {label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {value === 'customer'
                            ? 'Find trusted help'
                            : 'Offer your skills'}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {description}
                    </p>
                  </button>
                ))}
              </div>

              {formState.role === 'worker' && (
                <div className="rounded-4xl border border-gray-200 bg-[#F8FAFB] p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#0B1D3A]">
                        Services you can offer *
                      </p>
                      <p className="text-xs text-gray-500">
                        Choose one or more services, or request a missing one.
                      </p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D6B6E]">
                      {selectedServices.length} selected
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {WORKER_SERVICE_OPTIONS.map((service) => {
                      const isSelected = formState.services.includes(service)

                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-[#0D6B6E] bg-[#0D6B6E] text-white'
                              : 'border-gray-200 bg-white text-[#0B1D3A] hover:border-[#3EC6C8]'
                          }`}
                        >
                          {service}
                        </button>
                      )
                    })}
                  </div>

                  <label className="mt-5 block">
                    <span className="text-sm font-medium text-[#0B1D3A]">
                      Request another service
                    </span>
                    <input
                      type="text"
                      name="other_service_request"
                      value={formState.otherServiceRequest}
                      onChange={(event) =>
                        updateField(
                          'otherServiceRequest',
                          event.target.value,
                        )
                      }
                      placeholder="Tell us a service we should add"
                      className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0B1D3A] outline-none transition-all focus:border-[#3EC6C8] focus:ring-2 focus:ring-[#3EC6C8]/30"
                    />
                  </label>
                </div>
              )}

              {feedback.status === 'error' && (
                <div className="flex items-start gap-3 rounded-3xl border border-red-200 bg-red-50 p-4">
                  <Icon name="alert-circle" size={20} color="#DC2626" />
                  <div>
                    <p className="text-sm font-semibold text-red-700">
                      Could not submit signup
                    </p>
                    <p className="mt-1 text-sm text-red-600">
                      {feedback.message}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: 'linear-gradient(135deg,#0D6B6E,#3EC6C8)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <Icon
                      name="loader-circle"
                      size={20}
                      color="white"
                      className="animate-spin"
                    />
                    Joining waitlist...
                  </>
                ) : (
                  <>
                    Join waitlist
                    <Icon name="arrow-right" size={18} color="white" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default WaitlistPage
