import React, { use, useEffect, useState } from "react";
import {
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Maximize2,
} from "lucide-react";

import axios from "axios";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../components/notFoundPage";
import Loading from "../../components/loader";
import ThreeDScene from "../../components/3D models/ThreeDScene";
import BackButton from "../../components/backButton";

export default function ProductOverview() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [furniture, setFurniture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [furnitureImages, setFurnitureImages] = useState([]);
  const [furnitureModels, setFurnitureModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(0);
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);

  //fetch the data from the api
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/furniture/${id}`)
      .then((response) => {
        if (!response.data || !response.data.data) {
          setNotFound(true); // No item data found
          setIsLoading(false);
        } else {
          setFurniture(response.data);
          setFurnitureImages(response.data.data.images || []);
          setFurnitureModels(response.data.data.models || []);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setNotFound(true); // Error or 404 from server
        setIsLoading(false);
      });
  }, [id]);

  console.log(furniture);

  //create loading function
  function loading() {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <Loading />
      </div>
    );
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 overflow-auto">
      <BackButton/>
      {isLoading ? (
        <div className=" h-full flex items-center justify-center bg-white">
          {loading()}
        </div>
      ) : notFound ? (
        <NotFoundPage />
      ) : (
        <div className="mx-auto px-4 py-8 w-full h-full bg-white rounded-4xl p-6 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Images */}
            <div className="flex gap-4">
              {/* Thumbnail Gallery */}
              <div className="flex flex-col gap-3">
                {furnitureImages.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === index
                        ? "border-amber-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image.url}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <div className="rounded-2xl overflow-hidden bg-gray-100 relative border-1 border-amber-700">
                  <img
                    src={furnitureImages[selectedImage].url}
                    alt={`Modern Living Room - View ${selectedImage + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <button
                    className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                    onClick={openModal}
                  >
                    <Maximize2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {furniture.data.name}
                </h1>
                {/* //product Id */}
                <p className="text-gray-600">
                  <span className="font-semibold">Product ID:</span>{" "}
                  {furniture.data.sku}
                </p>
                <span className="text-gray-900 font-bold text-2xl">
                  Rs{" "}
                  {furniture.data.salePrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-gray-600 font-bold mx-4 line-through">
                  Rs
                  {furniture.data.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Availability:</span>
                  <span
                    className={
                      furniture.data.stock > 0
                        ? "text-green-500 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {furniture.data.stock > 0 ? "In stock" : "Out of stock"}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Category:</span>{" "}
                  {furniture.data.category}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Subcategory:</span>{" "}
                  {furniture.data.subcategory}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Dimensions</span>
                  <span>
                    {" "}
                    H: {furniture.data.dimensions.height} Inches x W:{" "}
                    {furniture.data.dimensions.width} Inches x L:{" "}
                    {furniture.data.dimensions.length} Inches
                  </span>
                </p>
              </div>

              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Material:</span>{" "}
                  {furniture.data.woodType}
                </p>
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {furniture.data.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Products Featured:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Belvedere Three Seater Sofa</li>
                  <li>Belvedere Coffee Table</li>
                  <li>Ethan Tub Chair with Lines</li>
                  <li>Throw Pillows</li>
                  <li>Liam Dinning Table</li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  * At the moment this product is made to order only. Kindly
                  send us a web inquiry or get in touch using the below details
                  to place an order.
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Sales:</span> 0778 838 939, 0773
                  164 404, 0770 101 140, 0767 890 940
                </div>
                <div>
                  <span className="font-medium">WhatsApp:</span> 0774 456 602
                </div>
                <div>
                  <span className="font-medium">General Line:</span> 0117 110
                  084
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">ADD TO WISHLIST</span>
                </button>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600 uppercase">
                    Share:
                  </span>
                  <div className="flex gap-3">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-800 transition-colors">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-700 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-pink-600 transition-colors">
                      <Instagram className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Model and Gallery */}
          <div className="flex gap-6">
            {/* Main 3D Model Display */}
            <div className="w-[600px] h-[600px] flex items-center justify-center border-1 border-amber-700 rounded-2xl overflow-hidden bg-gray-100">
              <ThreeDScene
                modelPath={
                  furnitureModels[selectedModel]?.url ||
                  "/path/to/defaultModel.glb"
                }
              />
            </div>

            {/* Gallery Model Thumbnails */}
            <div className="space-y-4">
              {furnitureModels.map((model, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 m-2 cursor-pointer border-2 ${
                    selectedModel === index
                      ? "border-amber-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedModel(index)}
                >
                  {/* <ThreeDScene modelPath={model.url} /> */}
                </div>
              ))}
            </div>
          </div>

          {/* Modal for Fullscreen Image */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50"
              onClick={closeModal}
            >
              <div
                className=" p-4 rounded-lg"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
              >
                <img
                  src={furnitureImages[selectedImage].url}
                  alt={`Full size image`}
                  className="max-w-full h-screen object-contain"
                />
                <button
                  className="absolute top-4 right-4 text-white text-2xl font-bold"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
