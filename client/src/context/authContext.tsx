import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type UserRole = "Freelancer" | "Client";

interface DecodedToken {
  id: number;
  name: string;
  email: string;
  role?: UserRole;
}

interface AuthContextType {
  user: DecodedToken | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, role: UserRole) => void;
  logout: () => void;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") as UserRole;

    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        setUser(decoded);
        setToken(storedToken);
        setRole(storedRole);
      } catch (error) {
        console.error("Invlaid token", error);
        logout();
      }
    }
  }, []);

  const login = (newToken: string, userRole: UserRole) => {
    const decoded = jwtDecode<DecodedToken>(newToken);
    setUser(decoded);
    setToken(newToken);
    setRole(role);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", userRole);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
  };

  const value: AuthContextType = {
    token,
    user,
    role,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an auth AuthProvider");
  }
  return context;
};
