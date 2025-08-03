import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { Chat } from "../interfaces";

const socket = io("http://localhost:3000");

interface ChatContextType {
  socket: Socket;
  messages: Chat[];
  sendMessage: (message: Chat) => void;
  setMessages: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const chatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Chat[]>([]);

  const sendMessage = (message: Chat) => {
    socket.emit("sendMessage", message);
  };

  useEffect(() => {
    socket.on("newMessage", (msg: Chat) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  return (
    <chatContext.Provider
      value={{ socket, messages, setMessages, sendMessage }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(chatContext);
  if (!context) throw new Error("useChat must be used within a chat provider");
  return context;
};
