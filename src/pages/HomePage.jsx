import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import CTASection from "../sections/CTASection";
import ContactSection from "../sections/ContactSection";
import ServicesSection from "../sections/ServicesSection";
import TrustSection from "../sections/TrustSection";
import { MobiledashboardHTML, DesktopdashboardHTML } from "../components/mockup";


const steps = [
  {
    icon: "map-pin",
    color: "#0D6B6E",
    bg: "rgba(13,107,110,0.1)",
    num: "1",
    numBg: "#0D6B6E",
    title: "Share Location",
    desc: "Open the app and let GPS find verified professionals near you instantly.",
  },
  {
    icon: "user-check",
    color: "#3EC6C8",
    bg: "rgba(62,198,200,0.1)",
    num: "2",
    numBg: "#3EC6C8",
    title: "Pick a Pro",
    desc: "Browse ratings, reviews, and pricing. Choose the best match for your need.",
  },
  {
    icon: "check-circle",
    color: "#6EE7A8",
    bg: "rgba(110,231,168,0.1)",
    num: "3",
    numBg: "#6EE7A8",
    numColor: "#0B1D3A",
    title: "Get It Done",
    desc: "Track arrival in real-time, chat in-app, and pay securely when done.",
  },
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
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Mobile Dashboard HTML ───────────────────────────────────────────────────────


// ── Device Mockup ─────────────────────────────────────────────────────────────
function DeviceMockup() {
  return (
    <>
      {/* === LAPTOP — visible on md+ === */}
      <div className="hidden md:flex justify-center items-center animate-[float_4s_ease-in-out_infinite]">
        <div
          className="relative"
          style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.45))" }}
        >
          {/* Lid / Screen bezel */}
          <div
            className="relative rounded-t-2xl overflow-hidden"
            style={{
              width: "680px",
              height: "420px",
              background: "#1a1a2e",
              border: "3px solid rgba(255,255,255,0.15)",
              borderBottom: "none",
            }}
          >
            {/* Notch / camera */}
            <div
              className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
              style={{ background: "#2d2d45" }}
            />
            {/* Screen inner bezel */}
            <div
              className="absolute inset-0 m-2 rounded-xl overflow-hidden"
              style={{ background: "#000" }}
            >
              <iframe
                srcDoc={DesktopdashboardHTML}
                title="Around You Dashboard"
                className="w-full h-full border-none"
                style={{
                  transform: "scale(0.6)",
                  transformOrigin: "top left",
                  width: "167%",
                  height: "167%",
                  pointerEvents: "auto",
                }}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
            {/* Screen glare */}
            <div
              className="absolute inset-0 pointer-events-none rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Hinge bar */}
          <div
            style={{
              height: "6px",
              background: "linear-gradient(180deg,#2a2a3e,#111122)",
              borderRadius: "0 0 2px 2px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />

          {/* Base / keyboard */}
          <div
            style={{
              width: "680px",
              height: "22px",
              background: "linear-gradient(180deg,#1e1e32,#141428)",
              borderRadius: "0 0 12px 12px",
              border: "2px solid rgba(255,255,255,0.08)",
              borderTop: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Trackpad hint */}
            <div
              style={{
                width: "100px",
                height: "10px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Bottom foot shadow */}
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "linear-gradient(180deg,rgba(0,0,0,0.4),transparent)",
              borderRadius: "0 0 50% 50%",
            }}
          />
        </div>
      </div>

      {/* === PHONE — visible on mobile only === */}
      <div className="flex md:hidden justify-center items-center animate-[float_4s_ease-in-out_infinite]">
        <div
          className="relative"
          style={{
            width: "290px",
            filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.5))",
          }}
        >
          {/* Phone body */}
          <div
            style={{
              background: "#111122",
              borderRadius: "40px",
              padding: "10px",
              border: "3px solid rgba(255,255,255,0.15)",
            }}
          >
            {/* Dynamic island / notch */}
            <div
              className="flex justify-center mb-1"
              style={{ height: "20px", alignItems: "center" }}
            >
              <div
                style={{
                  width: "90px",
                  height: "24px",
                  background: "#000",
                  borderRadius: "12px",
                }}
              />
            </div>

            {/* Screen */}
            <div
              style={{
                width: "266px",
                height: "540px",
                borderRadius: "28px",
                overflow: "hidden",
                background: "#000",
              }}
            >
              <iframe
                srcDoc={MobiledashboardHTML}
                title="Around You Dashboard Mobile"
                className="border-none"
                style={{
                  width: "400px",
                  height: "850px",
                  transform: "scale(0.665)",
                  transformOrigin: "top left",
                  pointerEvents: "auto",
                }}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>

            {/* Home bar */}
            <div className="flex justify-center mt-2">
              <div
                style={{
                  width: "100px",
                  height: "5px",
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "3px",
                }}
              />
            </div>
          </div>

          {/* Side buttons */}
          <div
            className="absolute"
            style={{
              right: "-5px",
              top: "100px",
              width: "4px",
              height: "50px",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "2px",
            }}
          />
          <div
            className="absolute"
            style={{
              left: "-5px",
              top: "90px",
              width: "4px",
              height: "30px",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "2px",
            }}
          />
          <div
            className="absolute"
            style={{
              left: "-5px",
              top: "130px",
              width: "4px",
              height: "50px",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    </>
  );
}

function HomePage() {
  useScrollReveal();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative w-full overflow-hidden min-h-screen flex flex-col justify-end"
        style={{
          background:
            "linear-gradient(135deg,#0B1D3A 0%,#0D6B6E 50%,#0B1D3A 100%)",
        }}
      >
        {/* Blobs */}
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 pointer-events-none animate-[float_6s_ease-in-out_infinite]"
          style={{ background: "#3EC6C8", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 pointer-events-none animate-[float_6s_ease-in-out_2s_infinite]"
          style={{ background: "#6EE7A8", filter: "blur(100px)" }}
        />
        <div className="absolute top-32 right-20 w-3 h-3 rounded-full bg-[#6EE7A8] opacity-70 animate-[float_4s_ease-in-out_1s_infinite]" />
        <div className="absolute top-48 left-32 w-2 h-2 rounded-full bg-[#3EC6C8] opacity-70 animate-[float_4s_ease-in-out_2s_infinite]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-44 md:pb-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left animate-[fadeUp_0.7s_ease-out_both]">
            <div
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-6"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div className="w-3 h-3 rounded-full bg-[#6EE7A8]" />
              <span className="text-base font-semibold text-white/90">
                Coming soon....
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Everything You Need,
              <br />
              <span style={{ color: "#3EC6C8" }}>Right Around You</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
              Instantly connect with trusted artisans, drivers, cleaners,
              handymen, and more. All GPS-matched and ready to help.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/waitlist?role=customer"
                className="px-8 py-3.5 rounded-full text-base font-semibold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg,#0D6B6E,#3EC6C8)",
                }}
              >
                <Icon name="download" size={18} color="white" />
                Join our Waitlist
              </Link>
            </div>

            {/* Development status */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center lg:justify-items-start">
              {[
                {
                  title: "Alpha Stage",
                  text: "Core functionality is being built and tested.",
                  icon: "wrench",
                },
                {
                  title: "Beta Launch",
                  text: "Early testers will help refine user flow.",
                  icon: "user-check",
                },
                {
                  title: "Production Ready",
                  text: "Full platform rollout expected soon.",
                  icon: "rocket",
                },
              ].map(({ title, text, icon }) => (
                <div
                  key={title}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-5 w-full max-w-xs"
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Icon name={icon} size={16} color="#6EE7A8" />
                    <p className="text-xs text-white/80 uppercase tracking-wider">
                      {title}
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-gray-200">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Device Mockup */}
          <div className="flex-1 flex justify-center">
            <DeviceMockup />
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            preserveAspectRatio="none"
            className="block w-full h-14"
          >
            <path
              d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 45V100H0V40Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-6 bg-white scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "rgba(13,107,110,0.08)",
                color: "#0D6B6E",
              }}
            >
              Simple Process
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0B1D3A]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              How It Works
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              Three simple steps to get help from a vetted professional near
              you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(
              ({ icon, color, bg, num, numBg, numColor, title, desc }) => (
                <div key={title} className="text-center group">
                  <div
                    className="relative mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ background: bg }}
                  >
                    <Icon name={icon} size={32} color={color} />
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
                      style={{
                        background: numBg,
                        color: numColor || "white",
                        fontFamily: "'Sora', sans-serif",
                      }}
                    >
                      {num}
                    </div>
                  </div>
                  <h3
                    className="font-semibold text-lg text-[#0B1D3A]"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                    {desc}
                  </p>
                </div>
              ),
            )}
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
