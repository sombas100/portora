import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/admin/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import ClientDashboardLayout from "./components/layout/ClientDashboardLayout";
import Login from "./pages/Login";
import ClientLoginPage from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetailsPage";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import ClientProjectDetails from "./pages/client/ClientProjectDetails";
import BillingCancelled from "./pages/stripe/BillingCancel";
import BillingSuccess from "./pages/stripe/BillingSuccess";
import CancelSubscriptionPage from "./pages/stripe/CancelSubscriptionPage";
import FreelancerChatLayout from "./pages/chat/FreelancerChatLayout";
import ClientChatLayout from "./pages/chat/ClientChatLayout";

function App() {
  return (
    <div className="bg-gray-200">
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:id" element={<ClientDetailsPage />} />
          <Route path="/chat" element={<FreelancerChatLayout />} />
        </Route>
        <Route path="/client-dashboard" element={<ClientDashboardLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="projects/:id" element={<ClientProjectDetails />} />
          <Route path="chat" element={<ClientChatLayout />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/client-login" element={<ClientLoginPage />} />
        <Route path="/billing-success" element={<BillingSuccess />} />
        <Route path="/billing-cancelled" element={<BillingCancelled />} />
        <Route
          path="/cancel-subscription"
          element={<CancelSubscriptionPage />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
