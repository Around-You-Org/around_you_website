import PhoneFrame from "../components/PhoneFrame";

const categories = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Carpentry",
  "AC Repair",
  "Laundry",
  "Hair & Beauty",
  "Painter",
  "Fumigation",
  "Generator Repair",
  "Gardening",
  "Baker",
];

function ServicesSection() {
  return (
    <section id="services-section" className="py-20 md:py-28 px-6 bg-[#f8fafb]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
          {/* Screenshot */}
          <div className="flex-1 flex justify-center order-2 lg:order-1">
            <PhoneFrame
              src="/screenshots/categories.webp"
              alt="Browse service categories in the AroundYou app"
              className="w-[228px] md:w-[250px]"
            />
          </div>

          {/* Copy */}
          <div className="flex-1 order-1 lg:order-2 text-center lg:text-left">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(62,198,200,0.12)", color: "#0D6B6E" }}
            >
              Our services
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0B1D3A]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              One app, every service
            </h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto lg:mx-0">
              From a leaking pipe to a last-minute haircut, book a verified pro for
              whatever you need — all in one place.
            </p>

            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2.5">
              {categories.map((c) => (
                <span
                  key={c}
                  className="px-4 py-2 rounded-full text-sm font-medium text-[#0B1D3A] bg-white border border-[#e8eef0]"
                >
                  {c}
                </span>
              ))}
            </div>

            <p className="mt-6 text-sm text-gray-400">
              …and more added as providers join.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
