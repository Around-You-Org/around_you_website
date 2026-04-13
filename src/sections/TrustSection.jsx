import Icon from "../components/Icon";

function TrustSection() {
  const pillars = [
    { icon: "shield-check", color: "#0D6B6E", bg: "rgba(13,107,110,0.1)", title: "ID Verified Professionals", desc: "Every service provider will go through NIN and government ID verification before joining the platform." },
    { icon: "lock", color: "#3EC6C8", bg: "rgba(62,198,200,0.1)", title: "Secure Payments", desc: "We are building a secure payment system so you only pay when you are satisfied with the service." },
    { icon: "star", color: "#6EE7A8", bg: "rgba(110,231,168,0.1)", title: "Reviews & Ratings", desc: "Transparent reviews from real customers will drive quality and accountability on the platform." },
  ];
  const stats = [
    { val: "15+", color: "#0D6B6E", label: "Service Categories", g: "linear-gradient(135deg,rgba(13,107,110,0.08),rgba(62,198,200,0.08))" },
    { val: "GPS", color: "#3EC6C8", label: "Proximity Matching", g: "linear-gradient(135deg,rgba(62,198,200,0.08),rgba(110,231,168,0.08))" },
    { val: "24/7", color: "#6EE7A8", label: "Planned Availability", g: "linear-gradient(135deg,rgba(110,231,168,0.08),rgba(13,107,110,0.08))" },
    { val: "4", color: "#0B1D3A", label: "Founding Team", g: "linear-gradient(135deg,rgba(11,29,58,0.06),rgba(13,107,110,0.08))" },
  ];
  return (
    <section className="py-20 px-6 bg-white scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(110,231,168,0.15)", color: "#0D6B6E" }}>Trust & Safety</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>
              Building on Trust,<br />Powered by <span style={{ color: "#0D6B6E" }}>Community</span>
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Every professional on AroundYou will go through identity verification, skill assessment, and background checks. Our rating system will ensure only the best stay on the platform.
            </p>
            <div className="mt-8 space-y-4">
              {pillars.map(({ icon, color, bg, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                    <Icon name={icon} size={20} color={color} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#0B1D3A]">{title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              {stats.map(({ val, color, label, g }) => (
                <div key={label} className="rounded-2xl p-5 text-center transition-transform hover:scale-105" style={{ background: g }}>
                  <p className="text-3xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color }}>{val}</p>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;