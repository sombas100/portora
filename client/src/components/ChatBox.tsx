import { useEffect, useState, useRef } from "react";
import { useChat } from "../context/chatContext";
import client from "../api/client";
import { IoIosSend } from "react-icons/io";

interface Props {
  participantId: number;
  senderId: number;
  senderType: string;
  receiverType: string;
  isClient?: boolean;
}

const ChatBox = ({
  participantId,
  senderId,
  senderType,
  receiverType,
  isClient,
}: Props) => {
  const { messages, sendMessage, setMessages, socket } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem(
      isClient ? "clientToken" : "freelancerToken"
    );
    const endpoint = isClient
      ? `/messages/client/history/${participantId}`
      : `/messages/history/${participantId}`;

    client
      .get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error("Failed to fetch chat history", err));

    socket.emit("joinRoom", {
      userId: senderId,
      peerId: participantId,
    });
  }, [participantId, senderId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      content: input,
      senderId,
      receiverId: participantId,
      senderType,
      receiverType,
    };

    sendMessage(newMessage);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded shadow">
      {/* Header */}
      <div className="px-4 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-t">
        Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => {
          const isMe = msg.senderId === senderId;
          return (
            <div
              key={idx}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
                  isMe
                    ? "bg-indigo-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{msg.content}</p>
                {msg.createdAt && (
                  <div className="text-[10px] text-right mt-1 text-gray-300">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2 bg-white rounded-b">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 flex items-center gap-1 justify-center hover:bg-indigo-700 cursor-pointer text-white px-4 py-2 rounded transition"
        >
          Send <IoIosSend size={15} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
