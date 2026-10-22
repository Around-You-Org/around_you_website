import Icon from "../components/Icon";
import PhoneFrame from "../components/PhoneFrame";

const pillars = [
  {
    icon: "shield-check",
    title: "Verified providers",
    desc: "Every provider is identity-verified before they can take jobs, so you know who's at your door.",
  },
  {
    icon: "lock",
    title: "Secure payments",
    desc: "Pay securely through Paystack after the job is done — no cash fumbling, no surprises.",
  },
  {
    icon: "briefcase",
    title: "Agree the price first",
    desc: "See and accept the price in chat before any work starts. What you agree is what you pay.",
  },
  {
    icon: "map-pin",
    title: "Track in real time",
    desc: "Follow your provider from matched, to on-the-way, to done — right on the map.",
  },
];

function TrustSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
          {/* Copy */}
          <div className="flex-1 text-center lg:text-left">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(110,231,168,0.18)", color: "#0D6B6E" }}
            >
              Trust &amp; safety
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight text-[#0B1D3A]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Book with confidence
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0">
              Verification, clear pricing, secure payments and live tracking — the
              safeguards that make hiring someone new feel safe.
            </p>

            <div className="mt-8 space-y-5 text-left">
              {pillars.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(13,107,110,0.1)" }}
                  >
                    <Icon name={icon} size={20} color="#0D6B6E" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B1D3A]">{title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div className="flex-1 flex justify-center">
            <PhoneFrame
              src="/screenshots/verified-worker.webp"
              alt="A verified provider profile in the AroundYou app"
              className="w-[228px] md:w-[250px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
