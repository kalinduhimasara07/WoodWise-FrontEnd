import { useState, useEffect } from "react";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { MdShoppingCart, MdMessage, MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCouch,
  FaCog,
  FaStore,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

export default function AdminSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [millExpanded, setMillExpanded] = useState(false);
  const [storeExpanded, setStoreExpanded] = useState(false);
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
    {
      name: "Furniture",
      icon: FaCouch,
      paths: ["/admin/furniture", "/admin/add-furniture"],
    },
    {
      name: "Mill",
      icon: FaCog,
      hasDropdown: true,
      subItems: [
        { name: "Dashboard", path: "/admin/mill/dashboard" },
        { name: "Inventory", path: "/admin/mill/inventory" },
        { name: "Orders", path: "/admin/mill/orders" },
        { name: "Supplies", path: "/admin/mill/supplies" },
        { name: "Suppliers", path: "/admin/mill/suppliers" },
      ],
    },
    {
      name: "Store",
      icon: FaStore,
      hasDropdown: true,
      subItems: [
        { name: "Dashboard", path: "/admin/store/dashboard" },
        { name: "Inventory", path: "/admin/store/inventory" },
        { name: "Orders", path: "/admin/store/orders" },
        { name: "Showcase", path: "/admin/store/showcase" },
      ],
    },
  ];

  const bottomItems = [
    { name: "Messages", icon: MdMessage, path: "/admin/messages" },
    { name: "Log Out", icon: MdLogout, path: "/login" },
  ];

  // Update the active item whenever the pathname changes
  useEffect(() => {
    const activeMenu = menuItems.find((item) => {
      if (item.hasDropdown) {
        return item.subItems.some((subItem) => pathname === subItem.path);
      }
      return item.paths
        ? item.paths.some((path) => pathname.startsWith(path)) // For multiple paths
        : pathname === item.path; // For single path
    });
    setActiveItem(activeMenu ? activeMenu.name : "Dashboard"); // Default to "Dashboard" if no match

    // Auto-expand dropdowns if a sub-item is active
    if (pathname.startsWith("/admin/mill")) {
      setMillExpanded(true);
    }
    if (pathname.startsWith("/admin/store")) {
      setStoreExpanded(true);
    }
  }, [pathname]);

  const handleDropdownToggle = (itemName) => {
    if (itemName === "Mill") {
      setMillExpanded(!millExpanded);
    } else if (itemName === "Store") {
      setStoreExpanded(!storeExpanded);
    }
  };

  const isItemActive = (item) => {
    if (item.hasDropdown) {
      return item.subItems.some((subItem) => pathname === subItem.path);
    }
    return (
      (item.paths && item.paths.some((path) => pathname.startsWith(path))) ||
      pathname === item.path
    );
  };

  return (
    <div
      className="w-64 h-[calc(100vh-70px)] pt-2 bg-[#d9d9d9] flex flex-col overflow-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
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
                    <span className="font-medium flex-1">{item.name}</span>
                    {item.name === "Mill" ? (
                      millExpanded ? (
                        <FaChevronDown size={16} />
                      ) : (
                        <FaChevronRight size={16} />
                      )
                    ) : storeExpanded ? (
                      <FaChevronDown size={16} />
                    ) : (
                      <FaChevronRight size={16} />
                    )}
                  </button>
                  {((item.name === "Mill" && millExpanded) ||
                    (item.name === "Store" && storeExpanded)) && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <button
                            onClick={() => navigate(subItem.path)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors duration-200 ${
                              pathname === subItem.path
                                ? "bg-[#a86523] text-white"
                                : "text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            <span className="font-medium text-sm">
                              {subItem.name}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <button
                  onClick={() =>
                    navigate(item.paths ? item.paths[0] : item.path)
                  } // Use the first path if multiple exist
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-colors duration-200 ${
                    (item.paths &&
                      item.paths.some((path) => pathname.startsWith(path))) ||
                    pathname === item.path
                      ? "bg-[#a86523] text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <item.icon
                    size={30}
                    color={
                      pathname === item.path ||
                      (item.paths &&
                        item.paths.some((path) => pathname.startsWith(path)))
                        ? "white"
                        : "#a86523"
                    }
                  />
                  <span className="font-medium">{item.name}</span>
                </button>
              )}
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
