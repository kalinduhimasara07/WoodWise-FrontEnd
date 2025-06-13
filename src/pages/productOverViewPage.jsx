import React, { useState } from "react";
import {
  Heart,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Maximize2,
} from "lucide-react";
import ThreeDScene from "../components/3D models/ThreeDScene";

export default function ProductOverview() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const productImages = [
    "https://finez.lk/cdn/shop/products/Harly.jpg?v=1675678068",
    "https://finez.lk/cdn/shop/products/Harly-2.jpg?v=1675678067",
    // 'https://finez.lk/cdn/shop/products/3_e694fee9-c14e-4ada-8952-a8449945a0a2.jpg?v=1647273842',
    // 'https://finez.lk/cdn/shop/products/4_485d787e-9b52-4126-a372-59c6027d457f.jpg?v=1647273843'
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Images */}
        <div className="flex gap-4">
          {/* Thumbnail Gallery */}
          <div className="flex flex-col gap-3">
            {productImages.map((image, index) => (
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
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden bg-gray-100 relative">
              <img
                src={productImages[selectedImage]}
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
              Harly Dining Table - Table Only
            </h1>
            {/* //product Id */}
            <p className="text-gray-600">
              <span className="font-semibold">Product ID:</span> 12345
            </p>
            <span className="text-gray-900 font-bold text-2xl">
              Rs 155,000.00
            </span>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Availability:</span>
              <span className="text-green-600 font-medium">In stock</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Category:</span> Dining
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Dimensions</span>
              <span>H: 30 Inches x W: 36 Inches</span>
            </p>
          </div>
          
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Material:</span> Teak
            </p>
            <label for="Material" className="text-gray-600 font-semibold">Choose a Material:</label>
            <select id="Material" name="fruits">
              <option value="Teak">Teak</option>
              <option value="Nedun">Nedun</option>
              <option value="Mahogany">Mahogany</option>
            </select>
          </div>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Made out of premium quality teak timber and spray painted in a
              whitewash finish the product is a versatile and contemporary
              dining table for any dining space
            </p>
            <p>
              Each furniture piece was carefully selected and crafted to match
              the discerning needs of our customer, and to match the modern
              contemporary living standards.
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
              * At the moment this product is made to order only. Kindly send us
              a web inquiry or get in touch using the below details to place an
              order.
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Sales:</span> 0778 838 939, 0773 164
              404, 0770 101 140, 0767 890 940
            </div>
            <div>
              <span className="font-medium">WhatsApp:</span> 0774 456 602
            </div>
            <div>
              <span className="font-medium">General Line:</span> 0117 110 084
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
              src={productImages[selectedImage]}
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
      <div className="w-[600px] h-[600px] flex items-center justify-center border-4 border-gray-700">
        <ThreeDScene />
      </div>
    </div>
  );
}
