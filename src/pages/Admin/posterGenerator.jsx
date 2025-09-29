import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useLocation } from "react-router-dom";
import { Home, MapPin, Phone, Mail } from "lucide-react";

const PosterGenerator = () => {
  const location = useLocation();
  const [furnitureImage, setFurnitureImage] = useState(location.state?.furnitureImage || null);
  const [quote, setQuote] = useState('Transform your living space with timeless elegance');
  const captureRef = useRef(null);
  const downloadLinkRef = useRef(null);

  const [title, setTitle] = useState('Classic Furniture Style');
  const [address, setAddress] = useState('123 Main Street, Colombo, Sri Lanka');
  const [contact, setContact] = useState('Call us: +94 77 123 4567');
  const [imageSize, setImageSize] = useState(230);

  // Modern, elegant background template
  const BackgroundTemplate = () => (
    <svg width="600" height="800" viewBox="0 0 600 800" className="w-full h-auto absolute inset-0 z-0">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7e9da" />
          <stop offset="100%" stopColor="#cbb08c" />
        </linearGradient>
        <radialGradient id="circleGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a86523" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f7e9da" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="800" fill="url(#bgGrad)" />
      <ellipse cx="500" cy="120" rx="120" ry="80" fill="url(#circleGrad)" />
      <ellipse cx="120" cy="700" rx="100" ry="60" fill="url(#circleGrad)" />
      <ellipse cx="300" cy="400" rx="250" ry="120" fill="#fff" opacity="0.08" />
      <ellipse cx="300" cy="600" rx="180" ry="80" fill="#fff" opacity="0.06" />
      <rect x="40" y="140" width="300" height="200" fill="#fff" opacity="0.07" rx="20" />
      <rect x="40" y="380" width="140" height="50" fill="#fff" opacity="0.04" rx="10" />
      <path d="M 80 700 Q 200 650 400 780" stroke="#a86523" strokeWidth="6" fill="none" opacity="0.18" />
      <path d="M 500 100 Q 400 300 600 400" stroke="#a86523" strokeWidth="4" fill="none" opacity="0.12" />
    </svg>
  );

  const generate = async () => {
    if (!captureRef.current) return;
    try {
      if (typeof html2canvas !== 'undefined') {
        const canvas = await html2canvas(captureRef.current, {
          backgroundColor: null,
          scale: 1,
          useCORS: true,
          allowTaint: true
        });
        const imageData = canvas.toDataURL('image/png');
        updatePreview(imageData);
      }
    } catch (error) {
      console.error('Error generating poster:', error);
    }
  };

  const updatePreview = (imageData) => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = imageData;
    }
    const renderDiv = document.getElementById('render');
    if (renderDiv) {
      renderDiv.innerHTML = '<h2 class="text-xl font-bold text-gray-800 mb-4">Generated Preview</h2>';
      const imgElement = new Image();
      imgElement.src = imageData;
      imgElement.className = 'max-w-full shadow-lg rounded-lg';
      renderDiv.appendChild(imgElement);
    }
  };

  return (
    <div className='w-full h-full bg-white rounded-4xl p-6 overflow-y-scroll'>
      <section className="flex flex-col items-center gap-6 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Furniture Poster Generator
        </h1>

        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-10">
          {/* Left column */}
          <div className="w-full md:w-2/3 flex flex-col items-center gap-6">
            {/* Capture Area */}
            <div
              id="capture"
              ref={captureRef}
              className="relative w-[350px] md:w-[500px] bg-white shadow-xl rounded-lg overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <BackgroundTemplate />

              {/* Title */}
              <div className="absolute top-12 left-8 right-8 z-10">
                <h1
                  className="text-5xl font-extrabold leading-tight drop-shadow-lg"
                  style={{ color: "#a86523" }}
                >
                  {title}
                </h1>
              </div>

              {/* Quote */}
              <div className="absolute top-45 left-8 right-8 z-10">
                <p className="text-lg font-medium leading-relaxed italic" style={{ color: "#4b5563" }}>
                  “{quote}”
                </p>
              </div>

              {/* Furniture Image */}
              {furnitureImage && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl overflow-hidden border-4 shadow-2xl z-10 bg-white"
                  style={{
                    top: "220px",
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    borderColor: "#a86523"
                  }}
                >
                  <img src={furnitureImage} alt="Furniture" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Buy Now Button */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 z-10"
                style={{
                  top: `${220 + Number(imageSize) + 24}px`
                }}
              >
                <button
                  className="text-white px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
                  style={{
                    background: "linear-gradient(to right, #a86523, #cbb08c)"
                  }}
                >
                  BUY NOW
                </button>
              </div>

              {/* Address */}
              <div className="absolute left-8 right-8 z-10 flex items-center gap-2"
                   style={{ bottom: "72px", color: "#4b5563" }}>
                <MapPin className="w-5 h-5" style={{ color: "#a86523" }} />
                <span className="text-sm font-semibold">{address}</span>
              </div>

              {/* Contact */}
              <div className="absolute left-8 right-8 z-10 flex items-center gap-2"
                   style={{ bottom: "32px", color: "#4b5563" }}>
                <Phone className="w-5 h-5" style={{ color: "#a86523" }} />
                <span className="text-sm font-semibold">{contact}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="w-[600px] max-w-full space-y-6 bg-white rounded-xl shadow p-6 mt-4">
              <h2 className="text-xl font-bold text-[#a86523] mb-4">Customize Your Poster</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter poster title..."
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#a86523] focus:border-[#a86523]"
                  />
                </div>
                {/* Quote input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtitle / Quote
                  </label>
                  <input
                    type="text"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Enter a catchy quote..."
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#a86523] focus:border-[#a86523]"
                  />
                </div>
                {/* Address input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address..."
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#a86523] focus:border-[#a86523]"
                  />
                </div>
                {/* Contact input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter contact info..."
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#a86523] focus:border-[#a86523]"
                  />
                </div>
                {/* Image Size input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Furniture Image Size (px)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={400}
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#a86523] focus:border-[#a86523]"
                  />
                </div>
                {/* Furniture Image upload */}
                {/* <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Furniture Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => setFurnitureImage(ev.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#a86523] focus:border-[#a86523]"
                  />
                </div> */}
              </div>
              <div className="flex gap-4 justify-center mt-6">
                <button
                  type="button"
                  onClick={generate}
                  className="px-8 py-3 bg-[#a86523] text-white rounded-md shadow-lg hover:bg-[#cbb08c] transition-colors font-semibold"
                >
                  Generate Poster
                </button>
                <a
                  id="download"
                  download="classic-furniture-poster.png"
                  ref={downloadLinkRef}
                  className="px-8 py-3 bg-green-600 text-white rounded-md shadow-lg hover:bg-green-700 transition-colors font-semibold text-center"
                >
                  Download
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Preview */}
          <div id="render" className="w-full md:w-1/3 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Generated Preview</h2>
            <p className="text-gray-600">Click "Generate Poster" to create your preview</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PosterGenerator;