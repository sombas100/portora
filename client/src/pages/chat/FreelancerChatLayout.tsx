import { useEffect, useState } from "react";
import client from "../../api/client";
import { useAuth } from "../../context/authContext";
import ChatBox from "../../components/ChatBox";
import type { Client } from "../../interfaces";

const FreelancerChatLayout = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await client.get("/clients", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setClients(res.data.clients);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-gray-50 overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Your Clients</h2>
        <ul className="space-y-2">
          {clients.map((client) => (
            <li
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={`cursor-pointer p-3 rounded hover:bg-gray-200 ${
                selectedClient?.id === client.id ? "bg-gray-200" : ""
              }`}
            >
              <p className="font-medium">
                {client.firstName} {client.lastName}
              </p>
              <p className="text-sm text-gray-500">{client.email}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 p-6 bg-white">
        {selectedClient ? (
          <ChatBox
            participantId={selectedClient.id}
            senderId={user!.id}
            senderType="Freelancer"
            receiverType="Client"
          />
        ) : (
          <p className="text-gray-500">Select a client to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerChatLayout;
