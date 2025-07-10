import {
  RiDashboardHorizontalFill,
  RiTeamFill,
  RiFolder3Fill,
  RiSettings3Fill,
} from "react-icons/ri";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen shadow-md border-r px-6 py-8">
      <nav className="flex flex-col space-y-6">
        <div className="text-2xl ml-8 mb-8 flex items-center font-bold text-emerald-600 ">
          Portora
        </div>

        <ul className="space-y-2 text-gray-700 font-medium">
          <li className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-50 transition cursor-pointer">
            <RiDashboardHorizontalFill className="mr-3 text-xl" />
            Dashboard
          </li>

          <li className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-50 transition cursor-pointer">
            <RiTeamFill className="mr-3 text-xl" />
            Clients
          </li>

          <li className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-50 transition cursor-pointer">
            <RiFolder3Fill className="mr-3 text-xl" />
            Projects
          </li>

          <li className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-50 transition cursor-pointer">
            <RiSettings3Fill className="mr-3 text-xl" />
            Settings
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
