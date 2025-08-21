import Footer from "../../components/Footer";
import LandingNavbar from "../../components/LandingNavbar";

const Pricing = () => {
  return (
    <>
      <LandingNavbar />
      <section className="w-full min-h-screen bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Transparent Pricing, Designed to Scale With You
          </h1>
          <p className="text-lg text-gray-600 mb-14">
            Choose the plan that fits your workflow. No hidden fees. Cancel
            anytime.
          </p>

          <div className="grid lg:grid-cols-4 gap-10">
            {/* FREE PLAN */}
            <div className="border rounded-2xl p-8 bg-gray-50 shadow-md flex flex-col justify-between h-full min-h-[500px]">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Free
                </h2>
                <p className="text-4xl font-bold text-emerald-500 mb-4">£0</p>
                <p className="text-gray-500 mb-6">
                  Perfect for freelancers just getting started.
                </p>
                <ul className="text-left space-y-4 text-gray-700 text-sm">
                  <li>✔️ 1 Client Portal</li>
                  <li>✔️ Unlimited Projects</li>
                  <li>✔️ File Sharing & Feedback</li>
                  <li>❌ No Chat Support</li>
                </ul>
              </div>
            </div>

            {/* STARTER PLAN */}
            <div className="border rounded-2xl p-8 bg-gray-50 shadow-md flex flex-col justify-between h-full min-h-[500px]">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Starter
                </h2>
                <p className="text-4xl font-bold text-emerald-500 mb-4">
                  £5.00<span className="text-lg font-medium">/mo</span>
                </p>
                <p className="text-gray-500 mb-6">
                  Great for small client-based businesses.
                </p>
                <ul className="text-left space-y-4 text-gray-700 text-sm">
                  <li>✔️ Up to 3 Clients</li>
                  <li>✔️ Unlimited Projects</li>
                  <li>✔️ File Sharing & Feedback</li>
                  <li>❌ No Chat Support</li>
                </ul>
              </div>
            </div>

            {/* PRO PLAN */}
            <div className="border rounded-2xl p-8 bg-gradient-to-br from-blue-500 via-black to-gray-800 text-white shadow-xl flex flex-col justify-between h-full min-h-[500px]">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Pro</h2>
                <p className="text-4xl font-bold mb-4">
                  £8.00<span className="text-lg font-medium">/mo</span>
                </p>
                <p className="mb-6">
                  For established freelancers with growing client needs.
                </p>
                <ul className="text-left space-y-4 text-white/90 text-sm">
                  <li>✔️ Up to 10 Clients</li>
                  <li>✔️ Unlimited Projects</li>
                  <li>✔️ File Sharing & Feedback</li>
                  <li>✔️ Built-in Live Chat</li>
                </ul>
              </div>
            </div>

            {/* ENTERPRISE PLAN */}
            <div className="border rounded-2xl p-8 bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 text-white shadow-xl flex flex-col justify-between h-full min-h-[500px]">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Enterprise</h2>
                <p className="text-4xl font-bold mb-4">
                  £12.00<span className="text-lg font-medium">/mo</span>
                </p>
                <p className="mb-6">
                  Best for teams, studios, or growing agencies.
                </p>
                <ul className="text-left space-y-4 text-white/90 text-sm">
                  <li>✔️ Up to 10 Clients</li>
                  <li>✔️ Unlimited Projects</li>
                  <li>✔️ All Pro Features</li>
                  <li>✔️ Priority Support</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-14 text-sm text-gray-500">
            All plans include a 7-day free trial. No credit card required.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Pricing;
