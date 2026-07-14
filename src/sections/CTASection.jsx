import StoreBadges from "../components/StoreBadges";

function CTASection() {
  return (
    <section className="py-20 px-6 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg,#0B1D3A,#0D6B6E)" }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-15 pointer-events-none"
          style={{ background: "#3EC6C8", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10 pointer-events-none"
          style={{ background: "#6EE7A8", filter: "blur(50px)" }} />
        <div className="relative z-10 p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
            Ready to Find Help<br /><span style={{ color: "#3EC6C8" }}>AroundYou?</span>
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
