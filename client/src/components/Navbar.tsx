import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between max-w-full z-50 p-4 px-10 bg-emerald-400">
      <div>
        <h1 className="text-3xl text-white tracking-tight">
          Port<span className="text-white">ora</span>
        </h1>
      </div>
      <div className="place-items-start">
        <label className="font-bold text-white" htmlFor="">
          Search
        </label>
        <input className="bg-gray-100 w-72 ml-2 px-2 py-1 " type="text" />
      </div>
      <div>
        <p className="border-2 border-white rounded-4xl w-60"></p>
      </div>
      <div>
        <h2 className="font-semibold text-white">Welcome, admin</h2>
      </div>
    </div>
  );
};

export default Navbar;
