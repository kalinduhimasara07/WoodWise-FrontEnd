import { useState, useEffect } from "react";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { MdMessage, MdLogout } from "react-icons/md";
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
      paths: [
        "/admin/furniture",
        "/admin/add-furniture",
        "/admin/poster-generator",
      ],
    },
    {
      name: "Mill",
      icon: FaCog,
      hasDropdown: true,
      subItems: [
        { name: "Dashboard", path: "/admin/mill/dashboard" },
        {
          name: "Inventory",
          path: "/admin/mill/inventory",
          paths: ["/admin/mill/inventory", "/admin/mill/inventory/add-timber"],
        },
        {
          name: "Orders",
          path: "/admin/mill/orders",
          paths: [
            "/admin/mill/orders",
            "/admin/mill/orders/add",
            "/admin/mill/orders/edit",
          ],
        },
        {
          name: "Suppliers",
          path: "/admin/mill/suppliers",
          paths: ["/admin/mill/suppliers", "/admin/mill/suppliers/supplier"],
        },
      ],
    },
    {
      name: "Store",
      icon: FaStore,
      hasDropdown: true,
      subItems: [
        { name: "Dashboard", path: "/admin/store/dashboard" },
        {
          name: "Inventory",
          path: "/admin/store/inventory",
          paths: [
            "/admin/store/inventory",
            "/admin/store/inventory/add-furniture",
          ],
        },
        {
          name: "Orders",
          path: "/admin/store/orders",
          paths: ["/admin/store/orders", "/admin/store/orders/add-order"],
        },
        {
          name: "Showcase",
          path: "/admin/store/showcase",
          paths: ["/admin/store/showcase", "/admin/store/showcase/:id"],
        },
      ],
    },
  ];

  const bottomItems = [
    { name: "Messages", icon: MdMessage, path: "/admin/messages" },
    { name: "Log Out", icon: MdLogout, path: "/login" },
  ];

  // Default to dashboard if on admin root
  useEffect(() => {
    if (pathname === "/admin" || pathname === "/admin/") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [pathname, navigate]);

  // Update the active item whenever the pathname changes
  useEffect(() => {
    const activeMenu = menuItems.find((item) => {
      if (item.hasDropdown) {
        return item.subItems.some((subItem) => {
          if (subItem.paths) {
            return subItem.paths.some((path) => pathname.startsWith(path));
          }
          return pathname === subItem.path;
        });
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
      return item.subItems.some((subItem) => {
        if (subItem.paths) {
          return subItem.paths.some((path) => pathname.startsWith(path));
        }
        return pathname === subItem.path;
      });
    }
    return (
      (item.paths && item.paths.some((path) => pathname.startsWith(path))) ||
      pathname === item.path
    );
  };

  const isSubItemActive = (subItem) => {
    if (subItem.paths) {
      return subItem.paths.some((path) => pathname.startsWith(path));
    }
    return pathname === subItem.path;
  };

  return (
    <aside className="w-64 h-[calc(100vh-70px)] pt-4 bg-gradient-to-b from-[#f5e9da] via-[#f7f3ee] to-[#e7d3bc] flex flex-col overflow-auto shadow-xl rounded-r-3xl">
      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 font-semibold
                      ${
                        isItemActive(item)
                          ? "bg-[#a86523] text-white shadow"
                          : "text-gray-700 hover:bg-[#f3e3c7] hover:text-[#a86523]"
                      }
                    `}
                  >
                    <item.icon
                      size={26}
                      color={isItemActive(item) ? "white" : "#a86523"}
                      className="transition-colors"
                    />
                    <span className="flex-1">{item.name}</span>
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
                    <ul className="ml-2 mt-2 space-y-1 border-l border-[#e2c9a6] pl-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <button
                            onClick={() => navigate(subItem.path)}
                            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left transition-all duration-200 text-sm font-medium
                              ${
                                isSubItemActive(subItem)
                                  ? "bg-[#a86523] text-white shadow"
                                  : "text-gray-600 hover:bg-[#f3e3c7] hover:text-[#a86523]"
                              }
                            `}
                          >
                            {subItem.icon && (
                              <subItem.icon
                                size={18}
                                color={isSubItemActive(subItem) ? "white" : "#a86523"}
                              />
                            )}
                            {subItem.name}
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
                  }
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 font-semibold
                    ${
                      isItemActive(item)
                        ? "bg-[#a86523] text-white shadow"
                        : "text-gray-700 hover:bg-[#f3e3c7] hover:text-[#a86523]"
                    }
                  `}
                >
                  <item.icon
                    size={26}
                    color={
                      isItemActive(item) ? "white" : "#a86523"
                    }
                    className="transition-colors"
                  />
                  <span>{item.name}</span>
                </button>
              )}
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 font-semibold
                  ${
                    pathname === item.path
                      ? "bg-[#a86523] text-white shadow"
                      : "text-gray-700 hover:bg-[#f3e3c7] hover:text-[#a86523]"
                  }
                `}
              >
                <item.icon
                  size={26}
                  color={pathname === item.path ? "white" : "#a86523"}
                  className="transition-colors"
                />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
