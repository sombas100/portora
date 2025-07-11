import { Outlet } from "react-router-dom";
import ClientNavbar from "../ClientNavbar";
import ClientSidebar from "../ClientSidebar";

const ClientDashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64">
        <ClientSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <ClientNavbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientDashboardLayout;
