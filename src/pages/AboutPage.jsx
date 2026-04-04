import Icon from "../components/Icon";
import { useEffect, useState } from "react";

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

function AboutPage() {
  useScrollReveal();
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    const formData = new FormData(event.target);
    try {
      const response = await fetch("https://formspree.io/f/xlgoppdo", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setFormStatus("Thank you! We received your message.");
        event.target.reset();
      } else {
        const data = await response.json();
        setFormStatus(data.error || "Oops! Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0B1D3A,#0D6B6E)" }}>
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: "#3EC6C8", filter: "blur(80px)" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(255,255,255,0.1)", color: "#6EE7A8" }}>Our Story</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            We're Building the Future<br />
            <span style={{ color: "#3EC6C8" }}>of Hyper Local Market Gig Platform</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            AroundYou was born from a simple idea: everyone deserves fast, reliable access to skilled professionals nearby. We're making that a reality across Nigeria.
          </p>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 px-6 scroll-reveal opacity-0 translate-y-8 transition-all duration-700" style={{ background: "#f8fafb" }}>
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(62,198,200,0.1)", color: "#0D6B6E" }}>About Us</span>
          <h2 className="text-3xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>Our story, mission, and vision</h2>
          <p className="mt-5 text-gray-500 max-w-3xl mx-auto leading-relaxed">
            At AroundYou, we started with the belief that local talent should not be hidden. Our story is rooted in community, our mission is to connect people with trusted service providers, and our vision is an Africa where every person can access the services they need, right around the corner.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow" style={{ border: "1px solid #e8f3f4" }}>
              <h3 className="text-lg font-semibold text-[#0B1D3A]">Our Story</h3>
              <p className="text-sm text-gray-500 mt-2">Born from a desire to make local services simple, we launched with grassroots connections in Nigeria.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow" style={{ border: "1px solid #e8f3f4" }}>
              <h3 className="text-lg font-semibold text-[#0B1D3A]">Our Mission</h3>
              <p className="text-sm text-gray-500 mt-2">Empower professionals and customers through trust, transparency, and affordable access.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow" style={{ border: "1px solid #e8f3f4" }}>
              <h3 className="text-lg font-semibold text-[#0B1D3A]">Our Vision</h3>
              <p className="text-sm text-gray-500 mt-2">A connected network of thriving local communities across every city in Africa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-white scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(13,107,110,0.08)", color: "#0D6B6E" }}>Our Mission</span>
            <h2 className="text-3xl font-bold text-[#0B1D3A] leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              Empowering Communities<br />Through <span style={{ color: "#0D6B6E" }}>Opportunity</span>
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              We believe skilled professionals deserve better access to customers, and customers deserve better access to quality services. AroundYou bridges that gap with technology built for the African market.
            </p>
            <p className="mt-3 text-gray-500 leading-relaxed">
              From Asaba to Portharcourt and beyond, we're creating economic opportunity for thousands of Nigerians while making everyday life easier for millions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "2026", label: "Founded", color: "#0D6B6E" },
              // { val: "2", label: "Cities", color: "#3EC6C8" },
              // { val: "10K+", label: "Pros Onboarded", color: "#6EE7A8" },
              // { val: "50K+", label: "Happy Users", color: "#0B1D3A" },
            ].map(({ val, label, color }) => (
              <div key={label} className="rounded-2xl p-6 text-center transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg,rgba(13,107,110,0.06),rgba(62,198,200,0.06))" }}>
                <p className="text-3xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color }}>{val}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 scroll-reveal opacity-0 translate-y-8 transition-all duration-700" style={{ background: "#f8fafb" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(62,198,200,0.1)", color: "#0D6B6E" }}>Our Values</span>
            <h2 className="text-3xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "shield-check", color: "#0D6B6E", bg: "rgba(13,107,110,0.1)", title: "Safety First", desc: "Every professional is verified and every transaction is secured." },
              { icon: "star", color: "#3EC6C8", bg: "rgba(62,198,200,0.1)", title: "Quality Always", desc: "We maintain high standards through transparent ratings and reviews." },
              { icon: "map-pin", color: "#6EE7A8", bg: "rgba(110,231,168,0.1)", title: "Community Driven", desc: "We grow by empowering the local communities we serve." },
            ].map(({ icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ border: "1px solid #f0f0f0" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: bg }}>
                  <Icon name={icon} size={26} color={color} />
                </div>
                <h3 className="font-semibold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(13,107,110,0.08)", color: "#0D6B6E" }}>Team</span>
            <h2 className="text-3xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>Meet the team driving AroundYou</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">Our core team brings product, operations, and technology experience built to scale across cities.</p>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {[
              { name: "Odali Wisdom", role: "Founder/CEO", image: "/team/wisdom.jpeg", linkedin: "https://www.linkedin.com/in/odali-wisdom-92118b3bb/", icon:"linkedin", bio: "Founder and CEO building scalable marketplace solutions with a community-centered approach." },
              { name: "Esi Stephen", role: "CPO/COO", image: "/team/stephen.jpeg", linkedin: "https://www.linkedin.com/in/stephen-esi-890486368/", icon:"linkedin", bio: "Operations expert optimizing logistics and team performance across country-wide deployments." },
              { name: "Osadebe Nonso", role: "CTO", image: "/team/nonso.jpeg",linkedin: "https://www.linkedin.com/in/nonso-osadebe-73736936a/", icon:"linkedin", bio: "Technical architect focused on reliability, security, and a smooth user experience." },
              { name: "Chinedu David", role: "CMO", image: "/team/david.jpeg", linkedin: "https://www.linkedin.com/in/sirdaviddev/", icon:"linkedin", bio: "Brand and growth leader building trust and traction in local markets." },
            ].map(({name,image,role,linkedin,icon,bio}) => (
              <div key={name} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <img src={image} alt={name} className="mx-auto w-32 h-32 rounded-full object-cover mb-4" />
                <h3 className="font-semibold text-[#0B1D3A]">{name}</h3>
                <p className="text-sm text-gray-500">{role}</p>
                <p className="text-xs text-gray-500 mt-2">{bio}</p>
                <a href={linkedin} className="mt-3 flex justify-center"><Icon name={icon} size={14} color="#3EC6C8"/></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg,#0B1D3A,#0D6B6E)" }}>
        <div className="max-w-6xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>Right now, we are opened for partnership and investors</h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">We're growing fast and inviting talent, partners and service providers to join our marketplace across Nigeria.</p>
          <form
            onSubmit={handleSubmit}
            className="mt-10 mx-auto max-w-3xl grid gap-4 text-left"
          >
            <input type="hidden" name="_subject" value="AroundYou partnership inquiry" />
            <label className="block">
              <span className="text-sm text-gray-200">Name</span>
              <input
                type="text"
                name="name"
                required
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-[#3EC6C8] focus:outline-none"
                placeholder="Your full name"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-200">Email</span>
              <input
                type="email"
                name="email"
                required
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-[#3EC6C8] focus:outline-none"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-200">Profession</span>
              <input
                type="text"
                name="profession"
                required
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-[#3EC6C8] focus:outline-none"
                placeholder="What you do"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-200">What can you offer AroundYou?</span>
              <textarea
                name="message"
                rows="5"
                required
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-[#3EC6C8] focus:outline-none"
                placeholder="Tell us how you can contribute to AroundYou"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-linear-to-r from-teal-500 to-cyan-400 px-8 py-3.5 text-base font-semibold text-[#0B1D3A] transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send inquiry"}
            </button>
            {formStatus && (
              <p className="text-sm text-green-200 mt-2" aria-live="polite">{formStatus}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
