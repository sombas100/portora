import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/authContext";
import type { Client, Project } from "../interfaces";
import ResendLoginLinkButton from "../components/ui/ResendLoginLinkButton";
import { format } from "date-fns";
import { toast } from "react-toastify";

const ClientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [clientData, setClientData] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingClient, setLoadingClient] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await client.get(`/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClientData(res.data);
      } catch (err) {
        console.error("Failed to fetch client", err);
      } finally {
        setLoadingClient(false);
      }
    };

    const fetchClientProjects = async () => {
      try {
        const res = await client.get(`/clients/${id}/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    if (id && token) {
      fetchClient();
      fetchClientProjects();
    }
  }, [id, token]);

  const handleDeleteClient = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this client? This action cannot be undone."
    );
    if (!confirm || !id) return;

    try {
      await client.delete(`/clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Client deleted successfully");
      navigate("/clients");
    } catch (error: any) {
      console.error("Delete failed:", error);
      toast.error(error.response?.data?.message || "Failed to delete client");
    }
  };

  if (loadingClient)
    return <p className="p-6 text-gray-500">Loading client...</p>;
  if (!clientData)
    return <p className="p-6 text-gray-500">Client not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {clientData.firstName} {clientData.lastName}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-md text-gray-600 cursor-pointer hover:text-gray-900 transition"
        >
          ← Back
        </button>
      </div>

      {/* Client Info */}
      <div className="bg-white shadow-sm rounded-lg p-6 space-y-4 border border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-base text-gray-800 font-medium">
            {clientData.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Company</p>
          <p className="text-base text-gray-800 font-medium">
            {clientData.company || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Joined On</p>
          <p className="text-base text-gray-800 font-medium">
            {new Date(clientData.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="pt-4 border-t">
          <ResendLoginLinkButton clientId={clientData.id} />
        </div>
      </div>

      {/* Associated Projects */}
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Associated Projects
        </h2>
        {loadingProjects ? (
          <p className="text-gray-500">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">No projects found for this client.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="p-4 border rounded shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium
                    ${
                      project.status === "Pending"
                        ? "bg-blue-100 text-blue-700"
                        : project.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600">{project.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Due:{" "}
                  {project.dueDate
                    ? format(new Date(project.dueDate), "PPP")
                    : "No due date"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDeleteClient}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete Client
        </button>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
