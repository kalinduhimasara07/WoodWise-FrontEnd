import React, { useState, useEffect } from "react";
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
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
} from "recharts";
import Loading from "../../components/loader";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");

  // Mock dashboard data
  useEffect(() => {
    setTimeout(() => {
      setDashboardData({
        overview: {
          totalRevenue: 125400,
          revenueChange: 12.5,
          totalOrders: 1847,
          ordersChange: 8.3,
          totalUsers: 2456,
          usersChange: 15.2,
          totalProducts: 342,
          productsChange: 4.1,
        },
        recentOrders: [
          {
            id: "ORD-001",
            customer: "John Smith",
            amount: 899.99,
            status: "completed",
            date: "2024-06-27",
          },
          {
            id: "ORD-002",
            customer: "Sarah Wilson",
            amount: 1299.99,
            status: "pending",
            date: "2024-06-27",
          },
          {
            id: "ORD-003",
            customer: "Mike Johnson",
            amount: 249.99,
            status: "processing",
            date: "2024-06-26",
          },
          {
            id: "ORD-004",
            customer: "Emma Davis",
            amount: 599.99,
            status: "completed",
            date: "2024-06-26",
          },
          {
            id: "ORD-005",
            customer: "Alex Brown",
            amount: 1899.99,
            status: "shipped",
            date: "2024-06-25",
          },
        ],
        topProducts: [
          {
            name: "Modern Oak Dining Table",
            sales: 45,
            revenue: 40455,
            category: "Dining Room",
          },
          {
            name: "Luxury Teak Bedroom Set",
            sales: 23,
            revenue: 29899,
            category: "Bedroom",
          },
          {
            name: "Ergonomic Office Chair",
            sales: 67,
            revenue: 20099,
            category: "Office",
          },
          {
            name: "Bamboo Coffee Table",
            sales: 89,
            revenue: 17799,
            category: "Living Room",
          },
        ],
        salesData: [
          { date: "Jun 21", revenue: 12400, orders: 45 },
          { date: "Jun 22", revenue: 15600, orders: 52 },
          { date: "Jun 23", revenue: 18200, orders: 61 },
          { date: "Jun 24", revenue: 16800, orders: 58 },
          { date: "Jun 25", revenue: 21400, orders: 72 },
          { date: "Jun 26", revenue: 19600, orders: 65 },
          { date: "Jun 27", revenue: 23800, orders: 78 },
        ],
        categoryData: [
          { name: "Living Room", value: 35, color: "#3B82F6" },
          { name: "Bedroom", value: 25, color: "#8B5CF6" },
          { name: "Dining Room", value: 20, color: "#10B981" },
          { name: "Office", value: 15, color: "#F59E0B" },
          { name: "Others", value: 5, color: "#EF4444" },
        ],
        userActivity: [
          { time: "00:00", active: 12 },
          { time: "04:00", active: 8 },
          { time: "08:00", active: 45 },
          { time: "12:00", active: 89 },
          { time: "16:00", active: 124 },
          { time: "20:00", active: 76 },
          { time: "23:59", active: 34 },
        ],
        alerts: [
          {
            type: "warning",
            message: "5 products are running low on stock",
            icon: AlertTriangle,
          },
          {
            type: "info",
            message: "12 new orders placed today",
            icon: Users,
          },
          {
            type: "success",
            message: "Monthly sales target achieved",
            icon: Target,
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
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
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Alert Bar */}
      <div className="mb-6 space-y-2">
        {dashboardData.alerts.map((alert, index) => {
          const IconComponent = alert.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                alert.type === "warning"
                  ? "bg-yellow-50 border border-yellow-200"
                  : alert.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <IconComponent
                className={`h-5 w-5 ${
                  alert.type === "warning"
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
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              +{dashboardData.overview.revenueChange}%
            </span>
            <span className="text-gray-600 ml-1">from last period</span>
          </div>
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
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              +{dashboardData.overview.ordersChange}%
            </span>
            <span className="text-gray-600 ml-1">from last period</span>
          </div>
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
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              +{dashboardData.overview.usersChange}%
            </span>
            <span className="text-gray-600 ml-1">from last period</span>
          </div>
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
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              +{dashboardData.overview.productsChange}%
            </span>
            <span className="text-gray-600 ml-1">from last period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
        </div>
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
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
      </div>
    </div>
  );
}
