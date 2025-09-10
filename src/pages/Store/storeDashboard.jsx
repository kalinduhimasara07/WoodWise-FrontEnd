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

// export function StoreDashboard() {
//   return (
//     <div className="bg-gray-100 font-sans p-6 w-full h-full rounded-4xl">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Store Dashboard</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white shadow-md rounded-lg p-5">
//           <h2 className="text-xl font-semibold text-gray-700">🛒 New Orders</h2>
//           <p className="text-2xl text-blue-600 mt-2">4</p>
//         </div>
//         <div className="bg-white shadow-md rounded-lg p-5">
//           <h2 className="text-xl font-semibold text-gray-700">
//             📦 Orders in Progress
//           </h2>
//           <p className="text-2xl text-yellow-500 mt-2">5</p>
//         </div>
//         <div className="bg-white shadow-md rounded-lg p-5">
//           <h2 className="text-xl font-semibold text-gray-700">
//             ✅ Completed Orders
//           </h2>
//           <p className="text-2xl text-green-600 mt-2">12</p>
//         </div>
//         <div className="bg-white shadow-md rounded-lg p-5">
//           <h2 className="text-xl font-semibold text-gray-700">
//             🪑 Custom Requests
//           </h2>
//           <p className="text-2xl text-purple-600 mt-2">3</p>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Recent Customer Orders
//         </h2>
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="py-2 px-4 text-left">Order ID</th>
//               <th className="py-2 px-4 text-left">Customer</th>
//               <th className="py-2 px-4 text-left">Product</th>
//               <th className="py-2 px-4 text-left">Status</th>
//               <th className="py-2 px-4 text-left">Date</th>
//               <th className="py-2 px-4 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b hover:bg-gray-50">
//               <td className="py-2 px-4">#ORD-1054</td>
//               <td className="py-2 px-4">Nimal Perera</td>
//               <td className="py-2 px-4">Bookshelf</td>
//               <td className="py-2 px-4 text-yellow-500 font-medium">
//                 In Progress
//               </td>
//               <td className="py-2 px-4">2025-06-17</td>
//               <td className="py-2 px-4 text-center">
//                 <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
//                   View
//                 </button>
//               </td>
//             </tr>
//             {/* More rows as needed */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  AlertCircle,
  DollarSign,
  CheckCircle,
  Clock,
  Truck
} from 'lucide-react';

const StoreDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // State for holding data fetched from the API
  const [furniture, setFurniture] = useState([]);
  const [orders, setOrders] = useState([]);

  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Base URL for your backend API from environment variables
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Effect to fetch furniture data based on search and filter criteria
  useEffect(() => {
    const fetchFurniture = async () => {
      // Set loading to true when fetching starts, especially for the inventory tab
      if (activeTab === 'inventory') {
          setLoading(true);
      }
      try {
        // Construct query parameters based on state
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (filterCategory && filterCategory !== 'all') {
          params.append('category', filterCategory);
        }
        // You can add pagination params here if needed, e.g., params.append('page', '1');

        const response = await fetch(`${API_BASE_URL}/api/furniture?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFurniture(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce the API call to prevent requests on every keystroke
    const debounceTimer = setTimeout(() => {
        fetchFurniture();
    }, 300);

    return () => clearTimeout(debounceTimer); // Cleanup timer on unmount or re-render
  }, [searchTerm, filterCategory, API_BASE_URL]); // Re-fetch when search, filter, or base URL changes

  // Effect to fetch all orders once when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/orders/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setOrders(data.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchOrders();
  }, [API_BASE_URL]); // Dependency array ensures this runs only once


  // Calculate dashboard metrics from the fetched data
  const totalProducts = furniture.length;
  const totalOrders = orders.length;
  const lowStockItems = furniture.filter(item => item.stock <= 5).length;
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

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

  const categories = ['Living Room', 'Bedroom', 'Dining Room', 'Office', 'Kitchen', 'Bathroom', 'Outdoor'];

  // Display a global error message if fetching fails
  if (error) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800">Failed to load data</h2>
                <p className="text-gray-600 mt-2">{error}</p>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-gray-100 font-sans p-6 w-full h-full rounded-4xl overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Store Dashboard</h1>
            </div>
            {/* <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div> */}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Cards are the same, they now use dynamic data */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <ShoppingCart className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Low Stock</p>
                      <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-indigo-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                        <tr><td colSpan="5" className="text-center py-4">Loading orders...</td></tr>
                    ) : (
                        orders.slice(0, 5).map(order => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerInfo.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.totalAmount.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wood Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                        <tr><td colSpan="7" className="text-center py-4">Loading inventory...</td></tr>
                    ) : (
                        furniture.map(item => (
                            <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                    ${item.salePrice || item.price}
                                    {item.salePrice && (
                                        <span className="text-xs text-gray-500 line-through ml-2">${item.price}</span>
                                    )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`text-sm ${item.stock <= 5 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                                    {item.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.woodType}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                    {item.inStock ? (
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                    ) : (
                                        <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                                    )}
                                    <span className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                    {item.featured && (
                                        <span className="ml-2 inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                        Featured
                                        </span>
                                    )}
                                    </div>
                                </td>
                                
                            </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">All Orders</h3>
                
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mill Worker</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                        <tr><td colSpan="7" className="text-center py-4">Loading orders...</td></tr>
                    ) : (
                        orders.map(order => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                    <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                                    <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                    <div className="text-sm font-medium text-gray-900">{order.customerInfo.name}</div>
                                    <div className="text-sm text-gray-500">{order.customerInfo.contactNumber}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.furnitureItems.length} item(s)
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                    <div className="text-sm font-medium text-gray-900">${order.totalAmount}</div>
                                    <div className="text-sm text-gray-500">
                                        Advance: ${order.advanceAmount}
                                        <span className={`ml-2 ${order.isPaymentCompleted ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {order.isPaymentCompleted ? '(Paid)' : '(Pending)'}
                                        </span>
                                    </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.millWorker}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                    <button className="text-indigo-600 hover:text-indigo-900"><Eye className="h-4 w-4" /></button>
                                    <button className="text-gray-600 hover:text-gray-900"><Edit className="h-4 w-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Analytics Tab (content remains the same, but uses fetched data) */}
        {activeTab === 'analytics' && (
             <div className="space-y-6">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Category Distribution */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Products by Category</h3>
                        <div className="space-y-4">
                            {categories.map(category => {
                                const count = furniture.filter(item => item.category === category).length;
                                const percentage = totalProducts > 0 ? (count / totalProducts) * 100 : 0;
                                return (
                                <div key={category}>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">{category}</span>
                                        <span className="text-gray-900">{count} items</span>
                                    </div>
                                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Status Distribution */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Orders by Status</h3>
                        <div className="space-y-4">
                            {['Pending', 'In Production', 'Ready for Delivery', 'Completed', 'Cancelled'].map(status => {
                                const count = orders.filter(order => order.status === status).length;
                                const percentage = totalOrders > 0 ? (count / totalOrders) * 100 : 0;
                                return (
                                <div key={status}>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">{status}</span>
                                        <span className="text-gray-900">{count} orders</span>
                                    </div>
                                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                            Low Stock Alert
                        </h3>
                    </div>
                    <div className="p-6">
                        {lowStockItems > 0 ? (
                            <div className="space-y-4">
                                {furniture.filter(item => item.stock <= 5).map(item => (
                                    <div key={item._id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-red-600">{item.stock} left</p>
                                            <p className="text-xs text-gray-500">{item.category}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">All products are well stocked!</p>
                        )}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
