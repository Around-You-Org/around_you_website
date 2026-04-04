import { useEffect } from "react";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function HelpCenterPage() {
  useScrollReveal();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const faqs = [
    {
      question: "How do I find a professional near me?",
      answer:
        "Simply open the AroundYou app, share your location, and browse verified professionals in your area. You can filter by service type, ratings, and availability.",
    },
    {
      question: "Is my payment secure?",
      answer:
        "Yes, all payments are processed securely through our encrypted platform. You only pay after the service is completed to your satisfaction.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "We stand behind our professionals. If you're not satisfied, contact our support team within 24 hours, and we'll work to resolve the issue.",
    },
    {
      question: "How do I track my service request?",
      answer:
        "Once you book a service, you'll receive real-time updates on the professional's arrival and progress through the app.",
    },
    {
      question: "Can I cancel or reschedule a booking?",
      answer:
        "Yes, you can cancel or reschedule most bookings up to 2 hours before the scheduled time through the app.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-[#0B1D3A] to-[#1e3a5f] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions and get the support you need.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0B1D3A]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 scroll-reveal"
              >
                <h3 className="text-lg font-semibold text-[#0B1D3A] mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#0B1D3A]">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@aroundyou.com.ng"
              className="bg-[#3EC6C8] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2ba8aa] transition-colors"
            >
              Email Support
            </a>
            <a
              href="tel:+9071037946"
              className="bg-white border-2 border-[#3EC6C8] text-[#3EC6C8] px-8 py-3 rounded-lg font-semibold hover:bg-[#3EC6C8] hover:text-white transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HelpCenterPage;
