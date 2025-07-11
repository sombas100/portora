import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import ClientDashboardLayout from "./components/layout/ClientDashboardLayout";
import Login from "./pages/Login";
import ClientLoginPage from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";

function App() {
  return (
    <div className="bg-gray-200">
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/client-dashboard" element={<ClientDashboardLayout />}>
          <Route index element={<ClientDashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/client-login" element={<ClientLoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
