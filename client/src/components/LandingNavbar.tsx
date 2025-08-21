import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm z-50 relative">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/welcome">
          <h1 className="text-xl font-bold uppercase tracking-wider">
            Portora
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12 font-semibold">
          <Link className="hover:text-emerald-500 transition" to="/features">
            Features
          </Link>
          <Link className="hover:text-emerald-500 transition" to="/pricing">
            Pricing
          </Link>
          <Link className="hover:text-emerald-500 transition" to="/FAQ">
            FAQ
          </Link>
          <Link className="hover:text-emerald-500 transition" to="/support">
            Support
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            className="font-semibold hover:text-gray-400 transition"
            to="/login"
          >
            Log In
          </Link>
          <Link to="/register">
            <button className="bg-emerald-500 cursor-pointer text-white font-semibold px-4 py-2 rounded-md hover:bg-white hover:text-emerald-500 border transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-2xl text-gray-700"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Slide-In Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-gray-600"
          >
            <IoClose className="cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4 font-medium text-gray-700">
          <Link to="/features" onClick={() => setIsOpen(false)}>
            Features
          </Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)}>
            Pricing
          </Link>
          <Link to="/FAQ" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
          <Link to="/support" onClick={() => setIsOpen(false)}>
            Support
          </Link>
          <hr />
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Log In
          </Link>
          <Link to="/register" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-emerald-500 cursor-pointer text-white font-semibold py-2 rounded hover:bg-emerald-600 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default LandingNavbar;
