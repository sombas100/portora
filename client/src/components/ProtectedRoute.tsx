import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="login" replace />;
  }

  return children;
};

export default ProtectedRoute;
