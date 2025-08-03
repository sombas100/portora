import { useEffect, useState } from "react";
import { useClientAuth } from "../../context/clientAuthContext";
import client from "../../api/client";
import ChatBox from "../../components/ChatBox";

interface Freelancer {
  id: number;
  name: string;
  email: string;
  role?: string;
}

const ClientChatLayout = () => {
  const { client: clientUser } = useClientAuth();
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const token = localStorage.getItem("clientToken");
        const res = await client.get("/clients/my-freelancer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFreelancer(res.data.freelancer);
      } catch (err) {
        console.error("Failed to fetch freelancer", err);
      }
    };

    if (clientUser) {
      fetchFreelancer();
    }
  }, [clientUser]);

  if (!clientUser || !freelancer) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Left: Freelancer Info */}
      <div className="w-80 bg-white border-r p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 text-indigo-700">
          Your Freelancer Info
        </h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-900">{freelancer.name}</p>
            <p className="text-gray-500">{freelancer.email}</p>
          </div>
          {freelancer.role && (
            <p className="text-gray-500">
              <span className="font-medium">Company:</span> {freelancer.role}
            </p>
          )}
        </div>
        <div className="mt-6 text-xs text-gray-400">
          Chat support is available only for ongoing projects.
        </div>
      </div>

      {/* Right: ChatBox */}
      <div className="flex-1 bg-gray-50 p-4 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full bg-white rounded shadow border">
          <ChatBox
            participantId={freelancer.id}
            senderId={clientUser.id}
            senderType="Client"
            receiverType="Freelancer"
            isClient
          />
        </div>
      </div>
    </div>
  );
};

export default ClientChatLayout;
