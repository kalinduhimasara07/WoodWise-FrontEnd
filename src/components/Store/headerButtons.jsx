import { useEffect, useState } from "react";
import { User, ChevronDown, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HeaderButtons() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUsername(res.data.username);
        setUserEmail(res.data.email);
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, []); // ✅ no [status] loop

  return (
    <div className="flex items-center gap-3">
      {/* User Profile Button with Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-1 py-1 text-[#a86523] hover:text-gray-800 hover:bg-gray-100 rounded-2xl border-1 border-[#a86523] transition-colors duration-200"
        >
          <div className="w-8 h-8 bg-[#a86523] rounded-full flex items-center justify-center">
            <User size={18} className="text-white" />
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
                <p className="text-sm font-medium text-gray-900">{username}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login"); // Refresh the page to reset all state
                  }}
                >
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
  );
}
