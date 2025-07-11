import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext.tsx";
import { ClientAuthProvider } from "./context/clientAuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ClientAuthProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ClientAuthProvider>
    </Router>
  </StrictMode>
);
