import { Link, useLocation } from "react-router-dom";
import { FaProjectDiagram, FaCommentDots } from "react-icons/fa";

const ClientSidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      label: "My Projects",
      path: "/client-dashboard",
      icon: <FaProjectDiagram />,
    },
    {
      label: "Feedback",
      path: "/client-dashboard/feedback",
      icon: <FaCommentDots />,
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-6 fixed top-0 left-0">
      <div className="text-2xl ml-8 mb-8 flex items-center font-bold text-emerald-600 ">
        Portora
      </div>
      <ul className="space-y-4 mt-12">
        {navItems.map(({ label, path, icon }) => (
          <li key={label}>
            <Link
              to={path}
              className={`flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-emerald-100 transition ${
                location.pathname === path ? "bg-emerald-200 font-semibold" : ""
              }`}
            >
              {icon}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ClientSidebar;
