import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Tag,
  Package,
  Eye,
  Heart,
  Loader2,
} from "lucide-react";
import Loading from "../components/loader";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Office",
  "Kitchen",
  "Bathroom",
  "Outdoor",
];
const woodTypes = [
  "All",
  "Teak",
  "Oak",
  "Mahogany",
  "Pine",
  "Walnut",
  "Bamboo",
  "Ash",
  "Rosewood",
  "Rubberwood",
];

// Fetch furniture data from API
const fetchFurniture = async (page = 1, limit = 50) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/furniture?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch furniture data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching furniture:", error);
    throw error;
  }
};

const FurnitureCard = ({ furniture }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const hasDiscount =
    furniture.salePrice && furniture.salePrice < furniture.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((furniture.price - furniture.salePrice) / furniture.price) * 100
      )
    : 0;

  // Format price for display (assuming prices are in cents or smaller units)
  const formatPrice = (price) => {
    if (price >= 1000) {
      return `${Math.round(price).toLocaleString()}`;
    }
    return `${price}`;
  };

  const navigate = useNavigate();
  // Navigate to furniture detail page
  const handleCardClick = () => {
    navigate(`/furniture/${furniture.sku}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={
            furniture.images?.[0]?.url ||
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
          }
          alt={furniture.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {furniture.featured && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{discountPercentage}%
            </span>
          )}
          {!furniture.inStock && (
            <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Sold Out
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-red-50"
            }`}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-200"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Wood Type */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
            {furniture.category}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
            {furniture.woodType}
          </span>
        </div>

        {/* Name & Brand */}
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
          {furniture.name}
        </h3>
        {furniture.brand && (
          <p className="text-gray-600 text-sm mb-2">{furniture.brand}</p>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {furniture.description}
        </p>

        {/* Dimensions */}
        {furniture.dimensions && (
          <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
            <Package size={14} />
            <span>
              {furniture.dimensions.length}×{furniture.dimensions.width}×
              {furniture.dimensions.height} cm
            </span>
            {furniture.weight && (
              <span className="ml-2">• {furniture.weight}kg</span>
            )}
          </div>
        )}

        {/* SKU */}
        <div className="text-xs text-gray-500 mb-3">SKU: {furniture.sku}</div>

        {/* Tags */}
        {furniture.tags && furniture.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {furniture.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-xl font-bold text-green-600">
                  Rs {formatPrice(furniture.salePrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  Rs {formatPrice(furniture.price)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                Rs {formatPrice(furniture.price)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Info */}
        {furniture.inStock && (
          <div className="mt-3 text-xs text-gray-500">
            {furniture.stock <= 5 ? (
              <span className="text-orange-600 font-medium">
                Only {furniture.stock} left in stock
              </span>
            ) : (
              <span>{furniture.stock} available</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const FurnitureShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWoodType, setSelectedWoodType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // API state management
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0,
  });

  // Fetch furniture data from API
  useEffect(() => {
    const loadFurniture = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFurniture(
          pagination.page,
          pagination.limit
        );

        if (response.success) {
          setFurniture(response.data);
          setPagination(response.pagination);
        } else {
          throw new Error("Failed to load furniture data");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error loading furniture:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFurniture();
  }, [pagination.page, pagination.limit]);

  // Filter and sort furniture
  const filteredAndSortedFurniture = useMemo(() => {
    let filtered = furniture.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesWoodType =
        selectedWoodType === "All" || item.woodType === selectedWoodType;

      return matchesSearch && matchesCategory && matchesWoodType;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case "price-high":
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }, [furniture, searchTerm, selectedCategory, selectedWoodType, sortBy]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loading />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Furniture...
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch our collection
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <Package size={64} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to Load Furniture
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Our Furniture Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium handcrafted furniture made from the finest woods
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search furniture by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Filter size={20} />
              Filters
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredAndSortedFurniture.length} items found
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wood Type
                  </label>
                  <select
                    value={selectedWoodType}
                    onChange={(e) => setSelectedWoodType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {woodTypes.map((wood) => (
                      <option key={wood} value={wood}>
                        {wood}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Furniture Grid */}
        {filteredAndSortedFurniture.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedFurniture.map((furniture) => (
              <FurnitureCard key={furniture._id} furniture={furniture} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Package size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No furniture found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedWoodType("All");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FurnitureShowcase;
