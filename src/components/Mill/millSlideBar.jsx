import { useEffect, useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { GiWoodBeam } from "react-icons/gi";
import { MdShoppingCart, MdMessage, MdLogout } from "react-icons/md";
import { PiBuildingsDuotone } from "react-icons/pi";
import { TbWood } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

export default function MillSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Helper function to check if a path is active for items with multiple paths
  const isPathActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((path) => pathname.startsWith(path));
    }
    return pathname === paths;
  };

  useEffect(() => {
    if (pathname === "/mill" || pathname === "/mill/") {
      navigate("/mill/dashboard", { replace: true });
    }
  }, [pathname, navigate]);

  const menuItems = [
    { name: "Dashboard", icon: AiOutlineDashboard, path: "/mill/dashboard" },
    {
      name: "Inventory",
      icon: TbWood,
      path: ["/mill/inventory", "/mill/inventory/add-timber"],
      defaultPath: "/mill/inventory",
    },
    {
      name: "Orders",
      icon: MdShoppingCart,
      path: ["/mill/orders", "/mill/orders/add-order"],
      defaultPath: "/mill/orders",
    },
    { name: "Suppliers", icon: PiBuildingsDuotone, path: "/mill/suppliers" },
  ];

  const bottomItems = [
    { name: "Messages", icon: MdMessage, path: "/mill/messages" },
    { name: "Log Out", icon: MdLogout, path: "/login" },
  ];

  const handleNavigation = (item) => {
    if (item.defaultPath) {
      // If the item has multiple paths, navigate to the default path
      navigate(item.defaultPath);
    } else {
      // For single path items, navigate normally
      navigate(item.path);
    }
  };

  return (
    <div className="w-64 h-[calc(100vh-70px)] pt-2 bg-[#d9d9d9] flex flex-col">
      {/* Header */}
      {/* <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-600 rounded-md"></div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">WoodWise</h1>
            <p className="text-sm text-gray-600">Mill</p>
          </div>
        </div>
      </div> */}

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-colors duration-200 ${
                  isPathActive(item.path)
                    ? "bg-[#a86523] text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <item.icon
                  size={30}
                  color={isPathActive(item.path) ? "white" : "#a86523"}
                />
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
                    ? "bg-[#a86523] text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <item.icon
                  size={30}
                  color={pathname === item.path ? "white" : "#a86523"}
                />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
