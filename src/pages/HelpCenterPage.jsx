import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Icon from "../components/Icon";
import useScrollReveal from "../hooks/useScrollReveal";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all scroll-reveal"
      style={{ border: "1px solid #e8f3f4", background: open ? "#f0fafa" : "#f8fafb" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <h3 className="text-lg font-semibold text-[#0B1D3A]">{question}</h3>
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{
            background: open ? "#0D6B6E" : "rgba(13,107,110,0.1)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <Icon name="chevron-down" size={16} color={open ? "white" : "#0D6B6E"} />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "1000px" : "0",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function HelpCenterPage() {
  useScrollReveal();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const faqs = [
    {
      question: "What is AroundYou?",
      answer:
        "AroundYou is a platform that connects people with trusted local professionals such as artisans, cleaners, and drivers. We are currently in our early launch phase.",
    },
    {
      question: "Is AroundYou available now?",
      answer:
        "AroundYou is currently in its pre-launch phase. You can join the waitlist to be notified when we go live in your area.",
    },
    {
      question: "How do I join the waitlist?",
      answer:
        "Go to the Waitlist page, fill in your details, choose whether you're joining as a customer or worker, and verify your email to confirm your spot.",
    },
    {
      question: "What happens after I join the waitlist?",
      answer:
        "We will notify you by email when AroundYou launches in your area and provide early access where available.",
    },
    {
      question: "Can I sign up as a worker?",
      answer:
        "Yes, you can join the waitlist as a worker by selecting your services during registration. We will contact you when onboarding begins.",
    },
    {
      question: "How are workers verified?",
      answer:
        "Workers will go through a verification process before being approved on the platform. Full details will be shared during onboarding.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team anytime via email at support@aroundyou.com.ng or through the contact options on this page.",
    },
    {
      question: "Is AroundYou free to join?",
      answer:
        "Yes, joining the waitlist is completely free. You will only be notified when the platform becomes available.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Around You - Help Center</title>
        <meta name="description" content="Find answers to common questions and get support for AroundYou services." />
        <meta property="og:title" content="Help Center | AroundYou" />
        <meta property="og:description" content="Find answers to common questions and get support." />
        <meta property="og:url" content="https://aroundyou.com.ng/help-center" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative py-20 overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg,#0B1D3A 0%,#0D6B6E 100%)" }}
      >
        <div
          className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "#3EC6C8", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          style={{ background: "#6EE7A8", filter: "blur(60px)" }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(255,255,255,0.1)", color: "#6EE7A8" }}
          >
            Support
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Help Center
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions and get the support you need.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(13,107,110,0.08)", color: "#0D6B6E" }}
            >
              FAQ
            </span>
            <h2
              className="text-3xl font-bold text-[#0B1D3A]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 px-6" style={{ background: "#f8fafb" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(13,107,110,0.08)", color: "#0D6B6E" }}
          >
            Still need help?
          </span>
          <h2
            className="text-3xl font-bold mb-4 text-[#0B1D3A]"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Contact Our Team
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Our support team is here to help you with any questions or issues you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@aroundyou.com.ng"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg,#0D6B6E,#3EC6C8)" }}
            >
              <Icon name="mail" size={18} color="white" />
              Email Support
            </a>
            <a
              href="tel:+2349071037946"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(13,107,110,0.08)",
                color: "#0D6B6E",
                border: "1px solid rgba(13,107,110,0.2)",
              }}
            >
              <Icon name="phone" size={18} color="#0D6B6E" />
              +234 907 103 7946
            </a>
            <Link
              to="/waitlist"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#0D6B6E" }}
            >
              <Icon name="user-plus" size={18} color="white" />
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HelpCenterPage;
