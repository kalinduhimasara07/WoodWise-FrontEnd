import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  Eye,
  Plus,
  Search,
  Filter,
  Package,
  AlertTriangle,
  X,
  Tag,
  Star,
  Image,
} from "lucide-react";
import axios from "axios";
import Loading from "../../components/loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function StoreInventory() {
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [furnitureToDelete, setFurnitureToDelete] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log("Navigate to:", path);
    navigate(path);
  };

  // Fetch furniture data from backend
  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/furniture`);

        if (response.data.success) {
          setFurniture(response.data.data);
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

  const categories = [
    "Living Room",
    "Bedroom",
    "Dining Room",
    "Office",
    "Kitchen",
    "Bathroom",
    "Outdoor",
  ];

  // Filter furniture based on search and category
  const filteredFurniture = furniture.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.brand &&
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteClick = (item) => {
    setFurnitureToDelete(item);
    setShowDeleteModal(true);
  };

  const handleViewClick = (item) => {
    setSelectedFurniture(item);
    setShowViewModal(true);
  };

  const handleEditClick = (item) => {
    navigate(`/store/inventory/edit-furniture/${item.sku}`, {
      state: { furniture: item },
    });
  };

  const handleDeleteConfirm = async () => {
    if (furnitureToDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/furniture/${furnitureToDelete._id}`
        );
        toast.success(`Furniture deleted successfully`, {
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
        });
        setFurniture(
          furniture.filter((item) => item._id !== furnitureToDelete._id)
        );
        setShowDeleteModal(false);
        setFurnitureToDelete(null);
      } catch (error) {
        console.error("Error deleting furniture:", error);
        // You might want to show an error message to the user here
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-white rounded-4xl p-6">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-white rounded-3xl p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Furniture Inventory
          </h1>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-colors shadow-lg hover:shadow-xl"
          onClick={() => handleNavigation("/store/inventory/add-furniture")}
        >
          <Plus className="h-5 w-5" />
          Add Furniture
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="text-blue-800 text-sm font-medium">Total Items</div>
          <div className="text-2xl font-bold text-blue-900">
            {furniture.length}
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="text-green-800 text-sm font-medium">In Stock</div>
          <div className="text-2xl font-bold text-green-900">
            {furniture.filter((item) => item.inStock).length}
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="text-purple-800 text-sm font-medium">Featured</div>
          <div className="text-2xl font-bold text-purple-900">
            {furniture.filter((item) => item.featured).length}
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="text-orange-800 text-sm font-medium">On Sale</div>
          <div className="text-2xl font-bold text-orange-900">
            {furniture.filter((item) => item.salePrice).length}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search furniture by name, brand, or SKU..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-48"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Furniture Table */}
      <div className="flex-1 overflow-hidden bg-gray-50 rounded-xl border border-gray-200">
        <div className="overflow-y-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Product
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Category
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Price
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Stock
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFurniture.length > 0 ? (
                filteredFurniture.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-white transition-colors border-b border-gray-200 last:border-b-0 cursor-pointer"
                    onClick={() => handleViewClick(item)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={item.images[0].url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            SKU: {item.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-900">{item.category}</div>
                      {item.subcategory && (
                        <div className="text-sm text-gray-500">
                          {item.subcategory}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        {item.salePrice ? (
                          <>
                            <span className="text-green-600 font-medium">
                              {formatPrice(item.salePrice)}
                            </span>
                            <span className="text-gray-400 line-through text-sm">
                              {formatPrice(item.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-900 font-medium">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-900">{item.stock}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.stock > 5
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                        {item.featured && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleViewClick(item)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-lg transition-colors cursor-pointer"
                          title="Edit furniture"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
                          title="Delete furniture"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <div className="text-lg font-medium">
                      No furniture found
                    </div>
                    <div className="text-sm">
                      Try adjusting your search or filters
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedFurniture && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                Furniture Details
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Images */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Images</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedFurniture.images &&
                    selectedFurniture.images.length > 0 ? (
                      selectedFurniture.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                        >
                          <img
                            src={image.url}
                            alt={`${selectedFurniture.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      {selectedFurniture.name}
                    </h4>
                    <p className="text-gray-600">
                      {selectedFurniture.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Category
                      </label>
                      <div className="text-gray-900">
                        {selectedFurniture.category}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Subcategory
                      </label>
                      <div className="text-gray-900">
                        {selectedFurniture.subcategory || "N/A"}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Wood Type
                      </label>
                      <div className="text-gray-900">
                        {selectedFurniture.woodType}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Brand
                      </label>
                      <div className="text-gray-900">
                        {selectedFurniture.brand || "N/A"}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Color
                      </label>
                      <div className="text-gray-900">
                        {selectedFurniture.color}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        SKU
                      </label>
                      <div className="text-gray-900">
                        {selectedFurniture.sku}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Price
                      </label>
                      <div className="text-gray-900 font-semibold">
                        {formatPrice(selectedFurniture.price)}
                      </div>
                    </div>
                    {selectedFurniture.salePrice && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Sale Price
                        </label>
                        <div className="text-green-600 font-semibold">
                          {formatPrice(selectedFurniture.salePrice)}
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Stock
                      </label>
                      <div className="text-gray-900">
                        {selectedFurniture.stock}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Weight
                      </label>
                      <div className="text-gray-900">
                        {selectedFurniture.weight} kg
                      </div>
                    </div>
                  </div>

                  {selectedFurniture.dimensions && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Dimensions (L × W × H)
                      </label>
                      <div className="text-gray-900">
                        {selectedFurniture.dimensions.length} ×{" "}
                        {selectedFurniture.dimensions.width} ×{" "}
                        {selectedFurniture.dimensions.height} cm
                      </div>
                    </div>
                  )}

                  {selectedFurniture.tags &&
                    selectedFurniture.tags.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-2 block">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedFurniture.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1"
                            >
                              <Tag className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          selectedFurniture.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedFurniture.inStock
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </div>
                    {selectedFurniture.featured && (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-gray-500">
                    <div>
                      Created: {formatDate(selectedFurniture.createdAt)}
                    </div>
                    <div>
                      Updated: {formatDate(selectedFurniture.updatedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Delete Furniture
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{furnitureToDelete?.name}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
