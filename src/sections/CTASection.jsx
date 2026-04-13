import Icon from "../components/Icon";
import { Link } from "react-router-dom";

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
            Ready to Find Help<br /><span style={{ color: "#3EC6C8" }}>Around You?</span>
          </h2>
          <p className="mt-4 text-gray-300 max-w-lg mx-auto">
            Be among the first Nigerians to experience AroundYou — get things done faster, safer, and smarter.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/waitlist?role=customer"
              className="px-8 py-3.5 rounded-full text-base font-semibold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#3EC6C8" }}>
              <Icon name="smartphone" size={18} color="white" />
              Join our Waitlist
            </Link>
            
            <Link
              to="/waitlist?role=worker"
              className="px-8 py-3.5 rounded-full text-base font-semibold text-white flex items-center justify-center gap-2 transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              Become a Provider
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
