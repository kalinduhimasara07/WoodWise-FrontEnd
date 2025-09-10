import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Plus, Upload, X, Save } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";
import BackButton from "../../components/backButton";
// Assuming you have this utility for uploads

export default function EditFurniture() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: sku } = useParams(); // Get the SKU from the URL
  const { furniture } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    salePrice: "",
    description: "",
    woodType: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    weight: "",
    color: "",
    brand: "",
    stock: "",
    sku: "",
    tags: [],
    images: [],
    models: [],
    inStock: true,
    featured: false,
  });

  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isUploadingModels, setIsUploadingModels] = useState(false);

  useEffect(() => {
    if (furniture) {
      setFormData({
        ...furniture,
        dimensions: furniture.dimensions || { length: "", width: "", height: "" },
        tags: furniture.tags || [],
        images: furniture.images || [],
        models: furniture.models || [],
      });
    } else {
      // Optional: Fetch furniture data if not passed in state
      const fetchFurniture = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/furniture/sku/${sku}`);
          const fetchedFurniture = response.data.data;
          setFormData({
            ...fetchedFurniture,
            dimensions: fetchedFurniture.dimensions || { length: "", width: "", height: "" },
            tags: fetchedFurniture.tags || [],
            images: fetchedFurniture.images || [],
            models: fetchedFurniture.models || [],
          });
        } catch (error) {
          console.error("Error fetching furniture data:", error);
          toast.error("Failed to fetch furniture data.");
          navigate("/admin/furniture"); // Redirect if furniture not found
        }
      };
      fetchFurniture();
    }
  }, [furniture, sku, navigate]);


  const categories = [
    "Living Room",
    "Bedroom",
    "Dining Room",
    "Office",
    "Kitchen",
    "Bathroom",
    "Outdoor",
  ];

  const subcategories = {
    "Living Room": ["Sofas", "Coffee Tables", "TV Stands", "Armchairs", "Bookshelves"],
    "Bedroom": ["Beds", "Wardrobes", "Nightstands", "Dressers", "Mattresses"],
    "Dining Room": ["Dining Tables", "Dining Chairs", "Sideboards", "Bar Stools"],
    "Office": ["Desks", "Office Chairs", "Filing Cabinets", "Bookcases"],
    "Kitchen": ["Kitchen Islands", "Bar Carts", "Storage Cabinets"],
    "Bathroom": ["Vanities", "Storage Units", "Mirrors"],
    "Outdoor": ["Patio Sets", "Garden Chairs", "Outdoor Tables"],
  };

  const woodTypes = [
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploadingImages(true);
    const newImages = [];

    for (let file of files) {
      try {
        const imageUrl = await mediaUpload(file);
        newImages.push({ url: imageUrl, size: file.size, uploadDate: new Date() });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Image upload failed.");
      }
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
    setIsUploadingImages(false);
  };

  const removeImage = (imageUrlToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image.url !== imageUrlToRemove),
    }));
  };

  const handleModelUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploadingModels(true);
    const newModels = [];

    for (let file of files) {
      try {
        const modelUrl = await mediaUpload(file);
        newModels.push({ url: modelUrl, size: file.size, uploadDate: new Date() });
      } catch (error) {
        console.error("Error uploading model:", error);
        toast.error("3D Model upload failed.");
      }
    }

    setFormData((prev) => ({
      ...prev,
      models: [...prev.models, ...newModels],
    }));
    setIsUploadingModels(false);
  };

  const removeModel = (modelUrlToRemove) => {
    setFormData((prev) => ({
      ...prev,
      models: prev.models.filter((model) => model.url !== modelUrlToRemove),
    }));
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.woodType) newErrors.woodType = "Wood Type is required";
    if (!formData.stock || formData.stock < 0) newErrors.stock = "Valid stock quantity is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/furniture/${furniture.sku}`, // Use the SKU for the update
        formData
      );

      if (response.data.success) {
        toast.success("Furniture item updated successfully!", {
          className: "border border-emerald-600 p-4 text-emerald-800 bg-emerald-50 rounded-xl text-sm font-medium shadow-xl",
          iconTheme: { primary: "#059669", secondary: "#ecfdf5" },
          duration: 5000,
        });
        navigate("/admin/furniture"); // Redirect after successful update
      } else {
        toast.error("Error: " + response.data.message, {
          className: "border border-red-600 p-4 text-red-800 bg-red-50 rounded-xl text-sm font-medium shadow-xl",
          iconTheme: { primary: "#dc2626", secondary: "#fef2f2" },
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error updating furniture:", error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage, {
        className: "border border-red-600 p-4 text-red-800 bg-red-50 rounded-xl text-sm font-medium shadow-xl",
        iconTheme: { primary: "#dc2626", secondary: "#fef2f2" },
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-4xl p-6 overflow-y-scroll">
      <BackButton />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Furniture Item
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Update the details below for the furniture item.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.sku ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter SKU"
                  readOnly // SKU should generally not be editable
                />
                {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
              </div>
            </div>

            {/* Category and Wood Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!formData.category}
                >
                  <option value="">Select subcategory</option>
                  {formData.category &&
                    subcategories[formData.category]?.map((subcat) => (
                      <option key={subcat} value={subcat}>
                        {subcat}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wood Type *
                </label>
                <select
                  name="woodType"
                  value={formData.woodType}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.woodType ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select Wood Type</option>
                  {woodTypes.map((woodType) => (
                    <option key={woodType} value={woodType}>
                      {woodType}
                    </option>
                  ))}
                </select>
                {errors.woodType && <p className="mt-1 text-sm text-red-600">{errors.woodType}</p>}
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (LKR) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                  placeholder="0.00"
                />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price (LKR)
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.stock ? "border-red-500" : "border-gray-300"}`}
                  placeholder="0"
                />
                {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter detailed product description"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions (inches)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  name="dimensions.length"
                  value={formData.dimensions.length}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Length"
                />
                <input
                  type="number"
                  name="dimensions.width"
                  value={formData.dimensions.width}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Width"
                />
                <input
                  type="number"
                  name="dimensions.height"
                  value={formData.dimensions.height}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Height"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter color"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter brand name"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag and press Enter"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload new images
                  </p>
                </label>
              </div>

              {isUploadingImages && (
                <div className="mt-4 flex justify-center">
                  <div className="h-8 w-8 border-4 border-blue-200 rounded-full border-t-blue-700 animate-spin"></div>
                </div>
              )}

              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt="Product"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.url)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3D Model Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product 3D Models
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept=".glb"
                  onChange={handleModelUpload}
                  className="hidden"
                  id="model-upload"
                />
                <label htmlFor="model-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload new 3D models
                  </p>
                </label>
              </div>

              {isUploadingModels && (
                <div className="mt-4 flex justify-center">
                  <div className="h-8 w-8 border-4 border-blue-200 rounded-full border-t-blue-700 animate-spin"></div>
                </div>
              )}

              {formData.models.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.models.map((model, index) => (
                    <div key={index} className="relative p-2 border rounded-lg">
                       <p className="text-xs truncate">{model.url.split('/').pop()}</p>
                      <button
                        type="button"
                        onClick={() => removeModel(model.url)}
                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || isUploadingImages || isUploadingModels}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 flex items-center gap-2"
            >
              <Save size={18} />
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}