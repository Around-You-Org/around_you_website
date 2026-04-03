import { useEffect } from "react";
import Icon from "../components/Icon";
import CTASection from "../sections/CTASection";
import ContactSection from "../sections/ContactSection";
import ServicesSection from "../sections/ServicesSection";
import TrustSection from "../sections/TrustSection";

  const steps = [
    { icon: "map-pin", color: "#0D6B6E", bg: "rgba(13,107,110,0.1)", num: "1", numBg: "#0D6B6E", title: "Share Location", desc: "Open the app and let GPS find verified professionals near you instantly." },
    { icon: "user-check", color: "#3EC6C8", bg: "rgba(62,198,200,0.1)", num: "2", numBg: "#3EC6C8", title: "Pick a Pro", desc: "Browse ratings, reviews, and pricing. Choose the best match for your need." },
    { icon: "check-circle", color: "#6EE7A8", bg: "rgba(110,231,168,0.1)", num: "3", numBg: "#6EE7A8", numColor: "#0B1D3A", title: "Get It Done", desc: "Track arrival in real-time, chat in-app, and pay securely when done." },
  ];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}


// ── Phone Mockup ──────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative animate-[float_4s_ease-in-out_infinite]">
      <div
        className="relative w-72 h-130 rounded-[2.5rem] p-3"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(14px)",
          border: "2px solid rgba(62,198,200,0.3)",
        }}
      >
        <div
          className="w-full h-full rounded-4xl overflow-hidden"
          style={{ background: "linear-gradient(180deg,#e8faf7 0%,#d3f4ec 50%,#bff1e6 100%)" }}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center">
                  <Icon name="user" size={16} color="#0D6B6E" />
                </div>
                <p className="text-sm font-bold text-[#0B1D3A]">Discover Services</p>
              </div>
              <div className="flex items-center gap-2 text-[#0D6B6E]">
                <Icon name="bell" size={16} />
                <Icon name="search" size={16} />
              </div>
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {[
                { label: "Artisans", active: false },
                { label: "Handymen", active: true },
                { label: "Helpers", active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${item.active ? "bg-[#0D6B6E] text-white" : "bg-white/80 text-[#0D6B6E]"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="relative rounded-2xl h-64 mb-4 border border-white/30 shadow-inner bg-linear-to-b from-[#b1e9da] to-[#d8f5ee]">
              <div className="absolute left-4 top-4 inline-flex items-center gap-1 text-xs text-[#0D6B6E] font-semibold">
                <Icon name="map-pin" size={12} />
                <span>0.8km away</span>
              </div>
              <div className="absolute left-10 top-20 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                <Icon name="wrench" size={14} color="#0D6B6E" />
              </div>
              <div className="absolute right-10 top-14 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                <Icon name="user" size={14} color="#0D6B6E" />
              </div>
              <div className="absolute left-20 top-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                <Icon name="map-pin" size={14} color="#0D6B6E" />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-lg border border-white/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-[#0B1D3A]">Adebayo S.</p>
                  <p className="text-xs text-gray-500">Professional Handyman</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  <Icon name="star" size={12} color="#059669" />
                  4.8
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span>📍 0.8km away</span>
                <span>·</span>
                <span>Available Now</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-xl border border-[#0D6B6E] px-3 py-2 text-xs font-semibold text-[#0D6B6E]">View Profile</button>
                <button className="flex-1 rounded-xl bg-[#0D6B6E] px-3 py-2 text-xs font-semibold text-white">Request Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




function HomePage() {
  useScrollReveal();
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
    {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden min-h-screen flex flex-col justify-end"
      style={{ background: "linear-gradient(135deg,#0B1D3A 0%,#0D6B6E 50%,#0B1D3A 100%)" }}>
      {/* Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 pointer-events-none animate-[float_6s_ease-in-out_infinite]"
        style={{ background: "#3EC6C8", filter: "blur(80px)" }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 pointer-events-none animate-[float_6s_ease-in-out_2s_infinite]"
        style={{ background: "#6EE7A8", filter: "blur(100px)" }} />
      <div className="absolute top-32 right-20 w-3 h-3 rounded-full bg-[#6EE7A8] opacity-70 animate-[float_4s_ease-in-out_1s_infinite]" />
      <div className="absolute top-48 left-32 w-2 h-2 rounded-full bg-[#3EC6C8] opacity-70 animate-[float_4s_ease-in-out_2s_infinite]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-44 md:pb-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left animate-[fadeUp_0.7s_ease-out_both]">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="w-3 h-3 rounded-full bg-[#6EE7A8]" />
            <span className="text-base font-semibold text-white/90">Coming soon....</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}>
            Everything You Need,<br />
            <span style={{ color: "#3EC6C8" }}>Right Around You</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
            Instantly connect with trusted artisans, drivers, cleaners, handymen, and more. All GPS-matched and ready to help.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="px-8 py-3.5 rounded-full text-base font-semibold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg,#0D6B6E,#3EC6C8)" }}>
              <Icon name="download" size={18} color="white" />
              Join our Waitlist
            </button>

            {/* <button className="px-8 py-3.5 rounded-full text-base font-semibold text-white flex items-center justify-center gap-2 transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Icon name="play-circle" size={18} color="white" />
              Watch Demo
            </button> */}
          </div>

          {/* Development status */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center lg:justify-items-start">
            {[
              { title: "Alpha Stage", text: "Core functionality is being built and tested.", icon: "wrench" },
              { title: "Beta Launch", text: "Early testers will help refine user flow.", icon: "user-check" },
              { title: "Production Ready", text: "Full platform rollout expected soon.", icon: "rocket" },
            ].map(({ title, text, icon }) => (
              <div key={title} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-5 w-full max-w-xs">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Icon name={icon} size={16} color="#6EE7A8" />
                  <p className="text-xs text-white/80 uppercase tracking-wider">{title}</p>
                </div>
                <p className="text-sm md:text-base text-gray-200">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phone */}
        <div className="flex-1 flex justify-center">
          <PhoneMockup />
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="block w-full h-14">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 45V100H0V40Z" fill="white" />
        </svg>
      </div>
    </section>

    {/* HOW IT WORK SECTION */}
      <section className="py-20 px-6 bg-white scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(13,107,110,0.08)", color: "#0D6B6E" }}>Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>How It Works</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">Three simple steps to get help from a vetted professional near you.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ icon, color, bg, num, numBg, numColor, title, desc }) => (
            <div key={title} className="text-center group">
              <div className="relative mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ background: bg }}>
                <Icon name={icon} size={32} color={color} />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{ background: numBg, color: numColor || "white", fontFamily: "'Sora', sans-serif" }}>
                  {num}
                </div>
              </div>
              <h3 className="font-semibold text-lg text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>{title}</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">{desc}</p>
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

