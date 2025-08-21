import Footer from "../../components/Footer";
import LandingNavbar from "../../components/LandingNavbar";
import image from "../../../public/round-icons-MUWiNvK4PLo-unsplash.png";

const Support = () => {
  return (
    <>
      <LandingNavbar />
      <section className="w-full min-h-screen bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Need Help? We're Here for You
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Whether you're just getting started or need help with a specific
            feature, our support team is ready to assist.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                📧 Email Support
              </h3>
              <p className="text-gray-700 mb-4">
                For general inquiries or technical questions, reach out to our
                support team via email. We usually respond within 24 hours.
              </p>
              <a
                href="mailto:support@portora.net"
                className="text-emerald-500 hover:underline"
              >
                support@portora.net
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                📚 Help Center
              </h3>
              <p className="text-gray-700 mb-4">
                Visit our Help Center to explore guides, tutorials, and
                frequently asked questions about using Portora.
              </p>
              <a href="/faq" className="text-emerald-500 hover:underline">
                Go to FAQ
              </a>
            </div>
          </div>

          <div className="mt-16 text-gray-600">
            <p className="text-sm text-gray-500">
              We're committed to your success and will always do our best to
              help you resolve any issues.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center w-full pt-16">
          <img className="w-96" src={image} alt="" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Support;
