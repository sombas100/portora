import { useEffect, useState } from "react";
import client from "../../api/client";
import { useAuth } from "../../context/authContext";
import type { Client } from "../../interfaces";
import CreateProjectModal from "../../components/ui/CreateModal";

interface UsageType {
  used: number;
  limit: number;
  remaining: number;
  plan: string;
}

const Dashboard = () => {
  const { token } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [usage, setUsage] = useState<UsageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await client.get("/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClients(res.data.clients);
        setUsage(res.data.usage);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [token]);

  const openModal = (clientId: number) => {
    setSelectedClientId(clientId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedClientId(null);
  };

  const handleProjectCreated = () => {
    // fetchProjects()
    closeModal();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Freelancer Dashboard
      </h1>

      {usage && (
        <div className="bg-white shadow rounded p-4 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Plan Usage</h2>
            <p className="text-sm text-gray-500">Plan: {usage.plan}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <p className="text-xl font-bold text-emerald-600">{usage.used}</p>
              <p className="text-sm text-gray-500">Used</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-yellow-500">
                {usage.remaining}
              </p>
              <p className="text-sm text-gray-500">Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-700">{usage.limit}</p>
              <p className="text-sm text-gray-500">Limit</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl border-b pb-3 border-zinc-400 font-semibold mb-4 text-gray-700">
          Your Clients
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading clients...</p>
        ) : clients.length === 0 ? (
          <p className="text-gray-500">You have no clients yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {clients.map((client) => (
              <li
                key={client.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {client.firstName} {client.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {client.email} — {client.company}
                  </p>
                </div>
                <button
                  onClick={() => openModal(client.id)}
                  className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition"
                >
                  Create Project
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal Component */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        clientId={selectedClientId}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default Dashboard;
