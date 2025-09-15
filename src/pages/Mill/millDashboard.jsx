import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Mill/header";
import Sidebar from "../../components/Mill/millSlideBar";
import MillInventory from "./millInventory";
import MillOrderPage from "./millOrderPage";
import MillSuppliers from "./millSupliers";
import MillMessages from "./millMessages";
import AddTimber from "./addTimber";
import EditTimber from "./editTimber";
import NotFoundPage from "../../components/notFoundPage";
import toast from "react-hot-toast";
import Loading from "../../components/loader";
import AddSupplier from "./addsupplier";

export default function MillHomePage() {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

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

        if (res.data.role !== "millworker" && res.data.role !== "admin") {
          setStatus("unauthorized");
          toast.error("You are not authorized to access this page");
          navigate("/login", { replace: true });
        } else {
          setStatus("authenticated");
        }
      } catch (err) {
        console.log(err);
        setStatus("unauthenticated");
        toast.error("You are not authenticated, please login");
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]); // ✅ no [status] loop

  // While checking, show loader
  if (status === "loading") {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Prevent rendering when unauthorized/unauthenticated
  if (status !== "authenticated") {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-70px)] bg-[#d9d9d9]">
        <div>
          <Sidebar />
        </div>
        <Routes>
          <Route path="/dashboard" element={<MillDashboard />} />
          <Route path="/inventory/add-timber" element={<AddTimber />} />
          <Route path="/inventory/edit-timber/:id" element={<EditTimber />} />
          <Route path="/inventory" element={<MillInventory />} />
          <Route path="/orders" element={<MillOrderPage />} />
          <Route path="/suppliers" element={<MillSuppliers />} />
          <Route path="/suppliers/add-supplier" element={<AddSupplier />} />
          <Route path="/messages" element={<MillMessages />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export function MillDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [timberData, setTimberData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setOrders(result.data);
          console.log("Orders fetched:", result.data);
        } else {
          throw new Error(result.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchTimberData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/timber`);
        const result = await response.json();
        if (result.success) {
          // Sort data in ascending order by category
          const sortedData = result.data.sort((a, b) => {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
            return 0;
          });
          setTimberData(sortedData);
        } else {
          console.error("Error fetching timber data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching timber data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimberData();
  }, []);

  console.log("Orders data:", orders);
  console.log("Timber data:", timberData);

  const inProductionCount = orders.filter(order => order.status === "In Production").length;
  const completedCount = orders.filter(order => order.status === "Completed").length;
  const readyCount = orders.filter(order => order.status === "Ready for Delivery").length;

  return (
    
    <div className="w-full h-full bg-white rounded-4xl p-6">

  {/* === TOP METRIC CARDS === */}
  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
    {/* Orders In Production */}
    <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col justify-between">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        🧱 Orders In Production
      </h2>
      <p className="text-3xl text-blue-600 mt-3">{inProductionCount}</p>
    </div>

    {/* Completed Orders */}
    <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col justify-between">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        ✅ Completed Orders
      </h2>
      <p className="text-3xl text-green-600 mt-3">{completedCount}</p>
    </div>

    {/* Timber Volume */}
    <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        🪵 Timber Volume Available
      </h2>
      <div className="text-sm text-gray-700 mt-3 max-h-40 overflow-y-auto">
        {timberData.length === 0 ? (
          <span>No timber data available</span>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="pb-1">Category</th>
                <th className="pb-1">Stock</th>
                <th className="pb-1">Dimensions</th>
              </tr>
            </thead>
            <tbody>
              {timberData.map((timber) => (
                <tr key={timber._id || timber.category} className="odd:bg-gray-50">
                  <td className="pr-3">{timber.category}</td>
                  <td className="pr-3">{timber.stock || 0}</td>
                  <td className="text-gray-500 text-xs">
                    {timber.dimensions
                      ? `H:${timber.dimensions.height}, L:${timber.dimensions.length}, W:${timber.dimensions.width}`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>

    {/* Low Stock Alerts */}
    <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col justify-between">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        🚨 Low Stock Alerts
      </h2>
      <div className="mt-3 space-y-1 text-sm">
        {timberData.filter(t => (t.stock || 0) < 50).length > 0 ? (
          timberData
            .filter(t => (t.stock || 0) < 50)
            .map(t => (
              <div key={t._id || t.category} className="text-red-600">
                {t.category} below 50!
              </div>
            ))
        ) : (
          <span className="text-gray-500">No low stock alerts</span>
        )}
      </div>
    </div>

    {/* Ready for Delivery */}
    <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col justify-between">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        📦 Ready for Delivery
      </h2>
      <p className="text-3xl text-yellow-600 mt-3">{readyCount}</p>
    </div>
  </section>

  {/* === ONGOING PRODUCTION ORDERS === */}
  <section>
    <h2 className="text-2xl font-semibold mb-4">Ongoing Production Orders</h2>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-6 text-left">Order ID</th>
            <th className="py-2 px-6 text-left">Item</th>
            <th className="py-2 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.filter(order => order.status === "In Production").map(order => (
            <tr key={order._id} className="border-b odd:bg-gray-50">
              <td className="py-2 px-6">{order.orderNumber}</td>
              <td className="py-2 px-6">
                {Array.isArray(order.furnitureItems) && order.furnitureItems.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-1">
                    {order.furnitureItems.map((item, idx) => (
                      <li key={idx}>
                        {item.sku || "Unnamed"} {item.quantity ? `x${item.quantity}` : ""}
                      </li>
                    ))}
                  </ul>
                ) : (
                  order.itemName || "-"
                )}
              </td>
              <td className="py-2 px-6 text-blue-600">{order.status}</td>
            </tr>
          ))}
          {orders.filter(order => order.status === "In Production").length === 0 && (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500">
                No orders in production
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
</div>

  );
}
