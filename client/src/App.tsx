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
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Features from "./pages/landing/Features";
import Pricing from "./pages/landing/Pricing";
import FAQ from "./pages/landing/FAQ";
import Support from "./pages/landing/Support";
import PrivacyPolicy from "./pages/landing/PrivacyPolicy";
import Terms from "./pages/landing/Terms";
import { usePageTitle } from "./hooks/usePageTitle";

function App() {
  usePageTitle();
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
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
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
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
