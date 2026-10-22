import StoreBadges from "../components/StoreBadges";

function CTASection() {
  return (
    <section className="py-20 px-6 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative bg-[#0B1D3A]">
        {/* single, static spotlight — consistent with the hero */}
        <div
          className="pointer-events-none absolute right-[-80px] top-[-60px] h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(62,198,200,0.18), transparent 70%)" }}
        />
        <div className="relative z-10 p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
            Find help, <span style={{ color: "#3EC6C8" }}>right around you.</span>
          </h2>
          <p className="mt-4 text-gray-300 max-w-lg mx-auto">
            Download AroundYou and get things done faster, safer, and smarter.
          </p>
          <div className="mt-8 flex flex-col items-center gap-5">
            <StoreBadges className="justify-center" />

            <a
              href="#contact-section"
              className="text-sm font-semibold text-white/90 underline underline-offset-4 transition-colors hover:text-white">
              Become a Provider
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
