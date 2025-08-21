import Footer from "../../components/Footer";
import LandingNavbar from "../../components/LandingNavbar";
import { featuresList } from "../../constants/features";
import { useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "../../../public/vitaly-gariev-GD4jccM_K_E-unsplash.jpg";
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import dashboardImg from "../../../public/portora-dashboard-feature.png";

const features = [
  {
    title: "Client Management",
    description:
      "Create and manage client profiles, track engagement, and keep everything organized in one place.",
    icon: "🔍",
  },
  {
    title: "Project Collaboration",
    description:
      "Share files, track milestones, and collaborate seamlessly with clients in real time.",
    icon: "📁",
  },
  {
    title: "Built-in Chat",
    description:
      "Communicate directly with clients through a chat system modeled after WhatsApp (Pro & Enterprise only).",
    icon: "💬",
  },
  {
    title: "Feedback Loop",
    description:
      "Gather client feedback efficiently to streamline project revisions and approvals.",
    icon: "📄",
  },
  {
    title: "File Sharing",
    description:
      "Upload and organize project files for easy access, delivery, and version control.",
    icon: "📎",
  },
  {
    title: "Subscription Plans",
    description:
      "Choose the right features for your business with flexible pricing and upgrade options.",
    icon: "💼",
  },
];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <>
      <LandingNavbar />
      <section className="min-h-screen bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Everything Your Freelance Business Needs in One Place
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Portora is built for modern freelancers and agencies who want a
            single, professional hub to manage client relationships, projects,
            and communication.
          </p>
          <Link to={"/register"}>
            <button className="bg-emerald-500 mb-6 cursor-pointer text-white font-semibold px-4 py-2 rounded-md  hover:bg-emerald-600 border transition">
              Sign up for free
            </button>
          </Link>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-96 bg-white py-24 px-6">
        <div className="max-w-[990px] mx-auto gap-25 grid lg:grid-cols-2">
          <div>
            <img className="rounded-xl" src={heroImg} alt="" />
          </div>
          <div className="pt-2">
            <h1 className="font-bold text-3xl text-gray-800 tracking-wide mb-4">
              Perfect for freelancers to track their clients and ongoing
              projects
            </h1>
            <p className="font-semibold text-md text-gray-600">
              Ditch the spreadsheets and email chains. Portora gives freelancers
              a simple, centralized dashboard to manage clients, assign tasks,
              share files, and collect feedback — all in one place. Stay
              organized, save time, and deliver a seamless client experience
              every step of the way.
            </p>
            <Link to={"/pricing"}>
              <button className="flex items-center justify-center text-gray-600 mt-6 font-semibold cursor-pointer hover:-translate-y-1.5 hover:text-gray-400 transition-all ease-in">
                View our price plans{" "}
                <FaArrowRight className="ml-2 mt-1 place-items-center" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Everything Portora Can Do for You
          </h2>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left Column – Feature List */}
            <div className="divide-y divide-gray-200">
              {featuresList.map((feature, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleClick(index)}
                    className="w-full cursor-pointer text-left py-4 font-semibold text-emerald-600 hover:text-emerald-800 transition duration-200"
                  >
                    {feature.title}
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                        className="pl-4 pb-4 pr-2 text-gray-600"
                      >
                        <p>{feature.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Column – Dynamic Image */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeIndex !== null && (
                  <motion.img
                    key={featuresList[activeIndex].image}
                    src={featuresList[activeIndex].image}
                    alt={featuresList[activeIndex].title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-full h-auto rounded-xl shadow-lg"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 min-h-screen relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-6 z-10 relative">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            More than a client portal — it’s your professional edge
          </h1>
          <p className="text-lg text-gray-600 font-semibold leading-relaxed">
            Portora isn’t just about managing files and messages — it’s about
            elevating your brand. Give clients a seamless experience that
            reflects the quality of your work. From onboarding to delivery,
            every step feels tailored, clear, and professional. No more messy
            threads, scattered feedback, or confused clients. With built-in
            chat, real-time updates, and a branded client portal, you stay in
            control — and look great doing it.
          </p>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[1200px] h-[1200px] bg-emerald-500 rounded-full z-0 opacity-60"></div>

        <div className="mt-16 flex justify-center z-10 relative">
          <img
            src={dashboardImg}
            alt="Client Portal Preview"
            className="max-w-4xl w-full rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
          />
        </div>
      </section>

      <section className="min-h-96 bg-white py-24 px-6">
        <div className="max-w-[80%] text-white opacity-75 mx-auto bg-emerald-500 p-12 rounded-2xl">
          <h1 className="text-4xl mb-4 font-bold">
            Power Up Your Freelance Business
          </h1>
          <p className="max-w-[60%] text-lg mb-6 leading-relaxed">
            Whether you're managing one client or twenty, Portora helps you keep
            projects, feedback, and communication all in one place — no clutter,
            no confusion. It's time to simplify your workflow and wow your
            clients.
          </p>
          <Link to={"/register"}>
            <button className="bg-white cursor-pointer text-emerald-500 font-semibold px-6 py-3 rounded-full hover:bg-emerald-100 transition">
              Get Started — It’s Free
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Features;
