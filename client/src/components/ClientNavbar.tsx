import { useClientAuth } from "../context/clientAuthContext";

const ClientNavbar = () => {
  const { client } = useClientAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-emerald-500 shadow-md">
      <div className="flex items-center gap-4">
        <p className="text-white font-medium">
          Welcome, {client?.firstName} {client?.lastName}
        </p>
      </div>
    </nav>
  );
};

export default ClientNavbar;
