// FreelancerChatList.tsx
import { useEffect, useState } from "react";
import client from "../api/client";
import { Link } from "react-router-dom";
import type { Client } from "../interfaces";

const FreelancerChatList = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("token");
      const res = await client.get("/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data.clients);
    };

    fetchClients();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Clients</h2>
      <ul className="space-y-4">
        {clients.map((c) => (
          <li
            key={c.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <p className="text-lg font-medium">
                {c.firstName} {c.lastName}
              </p>
              <p className="text-sm text-gray-500">{c.email}</p>
            </div>
            <Link
              to={`/freelancer/chat/${c.id}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Chat
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreelancerChatList;
