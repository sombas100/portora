import {
  RiDashboardHorizontalFill,
  RiTeamFill,
  RiFolder3Fill,
  RiSettings3Fill,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Sidebar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    toast.info("Logging out...");

    // Trigger animation first
    setIsLoggingOut(true);

    // Wait for animation to complete before logging out
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 1000); // adjust timing to match animation
  };

  return (
    <aside className="w-64 bg-white h-screen shadow-md border-r px-6 py-8">
      <nav className="flex flex-col space-y-6">
        <div className="text-2xl ml-8 mb-8 flex items-center font-bold text-emerald-600">
          Portora
        </div>

        <ul className="space-y-2 text-gray-700 font-medium">
          <Link to="/">
            <li className="flex items-center px-3 py-3 rounded-md hover:bg-emerald-50 transition cursor-pointer">
              <RiDashboardHorizontalFill className="mr-3 text-xl" />
              Dashboard
            </li>
          </Link>

          <Link to="/clients">
            <li className="flex items-center px-3 py-3 rounded-md hover:bg-emerald-50 transition cursor-pointer">
              <RiTeamFill className="mr-3 text-xl" />
              Clients
            </li>
          </Link>

          <Link to="/projects">
            <li className="flex items-center px-3 py-3 rounded-md hover:bg-emerald-50 transition cursor-pointer">
              <RiFolder3Fill className="mr-3 text-xl" />
              Projects
            </li>
          </Link>

          <li className="flex items-center px-3 py-3 rounded-md hover:bg-emerald-50 transition cursor-pointer">
            <RiSettings3Fill className="mr-3 text-xl" />
            Settings
          </li>

          {/* Conditional Button */}
          {!token ? (
            <Link to="/login">
              <li className="flex items-center px-3 py-3 rounded-md hover:bg-emerald-50 transition cursor-pointer text-indigo-600">
                <RiLoginCircleLine className="mr-3 text-xl" />
                Login
              </li>
            </Link>
          ) : (
            <AnimatePresence>
              {!isLoggingOut && (
                <motion.li
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleLogout}
                  className="flex items-center px-3 py-3 rounded-md hover:bg-red-50 transition cursor-pointer text-red-600"
                >
                  <RiLogoutCircleLine className="mr-3 text-xl" />
                  Logout
                </motion.li>
              )}
            </AnimatePresence>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
