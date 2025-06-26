import { useState, useEffect } from "react";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { MdShoppingCart, MdMessage, MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCouch } from "react-icons/fa";

export default function AdminSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems = [
    { name: "Dashboard", icon: AiOutlineDashboard, path: "/admin/dashboard" },
    {
      name: "User",
      icon: AiOutlineUser,
      paths: ["/admin/user", "/admin/user/add-user"], // Multiple paths for the "User" section
    },
    { name: "Furniture", icon: FaCouch, paths: ["/admin/furniture", "/admin/add-furniture"] },
  ];

  const bottomItems = [
    { name: "Messages", icon: MdMessage, path: "/admin/messages" },
    { name: "Log Out", icon: MdLogout },
  ];

  // Update the active item whenever the pathname changes
  useEffect(() => {
    const activeMenu = menuItems.find((item) =>
      item.paths
        ? item.paths.some((path) => pathname.startsWith(path))  // For multiple paths
        : pathname === item.path  // For single path
    );
    setActiveItem(activeMenu ? activeMenu.name : "Dashboard"); // Default to "Dashboard" if no match
  }, [pathname]);

  return (
    <div className="w-64 h-[calc(100vh-70px)] pt-2 bg-[#d9d9d9] flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.paths ? item.paths[0] : item.path)}  // Use the first path if multiple exist
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-colors duration-200 ${
                  item.paths && item.paths.some((path) => pathname.startsWith(path)) || pathname === item.path
                    ? 'bg-[#a86523] text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <item.icon size={30} color={pathname === item.path || (item.paths && item.paths.some((path) => pathname.startsWith(path))) ? 'white' : '#a86523'} />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  pathname === item.path
                    ? 'bg-[#a86523] text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <item.icon size={30} color={pathname === item.path ? 'white' : '#a86523'} />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
