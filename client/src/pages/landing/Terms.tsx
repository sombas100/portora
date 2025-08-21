import Footer from "../../components/Footer";
import LandingNavbar from "../../components/LandingNavbar";

const Terms = () => {
  return (
    <>
      <LandingNavbar />
      <section className="w-full min-h-screen bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8">Last updated: August 19, 2025</p>

          <div className="space-y-10 text-gray-700 text-base leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using Portora, you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do
                not use the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                2. Use of the Platform
              </h2>
              <p>
                You may use Portora only for lawful purposes. You are
                responsible for maintaining the confidentiality of your account
                credentials and for all activities that occur under your
                account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                3. Subscription Plans & Payments
              </h2>
              <p>
                Some features are available only under paid subscription plans
                (e.g., Pro, Enterprise). By subscribing, you authorize us to
                charge the applicable fees to your payment method on a recurring
                basis. You can cancel your plan at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                4. User Content
              </h2>
              <p>
                You retain ownership of all content you upload (files, feedback,
                messages, etc.). However, by using Portora, you grant us the
                rights necessary to host and process this content to operate the
                platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                5. Prohibited Activities
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Uploading malicious or illegal content</li>
                <li>
                  Attempting to access other users’ data without permission
                </li>
                <li>Using Portora for unlawful or deceptive activities</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                6. Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate your account if you
                violate these terms or misuse the platform. Upon termination,
                your data will be handled according to our Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                7. Disclaimer & Limitation of Liability
              </h2>
              <p>
                Portora is provided “as is” without warranties of any kind. We
                are not liable for any indirect or consequential damages arising
                from your use of the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                8. Changes to Terms
              </h2>
              <p>
                We may update these Terms occasionally. Continued use of Portora
                after changes are made constitutes your acceptance of the
                updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                9. Contact
              </h2>
              <p>
                For questions regarding these Terms, please contact us at{" "}
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

export default Terms;
