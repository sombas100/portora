// src/pages/FAQ.tsx

import Footer from "../../components/Footer";
import LandingNavbar from "../../components/LandingNavbar";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Portora?",
      answer:
        "Portora is a client portal platform for freelancers and agencies. It helps you manage clients, share files, track projects, and communicate all in one organized hub.",
    },
    {
      question: "How does Portora handle file sharing?",
      answer:
        "You can upload files directly to a project’s portal. Clients can view and download them securely, and they can also upload their own files if needed.",
    },
    {
      question: "Can I use Portora for free?",
      answer:
        "Yes! We offer a Free plan with limited client portals and projects. It’s a great way to get started without commitment.",
    },
    {
      question: "What’s the difference between Pro and Enterprise plans?",
      answer:
        "The Pro plan is designed for solo freelancers with more clients and projects, while Enterprise is tailored for teams and includes collaboration tools and priority support.",
    },
    {
      question: "Do I need to install anything?",
      answer:
        "No installation required. Portora is fully web-based and works on any modern browser.",
    },
    {
      question: "Is client chat available on all plans?",
      answer:
        "Chat is available only on Pro and Enterprise plans, providing real-time communication inside the portal.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. No contracts or cancellation fees.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes! All users have access to support, but Pro and Enterprise customers receive priority assistance.",
    },
  ];

  return (
    <>
      <LandingNavbar />
      <section className="w-full min-h-screen bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Have a question? We've got answers. Here are the most common things
            people ask about Portora.
          </p>

          <div className="space-y-8 text-left">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700 text-md">{faq.answer}</p>
              </div>
            ))}
          </div>

          <p className="mt-16 text-sm text-gray-500">
            Still have questions?{" "}
            <a href="/support" className="text-emerald-500 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FAQ;
