import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation to get the current path

// You can install react-icons by running: npm install react-icons
// Then, you can uncomment the following lines to use them.
// import { FiUser, FiShoppingCart } from 'react-icons/fi';

export default function Header() {
  // Get the current location object, which contains the pathname
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate(); // Import useNavigate to programmatically navigate

  // For debugging purposes, you can see the current path in the console

  // A helper function to determine if a link is active
  const isActive = (path) => pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img
                className="h-10 w-auto"
                src="/logo.png"
                alt="WoodWise Logo"
              />
              <span className="text-3xl font-poppins font-bold text-gray-800">
                WoodWise
              </span>
            </Link>
          </div>

          {/* Centered Navigation */}
          <nav className="hidden md:flex flex-grow justify-center">
            <div className="flex items-baseline space-x-10">
              <Link
                to="/"
                className={`relative text-lg font-medium text-gray-600 hover:text-amber-700 transition-colors duration-300
                  ${isActive("/") ? "text-amber-700" : ""}
                `}
              >
                Home
                {isActive("/") && (
                  <span className="absolute left-0 -bottom-2 block h-0.5 w-full bg-amber-700 transform transition-transform duration-300" />
                )}
              </Link>
              <Link
                to="/furniture"
                className={`relative text-lg font-medium text-gray-600 hover:text-amber-700 transition-colors duration-300
                  ${isActive("/furniture") ? "text-amber-700" : ""}
                `}
              >
                Furniture
                {isActive("/furniture") && (
                  <span className="absolute left-0 -bottom-2 block h-0.5 w-full bg-amber-700 transform transition-transform duration-300" />
                )}
              </Link>
              <Link
                to="/category"
                className={`relative text-lg font-medium text-gray-600 hover:text-amber-700 transition-colors duration-300
                  ${isActive("/category") ? "text-amber-700" : ""}
                `}
              >
                Category
                {isActive("/category") && (
                  <span className="absolute left-0 -bottom-2 block h-0.5 w-full bg-amber-700 transform transition-transform duration-300" />
                )}
              </Link>
              {/* aboutus */}
              <Link
                to="/aboutus"
                className={`relative text-lg font-medium text-gray-600 hover:text-amber-700 transition-colors duration-300
                  ${isActive("/aboutus") ? "text-amber-700" : ""}
                `}
              >
                About
                {isActive("/aboutus") && (
                  <span className="absolute left-0 -bottom-2 block h-0.5 w-full bg-amber-700 transform transition-transform duration-300" />
                )}
              </Link>
              {/* Contact Us */}
              <Link
                to="/contactus"
                className={`relative text-lg font-medium text-gray-600 hover:text-amber-700 transition-colors duration-300
                  ${isActive("/contactus") ? "text-amber-700" : ""}
                `}
              >
                Contact
                {isActive("/contactus") && (
                  <span className="absolute left-0 -bottom-2 block h-0.5 w-full bg-amber-700 transform transition-transform duration-300" />
                )}
              </Link>
            </div>
          </nav>

          {/* Right-side Icons (Optional but recommended) */}
          <div className="hidden md:flex items-center space-x-5">
            {location.state && location.state.from === "storeShowcase" ? (
              <button onClick={() => navigate("/store/showcase")} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 transition-colors duration-300 rounded-4xl">
                <span className=" cursor-pointer">
                  Back to Store
                </span>
              </button>
            ) : null}
            {location.state && location.state.from === "adminstoreShowcase" ? (
              <button onClick={() => navigate("/admin/store/showcase")} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 transition-colors duration-300 rounded-4xl">
                <span className=" cursor-pointer">
                  Back to Admin Store
                </span>
              </button>
            ) : null}
            <Link to="/cart" className="text-gray-500 hover:text-amber-700">
              {/* <FiShoppingCart size={24} /> */}
              <span className="text-2xl">🛒</span> {/* Placeholder icon */}
            </Link>
          </div>

          {/* Mobile Menu Button (for smaller screens) */}
          <div className="md:hidden">
            {/* You can add a hamburger menu button here */}
          </div>
        </div>
      </div>
    </header>
  );
}
