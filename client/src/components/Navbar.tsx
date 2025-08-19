import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="w-full z-50 bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b">
      {/* Search */}
      <div className="relative w-72 hidden md:flex items-center">
        <FaSearch className="absolute left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* User */}
      <div className="flex items-center space-x-4">
        <div className="text-right hidden md:block">
          {user && (
            <>
              <p className="text-sm text-gray-500">Welcome,</p>
              <h2 className="text-md font-semibold text-gray-800">
                {user?.name || "Guest"}
              </h2>
            </>
          )}
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
          A
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
