import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./components/Sidebar";
import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/Login";

function App() {
  return (
    <div className="bg-gray-200">
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
