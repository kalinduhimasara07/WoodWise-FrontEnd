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
import { Package, Truck, AlertTriangle, TrendingUp, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';

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








export function MillDashboard(){
  const [activeTab, setActiveTab] = useState('overview');
  const [timberData, setTimberData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch timber data
        const timberResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/timber`);
        const timberResult = await timberResponse.json();
        
        // Fetch orders data
        const orderResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`);
        const orderResult = await orderResponse.json();

        if (timberResult.success) {
          setTimberData(timberResult.data);
        }
        
        if (orderResult.success) {
          setOrderData(orderResult.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'text-yellow-600 bg-yellow-100',
      'In Production': 'text-blue-600 bg-blue-100',
      'Ready for Delivery': 'text-green-600 bg-green-100',
      'Completed': 'text-gray-600 bg-gray-100',
      'Cancelled': 'text-red-600 bg-red-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const getGradeColor = (grade) => {
    const colors = {
      'Premium': 'text-purple-600 bg-purple-100',
      'Standard': 'text-blue-600 bg-blue-100',
      'Economy': 'text-green-600 bg-green-100'
    };
    return colors[grade] || 'text-gray-600 bg-gray-100';
  };

  const filteredTimber = timberData.filter(timber => {
    const matchesSearch = timber.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          timber.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || timber.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orderData.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalStock = timberData.reduce((sum, timber) => sum + timber.stock, 0);
  const lowStockItems = timberData.filter(timber => timber.stock < 15).length;
  const pendingOrders = orderData.filter(order => order.status === 'Pending').length;
  const inProductionOrders = orderData.filter(order => order.status === 'In Production').length;

  if (loading) {
    return (
      <div className="w-full h-full bg-white rounded-4xl p-6 items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-4xl p-6 overflow-scroll">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Mill Dashboard</h1>
            </div>
            
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'timber', 'orders'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Timber Stock</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                    <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In Production</p>
                    <p className="text-2xl font-bold text-gray-900">{inProductionOrders}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
                <div className="space-y-3">
                  {timberData
                    .filter(timber => timber.stock < 15)
                    .slice(0, 5)
                    .map(timber => (
                      <div key={timber._id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{timber.category}</p>
                          <p className="text-sm text-gray-600">SKU: {timber.sku}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-600">{timber.stock}</p>
                          <p className="text-xs text-gray-500">units left</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {orderData.slice(0, 5).map(order => (
                    <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{order.orderNumber}</p>
                        <p className="text-sm text-gray-600">{order.customerInfo.name}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
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
        {activeTab === 'timber' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search timber by category or SKU..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              {filteredTimber.map(timber => (
                <div key={timber._id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{timber.category}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(timber.grade)}`}>
                      {timber.grade}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">SKU: {timber.sku}</p>
                    <p className="text-sm text-gray-600">Price: Rs. {timber.pricePerUnit.toLocaleString()}/unit</p>
                    <p className="text-sm text-gray-600">
                      Dimensions: {timber.dimensions.length} × {timber.dimensions.width} × {timber.dimensions.height} cm
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Stock</p>
                      <p className={`text-2xl font-bold ${timber.stock < 15 ? 'text-red-600' : 'text-green-600'}`}>
                        {timber.stock}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{timber.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search orders by order number or customer name..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Production">In Production</option>
                    <option value="Ready for Delivery">Ready for Delivery</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">Customer: {order.customerInfo.name}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
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
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-semibold text-gray-900">Rs. {order.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Advance Paid</p>
                      <p className="font-semibold text-gray-900">Rs. {order.advanceAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Balance</p>
                      <p className="font-semibold text-gray-900">Rs. {(order.totalAmount - order.advanceAmount).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Mill Worker</p>
                      <p className="font-semibold text-gray-900">{order.millWorker}</p>
                    </div>
                  </div>
                  
                  {/* {order.customImage && (
                    <div className="mb-3">
                      <img
                        src={order.customImage}
                        alt="Custom design"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                  )} */}
                  <p className="text-sm text-gray-600 mb-2">Items:</p>
                  <div className="space-y-1">
                    {order.furnitureItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.sku} (Qty: {item.quantity})</span>
                        <span>Rs. {(item.unitPrice * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* THIS IS WHERE THE EXTRA DIV WAS REMOVED */}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      {order.isPaymentCompleted ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      )}
                      <span className="text-sm text-gray-600">
                        Payment {order.isPaymentCompleted ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
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