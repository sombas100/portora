import { FaHubspot } from "react-icons/fa";
import { VscFiles } from "react-icons/vsc";
import { CiChat1 } from "react-icons/ci";

import { PiStripeLogo } from "react-icons/pi";
import { PiTarget } from "react-icons/pi";
import { pricePlans } from "../constants/pricePlans";
import { RxDashboard } from "react-icons/rx";
import hero from "../../public/johnny-conor-FQ_BzIX4arQ-unsplash.png";
import files from "../../public/yugudesign-wqkCU7F2SSU-unsplash.png";
import dashboard from "../../public/portora-dashboard.png";
import clientsPage from "../../public/portora-client-page.png";
import clientDetailsPage from "../../public/portora-project-details-page.png";
import projects from "../../public/portora-projects-page.png";
import hero2 from "../../public/standsome-worklifestyle-zY1ZWW1_CqE-unsplash.jpg";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <section className="w-full h-screen bg-white flex flex-col">
        {/* Navbar */}
        <div className="flex items-center justify-between px-30 pt-4">
          <h1 className="text-xl uppercase tracking-wider font-bold">
            Portora
          </h1>
          <Link to={"/login"}>
            <button className="bg-emerald-500 font-semibold rounded-2xl text-white px-4 py-2 hover:bg-white hover:text-emerald-500 border cursor-pointer transition-all ease-in">
              Get Started
            </button>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-[1600px] h-[46rem] rounded-2xl shadow-sm bg-linear-to-t from-white from-5% to-emerald-500 via-90% grid lg:grid-cols-2 items-center justify-center">
            <div className="p-20">
              <h2 className="text-5xl font-bold text-white">
                Portora – Your Modern Client Portal
              </h2>
              <p className="text-lg text-white mt-4">
                All-in-one workspace for freelancers and agencies to manage
                clients, collaborate on projects, and centralize communication.
              </p>
              <Link to={"/login"}>
                <button className="bg-white font-semibold text-black mt-8 rounded-2xl px-4 py-2  hover:text-gray-400  cursor-pointer transition-all ease-in">
                  Get Started
                </button>
              </Link>
            </div>
            <div>
              <img
                className="hidden lg:block"
                src={hero}
                alt="A computer screen"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-auto bg-white flex flex-col items-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-black/70">
            Designed for Freelancers and Agencies Who Value Professionalism
          </h1>
          <p className="text-lg font-medium text-black/60 mt-6">
            Stop managing projects across emails, chat threads, and
            spreadsheets. Portora gives you one clean hub for everything — from
            onboarding clients to final delivery.
          </p>
        </div>

        {/* Bullet Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-8 max-w-5xl text-black/70 text-lg font-semibold">
          <div className="flex flex-col space-y-2 items-center place-items-center justify-center">
            <RxDashboard className="text-emerald-400 mb-4" size={40} />
            <h2 className="font-bold text-xl">Client Dashboards</h2>
            <p className="flex items-center justify-center text-sm">
              Each client gets a clean, focused view of their projects, no
              noise, no confusion.
            </p>
          </div>
          <div className="flex flex-col space-y-2 items-center place-items-center justify-center">
            <VscFiles className="text-emerald-400 mb-4" size={40} />
            <h2 className="font-bold text-xl">Secure File Sharing</h2>
            <p className="flex items-center justify-center text-sm">
              Upload and organize files by project. Clients can view or download
              with one click.
            </p>
          </div>
          <div className="flex flex-col space-y-2 items-center place-items-center justify-center">
            <CiChat1 className="text-emerald-400 mb-4" size={40} />
            <h2 className="font-bold text-xl">Real-Time Chat</h2>
            <p className="flex items-center justify-center text-sm">
              Communicate inside the platform right where the work happens.
            </p>
          </div>
          <div className="flex flex-col space-y-2 items-center place-items-center justify-center">
            <FaHubspot className="text-emerald-400 mb-4" size={40} />
            <h2 className="font-bold text-xl">Project Hubs</h2>
            <p className="flex items-center justify-center text-sm">
              Track progress, feedback, due dates, deliverables and discussions
              all in one place.
            </p>
          </div>
          <div className="flex flex-col space-y-2 items-center place-items-center justify-center">
            <PiStripeLogo className="text-emerald-400 mb-4" size={40} />
            <h2 className="font-bold text-xl">Stripe Billing Integration</h2>
            <p className="flex items-center justify-center text-sm">
              Offers freelancers monthly plans. Stripe integration is built-in.
            </p>
          </div>
          <div className="flex flex-col space-y-2 items-center place-items-center justify-center">
            <PiTarget className="text-emerald-400 mb-4" size={40} />
            <h2 className="font-bold text-xl">Client-Friendly UX</h2>
            <p className="flex items-center justify-center text-sm">
              No tech skills needed. Clients log in and instantly know where to
              go.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="mt-16">
          <img
            src={files}
            alt="dashboard preview"
            className="w-full max-w-4xl rounded"
          />
        </div>
      </section>

      <section className="w-full bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Professionals Are Saying
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Freelancers and consultants love how Portora simplifies their
            workflow.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-left">
              <p className="text-gray-700 text-lg italic mb-4">
                “As a web designer, I used to send files via email and chat on
                WhatsApp.
                <br />
                <span className="font-semibold">
                  Portora streamlined everything.
                </span>{" "}
                Now clients know exactly where to go.”
              </p>
              <p className="text-sm text-gray-500 font-medium">
                — Simone, Creative Freelancer
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-left">
              <p className="text-gray-700 text-lg italic mb-4">
                “Portora helped me cut down project delays by keeping
                <span className="font-semibold"> everything in one place.</span>
                ”
              </p>
              <p className="text-sm text-gray-500 font-medium">
                — Jamal R., Webflow Developer
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-full py-10 bg-black/90 lg:flex flex-col">
        <div className="flex flex-col items-center justify-center mt-12">
          <h1 className="text-4xl text-white font-bold">
            Your Entire Workflow, in One Place
          </h1>
          <p className="text-lg font-semibold p-7 text-white">
            From client onboarding to file handover. Portora lets you monitor
            every step of a project with visual clarity and zero friction.
          </p>
          <div className="grid lg:grid-cols-4 px-4 mt-12 gap-2 items-center justify-center">
            <img src={dashboard} alt="" />
            <img src={clientsPage} alt="" />
            <img src={clientDetailsPage} alt="" />
            <img className="h-[231px]" src={projects} alt="" />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 items-center justify-center mt-50">
          <div className="px-40">
            <h1 className="text-white font-bold text-4xl">
              Your First Portal Takes Less Than 5 Minutes to Launch
            </h1>
            <ul className="p-8 list-disc text-white font-semibold text-xl">
              <li>Register an account</li>
              <li>Create a client</li>
              <li>Automatically sends a login link to clients email</li>
            </ul>
            <p className="text-white italic font-bold text-xl">
              No setup headaches. No client onboarding required.
            </p>
          </div>
          <div>
            <img className="p-4 rounded-4xl" src={hero2} alt="" />
          </div>
        </div>
      </section>

      <section className="w-full h-[550px] bg-white flex flex-col">
        <div className="flex flex-col items-center justify-center mt-12">
          <h1 className="text-4xl font-bold text-black/60">
            Upgrade for Premium Collaboration
          </h1>
          <p className="text-lg font-semibold mt-4 text-black/60">
            Unlock features built for scale and professionalism.
          </p>
          <p className="text-lg italic font-semibold text-black/60">
            Cancel anytime. No hidden fees.
          </p>
        </div>
        <div className="grid lg:grid-cols-4 p-4 gap-4 items-center justify-center">
          {pricePlans.map((plan, index) => (
            <div
              key={index}
              className={`
      h-auto min-h-[300px] shadow-xl w-full p-6 mt-8 flex flex-col items-center rounded transition
      ${
        plan.title === "Enterprise"
          ? "bg-gradient-to-br from-emerald-300 via-emerald-400 to-black text-white"
          : plan.title === "Pro"
          ? "bg-gradient-to-br from-blue-800 via-blue-900 to-black text-white"
          : "bg-gray-50 text-gray-900"
      }
    `}
            >
              <h2 className="font-semibold text-lg mb-3">{plan.title}</h2>
              <h3 className="text-4xl mb-4 font-bold">
                {plan.price}
                <span className="text-xs">/month</span>
              </h3>
              <ul className="w-full space-y-2">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="border-b font-semibold border-gray-300 pb-2 text-md text-center"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Build Trust With Every Client Interaction
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Portora helps you deliver work more efficiently — and present your
            brand more professionally.
          </p>

          <Link to={"/login"}>
            <button className="px-8 py-3 bg-emerald-400 hover:bg-emerald-700 text-white text-lg rounded-full cursor-pointer transition duration-300 shadow-md">
              Create Your First Portal
            </button>
          </Link>

          <p className="text-sm text-gray-500 mt-4">
            ✅ No credit card required &nbsp;|&nbsp; 💸 Free forever plan
            available
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
