import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import LandingNavbar from "../components/LandingNavbar";
import { MdErrorOutline } from "react-icons/md";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    const result = await register(name, email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Registration failed");
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 h-screen bg-white">
        {/* Left: Registration Form */}
        <div className="flex items-center justify-center p-8">
          <form
            onSubmit={handleRegister}
            className="w-full max-w-md bg-white p-10 rounded-lg shadow-md"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Create Your Portora Account
            </h2>

            {error && (
              <p className="flex items-center text-red-500 text-sm mb-4">
                <MdErrorOutline className="mr-1" />
                {error}
              </p>
            )}

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded transition"
            >
              Register
            </button>

            <p className="text-sm mt-4 text-gray-600">
              Already have a Portora account?
              <Link
                to="/login"
                className="text-indigo-600 hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Features / Marketing */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-100 to-indigo-200 p-16">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6 leading-snug">
            Give Your Clients a Seamless Experience
          </h2>
          <ul className="text-lg text-indigo-800 space-y-4 font-medium">
            <li>🚀 Launch professional client portals in minutes</li>
            <li>🔒 Keep files and feedback secure in one place</li>
            <li>🎯 Manage projects, deadlines, and communication</li>
            <li>💼 Designed for freelancers & agencies of all sizes</li>
          </ul>
          <p className="mt-10 text-sm text-indigo-700 italic">
            “Having all the tools needed to communicate and keep up to date with
            my clients in one central hub has been game changing.”
          </p>
          <p className="text-sm text-indigo-800 font-semibold mt-1">
            – Jason, SEO Consultant
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
