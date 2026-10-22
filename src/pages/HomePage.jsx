import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import Icon from "../components/Icon";
import useScrollReveal from "../hooks/useScrollReveal";
import CTASection from "../sections/CTASection";
import ContactSection from "../sections/ContactSection";
import ServicesSection from "../sections/ServicesSection";
import TrustSection from "../sections/TrustSection";
import StoreBadges from "../components/StoreBadges";
import PhoneFrame from "../components/PhoneFrame";

const howSteps = [
  {
    n: "01",
    title: "See who's nearby",
    img: "/screenshots/discover-map.webp",
    desc: "Open the map and see verified professionals around you — with live distance and who's available right now.",
  },
  {
    n: "02",
    title: "Request in a few taps",
    img: "/screenshots/request-service.webp",
    desc: "Choose a service, describe the job, drop your address and send. The nearest available pro to accept gets it.",
  },
  {
    n: "03",
    title: "Track it to done",
    img: "/screenshots/booking-status.webp",
    desc: "Follow every step from matched, to on-the-way, to complete — chat in-app and pay securely via Paystack.",
  },
];

function HomePage() {
  useScrollReveal();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>AroundYou - Connect with Trusted Professionals Instantly</title>
        <meta
          name="description"
          content="AroundYou connects you with trusted local professionals — plumbers, electricians, cleaners, drivers and more. GPS-matched, tracked live, and now available on iOS and Android."
        />
        <meta
          name="keywords"
          content="local services, trusted professionals, GPS matching, handyman, cleaner, driver, artisan, on-demand help, Nigeria"
        />
        <meta property="og:title" content="AroundYou – Connect with Trusted Professionals Instantly" />
        <meta property="og:description" content="Instantly connect with trusted artisans, drivers, cleaners, handymen, and more. All GPS-matched and ready to help." />
        <meta property="og:url" content="https://aroundyou.com.ng/" />
        <meta name="twitter:title" content="AroundYou – Connect with Trusted Professionals Instantly" />
        <meta name="twitter:description" content="Instantly connect with trusted artisans, drivers, cleaners, handymen, and more. All GPS-matched and ready to help." />
      </Helmet>

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[#0B1D3A]">
        {/* single, static product spotlight (no floating blobs) */}
        <div
          className="pointer-events-none absolute right-[-120px] top-24 h-[520px] w-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(62,198,200,0.16), transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 md:pt-32 md:pb-24 grid lg:grid-cols-2 items-center gap-12 lg:gap-8">
          {/* Copy */}
          <div className="text-center lg:text-left animate-[fadeUp_0.7s_ease-out_both]">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-white/90"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#6EE7A8]" />
              Now on iOS &amp; Android
            </span>

            <h1
              className="mt-6 text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Everyday help,
              <br />
              <span style={{ color: "#3EC6C8" }}>right around you.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 max-w-md mx-auto lg:mx-0">
              Book verified plumbers, electricians, cleaners, drivers and more — matched
              by GPS, tracked live, and paid securely when the job's done.
            </p>

            <StoreBadges className="mt-8 justify-center lg:justify-start" />

            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="shield-check" size={16} color="#6EE7A8" /> Verified providers
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="map-pin" size={16} color="#6EE7A8" /> Live tracking
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="lock" size={16} color="#6EE7A8" /> Secure payments
              </span>
            </div>
          </div>

          {/* Screens — the live map */}
          <div className="flex justify-center lg:justify-end">
            <PhoneFrame
              src="/screenshots/discover-map.webp"
              alt="Find verified professionals near you on the AroundYou map"
              priority
              className="w-[260px] sm:w-[280px] animate-[float_5s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* wave divider into the white section */}
        <div className="relative z-10 -mb-px">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-12">
            <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 45V80H0V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(13,107,110,0.08)", color: "#0D6B6E" }}
            >
              How it works
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0B1D3A]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              From need to done, in minutes
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              No phone calls, no guesswork. Here's the whole thing, start to finish.
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">
            {howSteps.map((s, i) => (
              <div
                key={s.n}
                className={`flex flex-col ${
                  i % 2 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-10 md:gap-16 scroll-reveal opacity-0 translate-y-8 transition-all duration-700`}
              >
                <div className="flex-1 flex justify-center">
                  <PhoneFrame src={s.img} alt={s.title} className="w-[228px] md:w-[248px]" />
                </div>
                <div className="flex-1 max-w-md text-center md:text-left">
                  <span className="text-sm font-bold tracking-[0.2em]" style={{ color: "#3EC6C8" }}>
                    {s.n}
                  </span>
                  <h3
                    className="mt-2 text-2xl md:text-3xl font-bold text-[#0B1D3A]"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
      <TrustSection />
      <CTASection />
      <ContactSection />
    </>
  );
}

export default HomePage;
