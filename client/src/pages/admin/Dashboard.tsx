import { useEffect, useState } from "react";
import client from "../../api/client";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import {
  FaRegCalendarAlt,
  FaTasks,
  FaUserFriends,
  FaRocket,
} from "react-icons/fa";

interface UsageType {
  used: number;
  limit: number;
  remaining: number;
}

interface Project {
  id: number;
  title: string;
  dueDate: string;
  status: string;
}

const Dashboard = () => {
  const { token } = useAuth();
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("");
  const [clients, setClients] = useState<UsageType | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<Project[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await client.get("/dashboard/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlan(res.data.plan);
        setStatus(res.data.subscriptionStatus);
        setClients(res.data.clients);
        setRecentProjects(res.data.recentProjects);
        setUpcomingDeadlines(res.data.upcomingDeadlines);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      }
    };

    if (token) fetchDashboard();
  }, [token]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
          <FaRocket className="text-indigo-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Plan</p>
            <p className="font-semibold text-gray-700 capitalize">{plan}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
          <FaUserFriends className="text-emerald-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Clients Used</p>
            <p className="font-semibold text-gray-700">
              {clients?.used} / {clients?.limit}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
          <FaTasks className="text-yellow-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Remaining Slots</p>
            <p className="font-semibold text-gray-700">{clients?.remaining}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
          <FaRegCalendarAlt className="text-rose-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                status === "active"
                  ? "bg-green-100 text-green-600"
                  : status === "past_due"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            📝 Recent Projects
          </h2>
          <Link
            to="/projects"
            className="text-sm text-indigo-600 hover:underline"
          >
            View All
          </Link>
        </div>
        {recentProjects.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent projects found.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentProjects.map((proj) => (
              <li
                key={proj.id}
                className="py-3 flex justify-between items-center"
              >
                <span className="font-medium text-gray-700">{proj.title}</span>
                <span className="text-sm text-gray-500">
                  {new Date(proj.dueDate).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            📆 Upcoming Deadlines
          </h2>
          <Link
            to="/projects"
            className="text-sm text-indigo-600 hover:underline"
          >
            Manage Projects
          </Link>
        </div>
        {upcomingDeadlines.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming deadlines.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {upcomingDeadlines.map((proj) => (
              <li
                key={proj.id}
                className="py-3 flex justify-between items-center"
              >
                <span className="text-gray-700">{proj.title}</span>
                <span className="text-sm text-rose-600">
                  {new Date(proj.dueDate).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          ⚡ Quick Actions
        </h2>
        <div className="flex gap-3">
          <Link
            to="/clients"
            className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Clients
          </Link>
          <Link
            to="/projects"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
