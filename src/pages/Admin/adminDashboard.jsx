import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  ShoppingCart,
  Star,
  AlertTriangle,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Award,
  Target,
} from "lucide-react";
import Loading from "../../components/loader";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Replace with your actual API endpoint
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
        console.log("Users fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/furniture`);

        if (response.data.success) {
          setFurniture(response.data.data);
          console.log("Furniture fetched:", response.data.data);
        } else {
          setError("Failed to fetch furniture data");
        }
      } catch (error) {
        console.error("Error fetching furniture:", error);
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchFurniture();
  }, []);

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
    if (!users || !furniture || !orders) return;

    // Compute metrics
    const totalUsers = users.length;
    const totalProducts = furniture.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const dashboard = {
      overview: {
        totalRevenue,
        revenueChange: 0, // compute change if you have historical data
        totalOrders,
        ordersChange: 0,
        totalUsers,
        usersChange: 0,
        totalProducts,
        productsChange: 0,
      },
      // Use the most recent 5 orders
      recentOrders: orders
        .slice(0,5)
        .map(o => ({
          id: o.orderNumber,
          customer: o.customerInfo.name, // adapt to your API field
          amount: o.totalAmount,
          status: o.status,
          date: o.updatedAt,
        })),
      // Top products by sales (using furniture id and related orders)
      topProducts: furniture
        .map(f => {
          // Count how many orders include this furniture item's ID
          const salesCount = orders.reduce((count, order) => {
            if (order.furnitureItems && Array.isArray(order.furnitureItems)) {
              return count + order.furnitureItems.filter(item => item.sku === f.sku).length;
            }
            return count;
          }, 0);
          return {
            name: f.name,
            sales: salesCount,
            revenue: f.salePrice || 0,
            category: f.category,
          };
        })
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 4),
      // You can fill in salesData, categoryData, userActivity, alerts if your API supplies it
      salesData: [], // or transform from your orders
      categoryData: [], // or derive from furniture categories
      userActivity: [], // optional
      alerts: [],
    };

    setDashboardData(dashboard);
    setLoading(false);
  }, [users, furniture, orders]);


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Production":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Ready for Delivery":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-white rounded-4xl p-6">
        <Loading />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="w-full h-screen bg-white rounded-3xl p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full  rounded-4xl  bg-gray-50  p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
      </div>

      {/* Alert Bar */}
      <div className="mb-6 space-y-2">
        {dashboardData.alerts.map((alert, index) => {
          const IconComponent = alert.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg ${alert.type === "warning"
                ? "bg-yellow-50 border border-yellow-200"
                : alert.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-blue-50 border border-blue-200"
                }`}
            >
              <IconComponent
                className={`h-5 w-5 ${alert.type === "warning"
                  ? "text-yellow-600"
                  : alert.type === "success"
                    ? "text-green-600"
                    : "text-blue-600"
                  }`}
              />
              <span className="text-sm font-medium text-gray-800">
                {alert.message}
              </span>
            </div>
          );
        })}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(dashboardData.overview.totalRevenue)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          {/* <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              +{dashboardData.overview.revenueChange}%
            </span>
            <span className="text-gray-600 ml-1">from last period</span>
          </div> */}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {dashboardData.overview.totalOrders.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          {/* <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              +{dashboardData.overview.ordersChange}%
            </span>
            <span className="text-gray-600 ml-1">from last period</span>
          </div> */}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {dashboardData.overview.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          {/* <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              +{dashboardData.overview.usersChange}%
            </span>
            <span className="text-gray-600 ml-1">from last period</span>
          </div> */}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Products
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {dashboardData.overview.totalProducts}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          {/* <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              +{dashboardData.overview.productsChange}%
            </span>
            <span className="text-gray-600 ml-1">from last period</span>
          </div> */}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Trend */}
        {/* <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dashboardData.salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [formatCurrency(value), "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div> */}

        {/* Category Distribution */}
        {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Sales by Category
            </h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={dashboardData.categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {dashboardData.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {dashboardData.categoryData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Orders
            </h3>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dashboardData.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {order.customer}
                    </td>
                    <td className="py-3 text-sm font-medium text-gray-900">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Products
            </h3>
            <Star className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {dashboardData.topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">
                    {formatCurrency(product.revenue)}
                  </p>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity Chart */}
      {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            User Activity (24h)
          </h3>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dashboardData.userActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => [`${value} users`, "Active Users"]}
            />
            <Bar dataKey="active" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}
