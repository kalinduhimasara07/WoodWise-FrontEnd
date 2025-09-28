import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useLocation } from "react-router-dom";

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

  // Create the background template as SVG since we can't import external images
  const BackgroundTemplate = () => (
    <svg width="600" height="800" viewBox="0 0 600 800" className="w-full h-auto">
      <rect width="600" height="800" fill="#5a5a5a" />
      <circle cx="500" cy="100" r="80" fill="#3a3a3a" />
      <circle cx="450" cy="650" r="120" fill="#6a6a6a" />
      <path d="M 400 0 Q 500 200 400 400 Q 300 600 400 800"
        stroke="white" strokeWidth="8" fill="none" />
      <path d="M 500 200 Q 600 300 500 500 Q 400 700 600 800"
        stroke="white" strokeWidth="6" fill="none" />
      <rect x="40" y="140" width="300" height="200" fill="rgba(0,0,0,0.1)" rx="10" />
      <rect x="40" y="380" width="140" height="50" fill="none" stroke="none" strokeWidth="2" rx="5" />
    </svg>
  );

  const generate = async () => {
    if (!captureRef.current) return;

    try {
      // Use modern browser API to capture the actual preview
      if (typeof html2canvas !== 'undefined') {
        const canvas = await html2canvas(captureRef.current, {
          backgroundColor: null,
          scale: 1,
          useCORS: true,
          allowTaint: true
        });
        const imageData = canvas.toDataURL('image/png');
        updatePreview(imageData);
      } else {
        const element = captureRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const rect = element.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const captureElement = () => {
          return new Promise((resolve) => {
            const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
              <foreignObject width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml" style="width: ${rect.width}px; height: ${rect.height}px;">
                  ${element.innerHTML}
                </div>
              </foreignObject>
            </svg>`;

            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => {
              createSimpleCapture(canvas, ctx);
              resolve(canvas.toDataURL('image/png'));
            };
            img.src = 'data:image/svg+xml;base64,' + btoa(data);
          });
        };

        const imageData = await captureElement();
        updatePreview(imageData);
      }
    } catch (error) {
      console.error('Error generating poster:', error);
      cloneElementAsImage();
    }
  };

  const createSimpleCapture = (canvas, ctx) => {
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(0, 0, width, height);

    // Add text and elements to match preview
    ctx.fillStyle = 'white';
    ctx.font = 'bold 36px Arial';
    ctx.fillText('Classic', width * 0.07, height * 0.15);
    ctx.fillText('Furniture', width * 0.07, height * 0.23);
    ctx.fillText('Style', width * 0.07, height * 0.31);

    // Quote text
    ctx.font = '16px Arial';
    const lines = quote.match(/.{1,40}/g) || [quote];
    lines.forEach((line, index) => {
      ctx.fillText(line.trim(), width * 0.07, height * 0.45 + (index * 25));
    });

    // Buy Now button
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(width * 0.07, height * 0.6, width * 0.23, height * 0.06);
    ctx.font = 'bold 14px Arial';
    ctx.fillText('BUY NOW', width * 0.12, height * 0.635);
  };

  const cloneElementAsImage = () => {
    // Direct cloning approach - copy the preview as is
    const element = captureRef.current.cloneNode(true);
    const renderDiv = document.getElementById('render');

    if (renderDiv) {
      renderDiv.innerHTML = '<h2 class="text-xl font-bold text-gray-800 mb-4">Generated Preview</h2>';
      element.className = 'max-w-full border shadow-lg rounded-lg bg-white';
      renderDiv.appendChild(element);

      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      createSimpleCapture(canvas, ctx);

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = canvas.toDataURL('image/png');
      }
    }
  };

  const updatePreview = (imageData) => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = imageData;
    }

    // Show preview
    const renderDiv = document.getElementById('render');
    if (renderDiv) {
      renderDiv.innerHTML = '<h2 class="text-xl font-bold text-gray-800 mb-4">Generated Preview</h2>';
      const imgElement = new Image();
      imgElement.src = imageData;
      imgElement.className = 'max-w-full border shadow-lg rounded-lg';
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
              <div className="absolute top-16 left-10 right-4">
                <h1 className="text-white text-5xl font-bold leading-tight whitespace-pre-line">
                  {title}
                </h1>
              </div>

              {/* Quote */}
              <div className="absolute top-72 left-10 right-4 max-w-sm">
                <p className="text-white text-lg font-light leading-relaxed">
                  {quote}
                </p>
              </div>

              {/* Address */}
              <div className="absolute bottom-20 left-10 right-4">
                <p className="text-white text-sm font-light leading-snug">
                  {address}
                </p>
              </div>

              {/* Contact */}
              <div className="absolute bottom-10 left-10 right-4">
                <p className="text-white text-sm font-light leading-snug">
                  {contact}
                </p>
              </div>

              <div className="absolute top-96 left-10">
                <div className="border-2 border-white text-white px-6 py-3 text-lg font-semibold tracking-wide">
                  BUY NOW
                </div>
              </div>

              {furnitureImage && (
                <div
                  className="absolute bottom-20 right-16 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                  style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
                >
                  <img src={furnitureImage} alt="Furniture" className="w-full h-full object-cover" />
                </div>

              )}
            </div>

            {/* Controls */}
            <div className="w-[600px] max-w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Size (px)
                </label>
                <input
                  type="number"
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>
              {/* Title input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title Text
                </label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your title text..."
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                />
              </div>

              {/* Existing Subtitle Text (quote) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle Text
                </label>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Enter your subtitle text..."
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>

              {/* Address input */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address..."
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div> */}

              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={generate}
                  className="px-8 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-colors font-semibold"
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