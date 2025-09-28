import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Filter,
  Calendar,
  User,
  Package,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  FileText,
  Users,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import Loading from "../../components/loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const StoreOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [updatingPayment, setUpdatingPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentToUpdate, setPaymentToUpdate] = useState(null);
  const navigate = useNavigate();

  const statusOptions = [
    "All",
    "Pending",
    "In Production",
    "Ready for Delivery",
    "Completed",
    "Cancelled",
  ];

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "In Production": "bg-blue-100 text-blue-800 border-blue-200",
    "Ready for Delivery": "bg-purple-100 text-purple-800 border-purple-200",
    Completed: "bg-green-100 text-green-800 border-green-200",
    Cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setOrders(result.data);
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

  // Update order status
  // order.orderNumber,order.customerInfo.contactNumber,order.customerInfo.email, order.customerInfo.name,order.totalAmount,order.advanceAmount, e.target.value
  const updateOrderStatus = async (
    orderNumber,
    contactNumber,
    email,
    name,
    totalAmount,
    advanceAmount,
    newStatus
  ) => {
    try {
      setUpdatingStatus(orderNumber);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderNumber: orderNumber,
            newStatus: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Update the local state with the updated order
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderNumber === orderNumber
              ? {
                  ...order,
                  status: newStatus,
                  updatedAt: result.data.updatedAt,
                }
              : order
          )
        );

        // Update selected order if it's currently open in modal
        if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
          setSelectedOrder({
            ...selectedOrder,
            status: newStatus,
            updatedAt: result.data.updatedAt,
          });
        }
        toast.success(
          `Order Status Change Successfully, And Email Send Successfully`,
          {
            style: {
              border: "1px solid #059669",
              padding: "16px",
              color: "#065f46",
              backgroundColor: "#ecfdf5",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
            iconTheme: {
              primary: "#059669",
              secondary: "#ecfdf5",
            },
            duration: 5000,
          }
        );
        // if(newStatus=="Completed"){
        //   const smsResponse = await axios.post(
        //   `${import.meta.env.VITE_BACKEND_URL}/api/orders/send-sms`,
        //   {
        //     toPhoneNumber: contactNumber,
        //     orderId: orderNumber,
        //     orderStatus: "Completed",
        //     customerName: name,
        //     totalAmount: totalAmount,
        //     advanceAmount: advanceAmount,
        //     balanceAmount: totalAmount - advanceAmount,
        //   }
        // );
        // console.log("SMS sent successfully:", smsResponse.data);
        // }
      } else {
        throw new Error(result.message || "Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      setError(err.message);
      // Optionally show an alert or toast notification
      alert(`Error updating order status: ${err.message}`);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Toggle payment completion status
  const togglePaymentComplete = async (orderNumber) => {
    try {
      setUpdatingPayment(orderNumber);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/payment-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderNumber: orderNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Update the local state with the updated order
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderNumber === orderNumber
              ? {
                  ...order,
                  isPaymentCompleted: result.data.isPaymentCompleted,
                  updatedAt: result.data.updatedAt,
                }
              : order
          )
        );

        // Update selected order if it's currently open in modal
        if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
          setSelectedOrder({
            ...selectedOrder,
            isPaymentCompleted: result.data.isPaymentCompleted,
            updatedAt: result.data.updatedAt,
          });
        }
      } else {
        throw new Error(result.message || "Failed to update payment status");
      }
    } catch (err) {
      console.error("Error updating payment status:", err);
      setError(err.message);
      alert(`Error updating payment status: ${err.message}`);
    } finally {
      setUpdatingPayment(null);
      setShowPaymentModal(false);
      setPaymentToUpdate(null);
    }
  };

  // Handle payment confirmation
  const handlePaymentConfirm = () => {
    if (paymentToUpdate) {
      togglePaymentComplete(paymentToUpdate.orderNumber);
    }
  };

  // Show payment confirmation modal
  const showPaymentConfirmation = (order) => {
    setPaymentToUpdate(order);
    setShowPaymentModal(true);
  };

  // Load orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.customerInfo.contactNumber.includes(searchTerm) ||
        (order.millWorker &&
          order.millWorker.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const pendingOrders = orders.filter(
      (order) => order.status === "Pending"
    ).length;
    const completedOrders = orders.filter(
      (order) => order.status === "Completed"
    ).length;
    const paidOrders = orders.filter(
      (order) => order.isPaymentCompleted
    ).length;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
      paidOrders,
    };
  }, [orders]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="bg-gray-50 w-full h-full rounded-3xl p-6 flex items-center justify-center">
        <div className="text-center">
          <Loading />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  const handleNewOrder = () => {
    navigate("/store/orders/add-order");
  };

  if (error) {
    return (
      <div className="bg-gray-50 w-full h-full rounded-3xl p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error loading orders</p>
            <p>{error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-gray-50 w-full h-full rounded-3xl p-6 overflow-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Furniture Orders
              </h1>
              <p className="text-gray-600">
                Manage and track all furniture orders
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingOrders}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completed Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completedOrders}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.paidOrders}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by order number, customer name, phone, or mill worker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleNewOrder}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              New Order
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                    Order Details
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                    Items
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                    Amount
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                    Payment
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                    Mill Worker
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                        <p className="text-xs text-gray-400">
                          by {order.orderedBy}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customerInfo.name}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {order.customerInfo.contactNumber}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {order.customerInfo.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.furnitureItems.length} item
                          {order.furnitureItems.length > 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.furnitureItems
                            .slice(0, 2)
                            .map((item) => item.sku)
                            .join(", ")}
                          {order.furnitureItems.length > 2 && "..."}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Advance: {formatCurrency(order.advanceAmount)}
                        </p>
                        <p className="text-xs text-gray-400">
                          Balance:{" "}
                          {formatCurrency(
                            order.totalAmount - order.advanceAmount
                          )}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.orderNumber,
                            order.customerInfo.contactNumber,
                            order.customerInfo.email,
                            order.customerInfo.name,
                            order.totalAmount,
                            order.advanceAmount,
                            e.target.value
                          )
                        }
                        disabled={updatingStatus === order.orderNumber}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          statusColors[order.status]
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          updatingStatus === order.orderNumber
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {statusOptions.slice(1).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      {updatingStatus === order.orderNumber && (
                        <div className="text-xs text-blue-600 mt-1">
                          Updating...
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start">
                        <button
                          onClick={() => showPaymentConfirmation(order)}
                          disabled={updatingPayment === order.orderNumber}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            order.isPaymentCompleted
                              ? "bg-green-100 text-green-800 border border-green-200 hover:bg-green-200"
                              : "bg-red-100 text-red-800 border border-red-200 hover:bg-red-200"
                          } ${
                            updatingPayment === order.orderNumber
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          {order.isPaymentCompleted ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {order.isPaymentCompleted ? "Paid" : "Pending"}
                        </button>
                        {updatingPayment === order.orderNumber && (
                          <div className="text-xs text-blue-600 mt-1">
                            Updating...
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.millWorker || "Not Assigned"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Updated: {formatDate(order.updatedAt)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openOrderModal(order)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/store/orders/edit-order`, {
                              state: { order },
                            })
                          }
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No orders found</p>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showPaymentModal && paymentToUpdate && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Update Payment Status
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              {paymentToUpdate.isPaymentCompleted
                ? "mark payment as pending"
                : "mark payment as completed"}{" "}
              for order "{paymentToUpdate.orderNumber}"?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentConfirm}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Details
                </h2>
                <button
                  onClick={closeModal}
                  className="text-4xl p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order Information
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Order Number:</span>{" "}
                      {selectedOrder.orderNumber}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          statusColors[selectedOrder.status]
                        }`}
                      >
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Payment Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                          selectedOrder.isPaymentCompleted
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        {selectedOrder.isPaymentCompleted ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {selectedOrder.isPaymentCompleted ? "Paid" : "Pending"}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Ordered By:</span>{" "}
                      {selectedOrder.orderedBy}
                    </p>
                    <p>
                      <span className="font-medium">Mill Worker:</span>{" "}
                      {selectedOrder.millWorker || "Not Assigned"}
                    </p>
                    <p>
                      <span className="font-medium">Created:</span>{" "}
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                    <p>
                      <span className="font-medium">Updated:</span>{" "}
                      {formatDate(selectedOrder.updatedAt)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {selectedOrder.customerInfo.name}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {selectedOrder.customerInfo.contactNumber}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {selectedOrder.customerInfo.email}
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                      {selectedOrder.customerInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Furniture Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Furniture Items
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                          SKU
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                          Quantity
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                          Unit Price
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                          Total
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.furnitureItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 font-medium">{item.sku}</td>
                          <td className="px-4 py-3">{item.quantity}</td>
                          <td className="px-4 py-3">
                            {formatCurrency(item.unitPrice)}
                          </td>
                          <td className="px-4 py-3 font-medium">
                            {formatCurrency(item.quantity * item.unitPrice)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Payment Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedOrder.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Advance Amount:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(selectedOrder.advanceAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-medium">Balance Amount:</span>
                    <span className="font-bold text-red-600">
                      {formatCurrency(
                        selectedOrder.totalAmount - selectedOrder.advanceAmount
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-medium">Payment Status:</span>
                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        selectedOrder.isPaymentCompleted
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {selectedOrder.isPaymentCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      {selectedOrder.isPaymentCompleted
                        ? "Fully Paid"
                        : "Payment Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Notes
                  </h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreOrdersPage;
