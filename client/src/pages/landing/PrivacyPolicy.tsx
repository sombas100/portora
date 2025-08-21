// src/pages/PrivacyPolicy.tsx

import Footer from "../../components/Footer";
import LandingNavbar from "../../components/LandingNavbar";

const PrivacyPolicy = () => {
  return (
    <>
      <LandingNavbar />
      <section className="w-full min-h-screen bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">Effective Date: August 19, 2025</p>

          <div className="space-y-10 text-gray-700 text-base leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                1. Introduction
              </h2>
              <p>
                At Portora, your privacy is important to us. This Privacy Policy
                explains how we collect, use, and protect your information when
                you use our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  password, and billing details.
                </li>
                <li>
                  <strong>Client & Project Data:</strong> Information you store
                  in your portals (files, messages, etc.).
                </li>
                <li>
                  <strong>Usage Data:</strong> Interactions, preferences, and
                  system logs.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                3. How We Use Your Information
              </h2>
              <p>We use your data to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain the platform</li>
                <li>Personalize your experience</li>
                <li>Improve performance and security</li>
                <li>Communicate important updates</li>
                <li>Process payments (for Pro/Enterprise users)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                4. Data Sharing & Third Parties
              </h2>
              <p>
                We do not sell your data. We may share data with trusted service
                providers (e.g., Stripe for payments) strictly to perform
                platform-related functions under confidentiality agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                5. Security
              </h2>
              <p>
                We take appropriate security measures (encryption, secure
                servers, access control) to protect your data from unauthorized
                access, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                6. Your Rights
              </h2>
              <p>
                You can access, update, or delete your personal information at
                any time by logging into your account. For full account
                deletion, contact us directly at{" "}
                <a
                  href="mailto:support@portora.net"
                  className="text-emerald-600 underline"
                >
                  support@portora.net
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy as necessary. We’ll notify
                users of significant changes via email or through the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                8. Contact Us
              </h2>
              <p>
                For questions about this policy, email us at{" "}
                <a
                  href="mailto:support@portora.net"
                  className="text-emerald-600 underline"
                >
                  support@portora.net
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
