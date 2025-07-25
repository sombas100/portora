import { useEffect, useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/authContext";
import type { Project } from "../interfaces";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (!token) return;
    const fetchProjects = async () => {
      try {
        const res = await client.get("/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const handleDelete = async (id: number) => {
    try {
      await client.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const getStatusBadge = (status: string) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "Pending":
        return `${base} bg-blue-100 text-blue-700`;
      case "In Progress":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "Completed":
        return `${base} bg-green-100 text-green-700`;
      default:
        return `${base} bg-gray-200 text-gray-600`;
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Projects</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="p-2 border rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border cursor-pointer rounded w-full md:w-1/4"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-gray-500">No projects match your criteria.</p>
      ) : (
        <ul className="space-y-4">
          {filteredProjects.map((project) => (
            <li
              key={project.id}
              className="bg-white p-4 shadow-sm rounded-md border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className={getStatusBadge(project.status)}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600">{project.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Due:{" "}
                {project.dueDate
                  ? format(new Date(project.dueDate), "PPP")
                  : "No deadline"}
              </p>
              <p className="text-sm text-gray-500">
                Client:{" "}
                <span className="font-medium">
                  {project.Client?.firstName} {project.Client?.lastName}
                </span>
              </p>

              <div className="flex gap-3 mt-4">
                <Link to={`/projects/${project.id}`}>
                  <button className="text-sm cursor-pointer text-blue-600 hover:underline">
                    View
                  </button>
                </Link>
                <button className="text-sm cursor-pointer text-yellow-600 hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-sm cursor-pointer text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectsPage;
