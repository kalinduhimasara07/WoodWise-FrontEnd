import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash, AlertTriangle, Search, Filter, X } from "lucide-react"; // Import Lucide icons
import axios from "axios"; // Import Axios
import Loading from "../../components/loader";
import toast from "react-hot-toast";

export default function MillInventory() {
  const [timberData, setTimberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [furnitureToDelete, setFurnitureToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    grade: "",
    inStock: "",
    minPrice: "",
    maxPrice: "",
    minStock: "",
    maxStock: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Available filter options based on your timber model
  const categoryOptions = [
    "Teak",
    "Oak",
    "Mahogany",
    "Pine",
    "Walnut",
    "Bamboo",
    "Ash",
    "Rosewood",
    "Rubberwood",
    "Bodhi",
    "Mango",
    "Yaka",
    "Halmilla",
    "Vatica",
    "Rambutan",
    "Kumbuk",
    "Balan",
    "Dumbara",
    "Hedar",
    "Sassafras",
    "Kachchan",
    "Millettia",
    "Koss",
    "Lunumidella",
    "Kandula",
    "Berrya",
    "Cinnamon",
    "Ruhuna",
  ];

  const gradeOptions = ["Premium", "Standard", "Economy"];
  const stockOptions = [
    { value: "true", label: "In Stock" },
    { value: "false", label: "Out of Stock" },
  ];

  // Fetch timber inventory data
  useEffect(() => {
    const fetchTimberData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/timber`
        );
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

  // Filter and search logic
  const filteredData = useMemo(() => {
    return timberData.filter((timber) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        timber.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        timber.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        timber.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        timber.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.category === "" || timber.category === filters.category;

      // Grade filter
      const matchesGrade =
        filters.grade === "" || timber.grade === filters.grade;

      // Stock status filter
      const matchesInStock =
        filters.inStock === "" || timber.inStock.toString() === filters.inStock;

      // Price range filter
      const matchesMinPrice =
        filters.minPrice === "" ||
        timber.pricePerUnit >= parseFloat(filters.minPrice);
      const matchesMaxPrice =
        filters.maxPrice === "" ||
        timber.pricePerUnit <= parseFloat(filters.maxPrice);

      // Stock quantity filter
      const matchesMinStock =
        filters.minStock === "" || timber.stock >= parseInt(filters.minStock);
      const matchesMaxStock =
        filters.maxStock === "" || timber.stock <= parseInt(filters.maxStock);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGrade &&
        matchesInStock &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinStock &&
        matchesMaxStock
      );
    });
  }, [timberData, searchQuery, filters]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: "",
      grade: "",
      inStock: "",
      minPrice: "",
      maxPrice: "",
      minStock: "",
      maxStock: "",
    });
    setSearchQuery("");
  };

  // Check if any filters are active
  const hasActiveFilters =
    Object.values(filters).some((value) => value !== "") || searchQuery !== "";

  // Handle delete click, show confirmation modal
  const handleDelete = (id) => {
    const timberItem = timberData.find((item) => item._id === id);
    setFurnitureToDelete(timberItem);
    setShowDeleteModal(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/timber/${
          furnitureToDelete._id
        }`
      );
      const result = response.data;

      if (result.success) {
        toast.success("Timber item deleted successfully!");
        setTimberData(
          timberData.filter((item) => item._id !== furnitureToDelete._id)
        );
      } else {
        toast.error("Error deleting timber item.");
      }
    } catch (error) {
      toast.error("Error deleting timber item.");
    } finally {
      setShowDeleteModal(false);
      setFurnitureToDelete(null);
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 rounded-4xl p-6 overflow-y-auto">
      {/* Title + Search & Filter Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex flex-col gap-4">
        {/* Title */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 mb-1">
            Timber Inventory
          </h1>
          <p className="text-sm text-gray-600">
            Manage timber stock levels, monitor thresholds, and update inventory
            status.
          </p>
        </div>
        {/* Search & Filter Controls */}
        <div>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by category, grade, SKU, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFilters
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                    Active
                  </span>
                )}
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Grade Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    value={filters.grade}
                    onChange={(e) => handleFilterChange("grade", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Grades</option>
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Stock Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Status
                  </label>
                  <select
                    value={filters.inStock}
                    onChange={(e) => handleFilterChange("inStock", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    {stockOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range (Rs)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      className="w-1/2 px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      className="w-1/2 px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                {/* Stock Quantity Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minStock}
                      onChange={(e) => handleFilterChange("minStock", e.target.value)}
                      className="w-1/2 px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxStock}
                      onChange={(e) => handleFilterChange("maxStock", e.target.value)}
                      className="w-1/2 px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Results Info & Add Button */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredData.length} of {timberData.length} timber items
            </p>
            <button
              onClick={() => navigate("/mill/inventory/add-timber")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow font-medium transition"
            >
              + Add New Timber Entry
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 text-gray-800 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Grade</th>
                <th className="py-3 px-4 text-left">Dimensions (L x W x H)</th>
                <th className="py-3 px-4 text-left">Price per Unit (Rs)</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">SKU</th>
                <th className="py-3 px-4 text-left">In Stock</th>
                <th className="py-3 px-4 text-left">Last Updated</th>
                <th className="py-3 px-4 text-center sticky right-0 bg-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-8">
                    <Loading />
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((timber) => (
                  <tr
                    key={timber._id}
                    className="hover:bg-gray-100 border-b border-gray-200"
                  >
                    <td className="py-3 px-4 font-medium">{timber.category}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          timber.grade === "Premium"
                            ? "bg-purple-100 text-purple-800"
                            : timber.grade === "Standard"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {timber.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {timber.dimensions.length} x {timber.dimensions.width} x{" "}
                      {timber.dimensions.height}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      Rs {timber.pricePerUnit.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-medium ${
                          timber.stock === 0
                            ? "text-red-600"
                            : timber.stock < 10
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        {timber.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">
                      {timber.sku}
                    </td>
                    <td className="py-3 px-4">
                      {timber.stock > 0 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(timber.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-center sticky right-0 ">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() =>
                            navigate(
                              `/mill/inventory/edit-timber/${timber._id}`,
                              { state: timber }
                            )
                          }
                          className="text-green-700 hover:text-green-900 hover:bg-green-50 p-1 rounded transition-colors"
                          title="Edit timber"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(timber._id)}
                          className="text-red-600 hover:text-red-900 hover:bg-red-50 p-1 rounded transition-colors"
                          title="Delete timber"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-8">
                    <div className="text-gray-500">
                      {hasActiveFilters
                        ? "No timber items match your search criteria"
                        : "No timber items available"}
                    </div>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-2 text-green-600 hover:text-green-800 font-medium"
                      >
                        Clear filters to see all items
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Delete Timber Item
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{furnitureToDelete?.category}"?
              This action cannot be undone.
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
