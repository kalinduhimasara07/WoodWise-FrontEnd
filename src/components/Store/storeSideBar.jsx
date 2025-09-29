import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { MdShoppingCart, MdMessage, MdLogout } from "react-icons/md";
import { RiSofaLine } from "react-icons/ri";
import { useEffect } from "react";

export default function StoreSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Define order-related paths
  const orderPaths = ["/store/orders", "/store/orders/add-order"];

  // Define inventory-related paths
  const inventoryPaths = ["/store/inventory", "/store/inventory/add-furniture"];

  // Define showcase-related paths
  const showcasePaths = ["/store/showcase", "/store/showcase/:id"];

  // Check if current path is order-related
  const isOrderPath = orderPaths.some((path) => pathname.startsWith(path));

  // Default to orders if on store root
  useEffect(() => {
    if (pathname === "/store" || pathname === "/store/") {
      navigate("/store/dashboard", { replace: true });
    }
  }, [pathname, navigate]);

  const menuItems = [
    { name: "Dashboard", icon: AiOutlineDashboard, path: "/store/dashboard" },
    {
      name: "Inventory",
      icon: RiSofaLine,
      path: "/store/inventory",
      subPaths: inventoryPaths, // Store all inventory paths for reference
    },
    {
      name: "Orders",
      icon: MdShoppingCart,
      path: "/store/orders",
      subPaths: orderPaths, // Store all order paths for reference
    },
    {
      name: "Showcase",
      icon: HiOutlineDesktopComputer,
      path: "/store/showcase",
      subPaths: showcasePaths, // Store all showcase paths for reference
    },
  ];

  const bottomItems = [
    { name: "Messages", icon: MdMessage, path: "/store/messages" },
    { name: "Log Out", icon: MdLogout, path: "/login" },
  ];

  // Function to check if item should be active
  const isItemActive = (item) => {
    if (item.name === "Orders") {
      return isOrderPath;
    }
    if (item.name === "Inventory") {
      return inventoryPaths.some((path) => pathname.startsWith(path));
    }
    if (item.name === "Showcase") {
      return showcasePaths.some((path) => pathname.startsWith(path));
    }
    return pathname === item.path;
  };

  return (
    <div className="w-64 h-[calc(100vh-70px)] pt-4 bg-gradient-to-b from-[#f5e9da] via-[#f7f3ee] to-[#e7d3bc] flex flex-col overflow-auto shadow-xl rounded-r-3xl">
      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-colors duration-200 ${
                  isItemActive(item)
                    ? "bg-[#a86523] text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <item.icon
                  size={30}
                  color={isItemActive(item) ? "white" : "#a86523"}
                />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Items */}
      <div className="p-4 border-t border-[#e2c9a6] mt-2">
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
