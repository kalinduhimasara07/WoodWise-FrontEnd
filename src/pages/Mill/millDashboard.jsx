import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

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
  }, [navigate]); 

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
      <div className="flex h-[calc(100vh-70px)] bg-gradient-to-r from-[#f5e9da] via-[#f7f3ee] to-[#e7d3bc] shadow h-[70px]">
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
  const [activeTab, setActiveTab] = useState("overview");
  const [timberData, setTimberData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch timber data
        const timberResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/timber`
        );
        const timberResult = await timberResponse.json();

        // Fetch orders data
        const orderResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/`
        );
        const orderResult = await orderResponse.json();

        if (timberResult.success) {
          setTimberData(timberResult.data);
        }

        if (orderResult.success) {
          setOrderData(orderResult.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Pending: "text-yellow-600 bg-yellow-100",
      "In Production": "text-blue-600 bg-blue-100",
      "Ready for Delivery": "text-green-600 bg-green-100",
      Completed: "text-gray-600 bg-gray-100",
      Cancelled: "text-red-600 bg-red-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  const getGradeColor = (grade) => {
    const colors = {
      Premium: "text-purple-600 bg-purple-100",
      Standard: "text-blue-600 bg-blue-100",
      Economy: "text-green-600 bg-green-100",
    };
    return colors[grade] || "text-gray-600 bg-gray-100";
  };

  const filteredTimber = timberData.filter((timber) => {
    const matchesSearch =
      timber.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timber.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || timber.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orderData.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalStock = timberData.reduce((sum, timber) => sum + timber.stock, 0);
  const lowStockItems = timberData.filter((timber) => timber.stock < 15).length;
  const pendingOrders = orderData.filter(
    (order) => order.status === "Pending"
  ).length;
  const inProductionOrders = orderData.filter(
    (order) => order.status === "In Production"
  ).length;

  if (loading) {
    return (
      <div className="w-full h-full bg-white rounded-4xl p-6 items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 rounded-4xl p-6 overflow-scroll">
      {/* Header & Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="bg-white rounded-2xl shadow-md flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-5">
            <div className="bg-gray-800 rounded-full p-2 shadow-lg">
              <Package className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 mb-1">
              Mill Dashboard
            </h1>
          </div>
          {/* Navigation Tabs */}
          <nav className="flex space-x-2 md:space-x-6 justify-center py-3 px-2">
            {["overview", "timber", "orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-2 px-5 rounded-xl font-semibold text-base capitalize transition-all duration-200
            ${
              activeTab === tab
                ? "bg-gray-800 text-white shadow"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }
          `}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full shadow"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-gray-800" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Total Timber Stock
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalStock}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Low Stock Items
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {lowStockItems}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Pending Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {pendingOrders}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      In Production
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {inProductionOrders}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Low Stock Alert
                </h3>
                <div className="space-y-3">
                  {timberData
                    .filter((timber) => timber.stock < 15)
                    .slice(0, 5)
                    .map((timber) => (
                      <div
                        key={timber._id}
                        className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {timber.category}
                          </p>
                          <p className="text-sm text-gray-500">
                            SKU: {timber.sku}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-500">
                            {timber.stock}
                          </p>
                          <p className="text-xs text-gray-400">units left</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Orders
                </h3>
                <div className="space-y-3">
                  {orderData.slice(0, 5).map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customerInfo.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timber Tab */}
        {activeTab === "timber" && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Timber Inventory
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search timber by category or SKU..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="Teak">Teak</option>
                    <option value="Oak">Oak</option>
                    <option value="Mahogany">Mahogany</option>
                    <option value="Bamboo">Bamboo</option>
                    <option value="Ash">Ash</option>
                    <option value="Rosewood">Rosewood</option>
                    <option value="Rubberwood">Rubberwood</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Timber Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTimber.map((timber) => (
                <div
                  key={timber._id}
                  className="bg-white p-6 rounded-xl shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {timber.category}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(
                        timber.grade
                      )}`}
                    >
                      {timber.grade}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-500">SKU: {timber.sku}</p>
                    <p className="text-sm text-gray-500">
                      Price: Rs. {timber.pricePerUnit.toLocaleString()}/unit
                    </p>
                    <p className="text-sm text-gray-500">
                      Dimensions: {timber.dimensions.length} ×{" "}
                      {timber.dimensions.width} × {timber.dimensions.height} cm
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Stock</p>
                      <p
                        className={`text-2xl font-bold ${
                          timber.stock < 15 ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {timber.stock}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{timber.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Orders
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search orders by order number or customer name..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Production">In Production</option>
                    <option value="Ready for Delivery">
                      Ready for Delivery
                    </option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order._id} className="bg-white p-6 rounded-xl shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Customer: {order.customerInfo.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      {order.isCustom && (
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-600 rounded-full">
                          Custom
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-semibold text-gray-800">
                        Rs. {order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Advance Paid</p>
                      <p className="font-semibold text-gray-800">
                        Rs. {order.advanceAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Balance</p>
                      <p className="font-semibold text-gray-800">
                        Rs.{" "}
                        {(
                          order.totalAmount - order.advanceAmount
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mill Worker</p>
                      <p className="font-semibold text-gray-800">
                        {order.millWorker}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Items:</p>
                  <div className="space-y-1">
                    {order.furnitureItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.sku} (Qty: {item.quantity})
                        </span>
                        <span>
                          Rs.{" "}
                          {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      {order.isPaymentCompleted ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-gray-500">
                        Payment{" "}
                        {order.isPaymentCompleted ? "Completed" : "Pending"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Created: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
