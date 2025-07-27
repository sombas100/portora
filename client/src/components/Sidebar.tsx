import {
  RiDashboardHorizontalFill,
  RiTeamFill,
  RiFolder3Fill,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import UpgradeModal from "../components/ui/UpgradeModal";
import client from "../api/client";

const Sidebar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [userPlan, setUserPlan] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await client.get("/billing/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserPlan(res.data.plan);
      } catch (err) {
        console.error("Failed to fetch plan:", err);
        setUserPlan(null);
      }
    };

    if (token) {
      fetchPlan();
    }
  }, [token]);

  const handleLogout = () => {
    toast.info("Logging out...");
    setIsLoggingOut(true);

    setTimeout(() => {
      logout();
      navigate("/login");
    }, 1000);
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

          {token && userPlan && (
            <>
              <li
                onClick={() => setShowUpgradeModal(true)}
                className={`flex items-center px-3 py-3 rounded-md transition cursor-pointer ${
                  userPlan === "free"
                    ? "hover:bg-indigo-50 text-indigo-600"
                    : "hover:bg-yellow-50 text-yellow-600"
                }`}
              >
                {userPlan === "free"
                  ? "⚡ Upgrade Plan"
                  : `🔁 Change Plan (${userPlan})`}
              </li>
            </>
          )}

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

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </aside>
  );
};

export default Sidebar;
