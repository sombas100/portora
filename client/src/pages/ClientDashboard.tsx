import { useEffect, useState } from "react";
import client from "../api/client";
import { useClientAuth } from "../context/clientAuthContext";
import type { Project } from "../interfaces";

const ClientDashboard = () => {
  const { client: loggedInClient } = useClientAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientProjects = async () => {
      try {
        const token = localStorage.getItem("clientToken");
        console.log("Client token:", token);
        const res = await client.get("/projects/client");
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
    let colorClasses = "";

    switch (status) {
      case "In Progress":
        colorClasses = "bg-yellow-100 text-yellow-700";
        break;
      case "Completed":
        colorClasses = "bg-green-100 text-green-700";
        break;
      case "Pending":
        colorClasses = "bg-blue-100 text-blue-700";
        break;
      default:
        colorClasses = "bg-gray-200 text-gray-600";
        break;
    }

    return (
      <span
        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${colorClasses}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mt-6">Your Projects</h2>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading your projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500 mt-4">No projects assigned yet.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-600 mt-1">{project.description}</p>
              <div className="mt-2">{getStatusBadge(project.status)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientDashboard;
