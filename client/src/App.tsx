import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="bg-gray-200">
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
