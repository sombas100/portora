import { RiDashboardHorizontalFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="flex max-w-44 items-start justify-center bg-white h-screen">
      <div>
        <ul className="flex flex-col font-semibold mt-10 text-zinc-500 tracking-wide">
          <li className="flex items-center my-2">
            <RiDashboardHorizontalFill className="mr-2" /> Dashboard
          </li>
          <li className="my-2">Clients</li>
          <li className="my-2">Projects</li>
          <li className="my-2">Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
