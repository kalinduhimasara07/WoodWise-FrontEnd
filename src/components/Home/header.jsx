import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import HeaderButtons from "../Store/headerButtons"; // Import your HeaderButtons component
import { ChevronDown, User } from "lucide-react";

export default function Header() {
  // State to track the active navigation item
  const [activeNav, setActiveNav] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function for navigation

  // Function to handle the navigation and active class
  const handleNavClick = (navItem, url) => {
    setActiveNav(navItem);
    navigate(url); // Navigate to the URL based on the clicked button
  };

  return (
    <header className="bg-white shadow h-[70px]">
      <div className="mx-auto px-4 py-3 flex">
        {/* Logo Section */}
        <div className="w-[35px] h-[35px] bg-[#A86523] border border-black mx-5 rounded-sm"></div>
        <div className="m-0 p-0">
          <h1 className="text-3xl font-poppins font-bold m-0 p-0">WoodWise</h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 ml-auto text-xl">
          <a
            onClick={() => handleNavClick("home", "/home")}
            className={`text-gray-900 hover:text-amber-700 transition-colors duration-200 font-medium ${
              activeNav === "home" ? "border-b-3 border-amber-700 pb-1" : ""
            }`}
          >
            Home
          </a>
          <a
            onClick={() => handleNavClick("furniture", "/furniture")}
            className={`text-gray-600 hover:text-amber-700 transition-colors duration-200 font-medium ${
              activeNav === "furniture"
                ? "border-b-3 border-amber-700 pb-1"
                : ""
            }`}
          >
            Furniture
          </a>
          <a
            onClick={() => handleNavClick("category", "/category")}
            className={`text-gray-600 hover:text-amber-700 transition-colors duration-200 font-medium ${
              activeNav === "category" ? "border-b-3 border-amber-700 pb-1" : ""
            }`}
          >
            Category
          </a>
        </nav>

        {/* HeaderButtons Component */}
        <div className="ml-auto">
          {/* User Profile Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-1 py-1 text-[#737791] hover:text-gray-800 hover:bg-gray-100 rounded-2xl border-1 border-[#737791] transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={18} className="text-gray-600" />
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">
                      john.doe@example.com
                    </p>
                  </div>

                  <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <UserCircle size={16} />
                    Profile
                  </button>

                  <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings size={16} />
                    Settings
                  </button>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Backdrop to close dropdown when clicking outside */}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
