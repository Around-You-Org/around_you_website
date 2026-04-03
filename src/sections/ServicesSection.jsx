import Icon from "../components/Icon";

function ServicesSection() {
  const services = [
    { icon: "car", grad: "linear-gradient(135deg,#0D6B6E,#3EC6C8)", title: "Rides & Drivers", desc: "Private drivers, taxis, and ride-hailing, matched by proximity and rating." },
    { icon: "wrench", grad: "linear-gradient(135deg,#3EC6C8,#6EE7A8)", title: "Artisans & Handymen", desc: "Plumbers, electricians, carpenters, welders, skilled tradespeople you can trust." },
    { icon: "sparkles", grad: "linear-gradient(135deg,#6EE7A8,#0D6B6E)", title: "Cleaning & Domestic", desc: "Home cleaners, cooks, laundry services, and domestic assistants on demand." },
    { icon: "package", grad: "linear-gradient(135deg,#0D6B6E,#0B1D3A)", title: "Delivery & Errands", desc: "Quick deliveries, grocery runs, and errands handled by reliable dispatch riders." },
    { icon: "palette", grad: "linear-gradient(135deg,#3EC6C8,#0D6B6E)", title: "Beauty & Wellness", desc: "Hairstylists, barbers, makeup artists, and spa therapists at your doorstep." },
    { icon: "shield", grad: "linear-gradient(135deg,#6EE7A8,#3EC6C8)", title: "Security & Moving", desc: "Security escorts, movers, and logistics help when you need safe hands." },
  ];
  return (
    <section id="services-section" className="py-20 px-6 scroll-reveal opacity-0 translate-y-8 transition-all duration-700" style={{ background: "#f8fafb" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(62,198,200,0.1)", color: "#0D6B6E" }}>Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>One App, Endless Services</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">Whatever you need done, there's a verified professional around you ready to help.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon, grad, title, desc }) => (
            <div key={title}
              className="bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{ border: "1px solid #f0f0f0" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: grad }}>
                <Icon name={icon} size={22} color="white" />
              </div>
              <h3 className="font-semibold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>{title}</h3>
              <p className="mt-2 text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;