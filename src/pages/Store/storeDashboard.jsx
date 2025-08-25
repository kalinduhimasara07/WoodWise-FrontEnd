import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Store/header";
import StoreSidebar from "../../components/Store/storeSideBar";
import StoreOrdersPage from "./storeOrderPage";
import StoreInventory from "./storeInventory";
import StoreShowCase from "./storeShowcase";
import StoreMessages from "./storeMessages";
import PlaceOrder from "./addOrder";
import AddFurniture from "./addFurniture";
import NotFoundPage from "../../components/notFoundPage";
import EditFurniture from "./editFurniture";
import ProductOverview from "./productOverViewPage";
import EditOrder from "./editOrder";
import ImageGenerator from "../imageGenerator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../../components/loader";

export default function StoreHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus("unauthenticated");
        toast.error("Please login first");
        navigate("/login", { replace: true });
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.role !== "storestaff" && res.data.role !== "admin") {
          setStatus("unauthorized");
          toast.error("You are not authorized to access this page");
          navigate("/login", { replace: true });
        } else {
          setStatus("authenticated");
        }
      } catch (err) {
        console.log(err);
        setStatus("unauthenticated");
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  if (status === "loading") {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (status !== "authenticated") {
    // Don’t render store content if unauthenticated/unauthorized
    return null;
  }

  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-70px)] bg-[#d9d9d9]">
        <div>
          <StoreSidebar />
        </div>
        <Routes>
          <Route path="/dashboard" element={<StoreDashboard />} />
          <Route path="/inventory" element={<StoreInventory />} />
          <Route path="/inventory/add-furniture" element={<AddFurniture />} />
          <Route
            path="/inventory/edit-furniture/:id"
            element={<EditFurniture />}
          />
          <Route path="/orders" element={<StoreOrdersPage />} />
          <Route path="/orders/add-order" element={<PlaceOrder />} />
          <Route path="/orders/edit-order" element={<EditOrder />} />
          <Route path="/showcase" element={<StoreShowCase />} />
          <Route path="/showcase/:id" element={<ProductOverview />} />
          <Route path="/messages" element={<StoreMessages />} />
          <Route path="/image-generator" element={<ImageGenerator />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export function StoreDashboard() {
  return (
    <div className="bg-gray-100 font-sans p-6 w-full h-full rounded-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Store Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-700">🛒 New Orders</h2>
          <p className="text-2xl text-blue-600 mt-2">4</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-700">
            📦 Orders in Progress
          </h2>
          <p className="text-2xl text-yellow-500 mt-2">5</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-700">
            ✅ Completed Orders
          </h2>
          <p className="text-2xl text-green-600 mt-2">12</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-700">
            🪑 Custom Requests
          </h2>
          <p className="text-2xl text-purple-600 mt-2">3</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Customer Orders
        </h2>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">#ORD-1054</td>
              <td className="py-2 px-4">Nimal Perera</td>
              <td className="py-2 px-4">Bookshelf</td>
              <td className="py-2 px-4 text-yellow-500 font-medium">
                In Progress
              </td>
              <td className="py-2 px-4">2025-06-17</td>
              <td className="py-2 px-4 text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                  View
                </button>
              </td>
            </tr>
            {/* More rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
