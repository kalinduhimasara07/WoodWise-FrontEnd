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
  Phone,
  Mail,
  MapPin,
  FileText,
  Users,
  Info,
  Ruler,
  Palette,
  Tag,
} from "lucide-react";
import Loading from "../../components/loader";
import { useNavigate } from "react-router-dom";

const MillOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [furnitureDetails, setFurnitureDetails] = useState({});
  const [loadingFurniture, setLoadingFurniture] = useState({});
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

  // Fetch furniture details by SKU
  const fetchFurnitureDetails = async (sku) => {
    console.log("Fetching furniture details for SKU:", sku);
    if (furnitureDetails[sku] || loadingFurniture[sku]) {
      return;
    }

    try {
      setLoadingFurniture((prev) => ({ ...prev, [sku]: true }));

      // The API endpoint uses the SKU as the identifier
      const response = await fetch(
        `http://localhost:5000/api/furniture/${sku}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setFurnitureDetails((prev) => ({
          ...prev,
          [sku]: result.data,
        }));
      } else {
        throw new Error(result.message || "Failed to fetch furniture details");
      }
    } catch (err) {
      console.error("Error fetching furniture details:", err);
      setFurnitureDetails((prev) => ({
        ...prev,
        [sku]: null,
      }));
    } finally {
      setLoadingFurniture((prev) => ({ ...prev, [sku]: false }));
    }
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/orders/");

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
  const updateOrderStatus = async (orderNumber, newStatus) => {
    try {
      setUpdatingStatus(orderNumber);

      const response = await fetch("http://localhost:5000/api/orders/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNumber: orderNumber,
          newStatus: newStatus,
        }),
      });

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
      } else {
        throw new Error(result.message || "Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      setError(err.message);
      alert(`Error updating order status: ${err.message}`);
    } finally {
      setUpdatingStatus(null);
    }
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
    const pendingOrders = orders.filter(
      (order) => order.status === "Pending"
    ).length;
    const inProductionOrders = orders.filter(
      (order) => order.status === "In Production"
    ).length;
    const completedOrders = orders.filter(
      (order) => order.status === "Completed"
    ).length;
    const totalItems = orders.reduce(
      (sum, order) => sum + order.furnitureItems.length,
      0
    );

    return {
      totalOrders,
      pendingOrders,
      inProductionOrders,
      completedOrders,
      totalItems,
    };
  }, [orders]);

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

    // Fetch furniture details for all items in the order using the SKU
    order.furnitureItems.forEach((item) => {
      if (item.sku) {
        fetchFurnitureDetails(item.sku);
      }
    });
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
    <div className="bg-gray-50 w-full h-full rounded-3xl p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mill Orders
              </h1>
              <p className="text-gray-600">
                Manage and track furniture production orders
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
                  In Production
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.inProductionOrders}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
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
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalItems}
                </p>
              </div>
              <Tag className="h-8 w-8 text-purple-600" />
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
                    Status
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
                        <p className="text-xs text-gray-400">
                          Total Qty:{" "}
                          {order.furnitureItems.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.orderNumber, e.target.value)
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
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
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

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Details - {selectedOrder.orderNumber}
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

              {/* Furniture Items with Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Furniture Items & Details
                </h3>
                <div className="space-y-4">
                  {selectedOrder.furnitureItems.map((item, index) => {
                    const furniture = furnitureDetails[item.sku];
                    const isLoading = loadingFurniture[item.sku];

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              Order Item
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="font-medium">SKU:</span>{" "}
                                {item.sku}
                              </p>
                              <p>
                                <span className="font-medium">Quantity:</span>{" "}
                                {item.quantity}
                              </p>
                              {item.note && (
                                <p>
                                  <span className="font-medium">Note:</span>{" "}
                                  {item.note}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              Furniture Details
                            </h4>
                            {isLoading ? (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                Loading details...
                              </div>
                            ) : furniture ? (
                              <div className="space-y-1 text-sm">
                                <div className="w-40 h-40 mb-2 object-cover rounded-lg overflow-hidden">
                                  <img src={furniture.images[0].url} alt={furniture.name} />
                                </div>
                                <p className="flex items-center gap-2">
                                  <Tag className="h-3 w-3 text-gray-400" />
                                  <span className="font-medium">
                                    Name:
                                  </span>{" "}
                                  {furniture.name}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Package className="h-3 w-3 text-gray-400" />
                                  <span className="font-medium">
                                    Category:
                                  </span>{" "}
                                  {furniture.category}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Palette className="h-3 w-3 text-gray-400" />
                                  <span className="font-medium">
                                    Material:
                                  </span>{" "}
                                  {furniture.woodType || "Not specified"}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Ruler className="h-3 w-3 text-gray-400" />
                                  <span className="font-medium">
                                    Dimensions:
                                  </span>{" "}
                                  {furniture.dimensions
                                    ? `${furniture.dimensions.length} x ${furniture.dimensions.width} x ${furniture.dimensions.height}`
                                    : "Not specified"}
                                </p>
                                {furniture.description && (
                                  <p className="flex items-start gap-2">
                                    <Info className="h-3 w-3 text-gray-400 mt-1" />
                                    <span className="font-medium">
                                      Description:
                                    </span>{" "}
                                    {furniture.description}
                                  </p>
                                )}
                                {furniture.specifications && (
                                  <p className="flex items-start gap-2">
                                    <FileText className="h-3 w-3 text-gray-400 mt-1" />
                                    <span className="font-medium">
                                      Specifications:
                                    </span>{" "}
                                    {furniture.specifications}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-red-500">
                                Failed to load furniture details
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Order Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedOrder.furnitureItems.length}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Quantity</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedOrder.furnitureItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Status</p>
                    <p
                      className={`text-lg font-bold px-3 py-1 rounded-full ${
                        statusColors[selectedOrder.status]
                      }`}
                    >
                      {selectedOrder.status}
                    </p>
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

export default MillOrderPage;
