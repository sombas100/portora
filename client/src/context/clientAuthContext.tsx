import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedClientToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ClientContextType {
  client: DecodedClientToken | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const ClientAuthContext = createContext<ClientContextType | undefined>(
  undefined
);

export const ClientAuthProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<DecodedClientToken | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("clientToken");

    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedClientToken>(storedToken);
        setClient(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid client token");
        logout();
      }
    }
  }, []);

  const login = (newToken: string) => {
    const decoded = jwtDecode<DecodedClientToken>(newToken);
    setClient(decoded);
    setToken(newToken);
    localStorage.setItem("clientToken", newToken);
  };

  const logout = () => {
    setClient(null);
    setToken(null);
    localStorage.removeItem("clientToken");
  };

  return (
    <ClientAuthContext.Provider
      value={{
        client,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error("useClientAuth must be used within a ClientAuthProvider");
  }
  return context;
};
