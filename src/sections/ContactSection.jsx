import Icon from "../components/Icon";
import { useState } from "react";

function ContactSection() {
  const [status, setStatus] = useState("idle");

  // Replace with your actual Formspree form ID
  const FORMSPREE_URL = "https://formspree.io/f/your-form-id";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.target);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus("sent");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  return (
    <section id="contact-section" className="py-20 px-6 scroll-reveal opacity-0 translate-y-8 transition-all duration-700"
      style={{ background: "#f8fafb" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(13,107,110,0.08)", color: "#0D6B6E" }}>Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D3A]" style={{ fontFamily: "'Sora', sans-serif" }}>Contact Us</h2>
          <p className="mt-3 text-gray-500">Have questions or want to partner with us? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: "mail", color: "#0D6B6E", bg: "rgba(13,107,110,0.1)", title: "Email", val: "hello@aroundyou.com.ng", url: "mailto:hello@aroundyou.com.ng" },
            { icon: "phone", color: "#3EC6C8", bg: "rgba(62,198,200,0.1)", title: "Phone", val: "+234 907 1037 946", url: "tel:+2349071037946" },
            { icon: "map-pin", color: "#6EE7A8", bg: "rgba(110,231,168,0.1)", title: "Office", val: "Asaba, Nigeria" },
          ].map(({ icon, color, bg, title, val, url }) => (
            <a key={title} href={url || "#"} className="block">
              <div className="bg-white rounded-2xl p-6 text-center" style={{ border: "1px solid #f0f0f0" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: bg }}>
                  <Icon name={icon} size={22} color={color} />
                </div>
                <h4 className="font-semibold text-sm text-[#0B1D3A]">{title}</h4>
                <p className="text-sm text-gray-500 mt-1">{val}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8" style={{ border: "1px solid #f0f0f0" }}>
          <form onSubmit={handleSubmit}  className="grid md:grid-cols-2 gap-5">
            {[
              { id: "name", label: "Full Name", type: "text", placeholder: "Your name", col: 1 },
              { id: "email", label: "Email", type: "email", placeholder: "you@email.com", col: 1 },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-xs font-medium mb-1.5 text-[#0B1D3A]">{label}</label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-[#3EC6C8]"
                  style={{ background: "#f8fafb", border: "1px solid #e8e8e8" }}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label htmlFor="msg" className="block text-xs font-medium mb-1.5 text-[#0B1D3A]">Message</label>
              <textarea
                id="msg"
                name="message"
                rows={4}
                placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2 focus:ring-[#3EC6C8]"
                style={{ background: "#f8fafb", border: "1px solid #e8e8e8" }}
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-8 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#0D6B6E,#3EC6C8)" }}
              >
                {status === "sending" ? "Sending..." : status === "sent" ? "✓ Sent!" : "Send Message"}
              </button>
              {status === "sent" && (
                <span className="text-sm font-medium" style={{ color: "#0D6B6E" }}>✓ Message sent!</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;