import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import client from "../api/client";
import LandingNavbar from "../components/LandingNavbar";
import { MdErrorOutline } from "react-icons/md";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const res = await client.post("/auth/login", { email, password });
      const { token, user } = res.data;

      login(token, user.name, user.role);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 h-screen bg-white">
        {/* Left: Login Form */}
        <div className="flex items-center justify-center p-8">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-white p-10 rounded-lg shadow-md"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Sign in to Portora
            </h2>

            {error && (
              <p className="flex items-center text-red-500 text-sm mb-4">
                <MdErrorOutline className="mr-1" />
                {error}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <button
              type="submit"
              className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded transition"
            >
              Log In
            </button>

            <p className="text-sm mt-4 text-gray-600">
              Don't have a Portora account?
              <Link
                to="/register"
                className="text-emerald-600 hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>

        {/* Right: App Features */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-100 to-emerald-200 p-16">
          <h2 className="text-3xl font-bold text-emerald-900 mb-6 leading-snug">
            Manage Clients and Projects <br /> from One Clean Dashboard
          </h2>
          <ul className="text-lg text-emerald-800 space-y-4 font-medium">
            <li>📁 Share files, feedback & project updates</li>
            <li>💬 Chat in real-time with premium clients</li>
            <li>✅ Stay organized with centralized access</li>
            <li>🚀 Upgrade your freelance brand</li>
          </ul>
          <p className="mt-10 text-sm text-emerald-700 italic">
            "Portora has streamlined everything for me. No more messy emails!"
          </p>
          <p className="text-sm text-emerald-800 font-semibold mt-1">
            – Simone, Web Designer
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
