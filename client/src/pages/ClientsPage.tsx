import { useEffect, useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/authContext";
import type { Client } from "../interfaces";
import CreateProjectModal from "../components/ui/CreateModal";
import CreateClientModal from "../components/ui/CreateClientModal"; // <- Import modal
import { Link } from "react-router-dom";

const ClientsPage = () => {
  const { token } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const [isClientModalOpen, setClientModalOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    const fetchClients = async () => {
      try {
        const res = await client.get("/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClients(res.data.clients);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [token]);

  const openProjectModal = (clientId: number) => {
    setSelectedClientId(clientId);
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
    setSelectedClientId(null);
  };

  const openClientModal = () => setClientModalOpen(true);
  const closeClientModal = () => setClientModalOpen(false);

  const handleClientCreated = () => {
    closeClientModal();
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Clients</h1>
        <button
          onClick={openClientModal}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create Client
        </button>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl border-b pb-3 border-zinc-400 font-semibold mb-4 text-gray-700">
          Client List
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
                <div className="space-x-2">
                  <Link to={`/clients/${client.id}`}>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-600 transition">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => openProjectModal(client.id)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-emerald-600 transition"
                  >
                    Create Project
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
        clientId={selectedClientId}
        onProjectCreated={closeProjectModal}
      />

      <CreateClientModal
        isOpen={isClientModalOpen}
        onClose={closeClientModal}
        onClientCreated={handleClientCreated}
      />
    </div>
  );
};

export default ClientsPage;
