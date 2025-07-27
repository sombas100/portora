import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import type { Project } from "../interfaces";
import {
  FaClipboardList,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";

const ClientDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientProjects = async () => {
      try {
        const token = localStorage.getItem("clientToken");
        const res = await client.get("/projects/client", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientProjects();
  }, []);

  const getStatusBadge = (status: string) => {
    let styles = {
      icon: <FaClipboardList className="mr-1" />,
      classes: "bg-gray-200 text-gray-600",
    };

    if (status === "In Progress") {
      styles = {
        icon: <FaHourglassHalf className="mr-1 text-yellow-500" />,
        classes: "bg-yellow-100 text-yellow-700",
      };
    } else if (status === "Completed") {
      styles = {
        icon: <FaCheckCircle className="mr-1 text-green-600" />,
        classes: "bg-green-100 text-green-700",
      };
    } else if (status === "Pending") {
      styles = {
        icon: <FaHourglassHalf className="mr-1 text-blue-600" />,
        classes: "bg-blue-100 text-blue-700",
      };
    }

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${styles.classes}`}
      >
        {styles.icon}
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to Your Dashboard
      </h1>

      <div className="bg-white p-4 rounded shadow flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-500">Total Projects</p>
          <h2 className="text-2xl font-bold text-emerald-600">
            {projects.length}
          </h2>
        </div>
        <FaClipboardList className="text-4xl text-gray-300" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Your Projects
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading your projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Link
              to={`/client-dashboard/projects/${project.id}`}
              key={project.id}
              className="block bg-white p-4 rounded shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  {project.title}
                </h3>
                {getStatusBadge(project.status)}
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">
                {project.description}
              </p>
              {project.dueDate && (
                <p className="text-xs text-gray-400 mt-2">
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
