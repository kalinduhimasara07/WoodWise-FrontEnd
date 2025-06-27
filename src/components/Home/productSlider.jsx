import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FurnitureSlider = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [furnitureData, setFurnitureData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = ['ALL', 'LIVING ROOM', 'BEDROOM', 'DINING ROOM', 'OFFICE', 'KITCHEN', 'BATHROOM', 'OUTDOOR'];

  // Fetch furniture data from backend
  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/furniture');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setFurnitureData(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching furniture data:', err);
        setError('Failed to load furniture data');
      } finally {
        setLoading(false);
      }
    };

    fetchFurniture();
  }, []);

  // Filter products based on active tab
  const getFilteredProducts = () => {
    if (activeTab === 'ALL') {
      return furnitureData;
    }
    return furnitureData.filter(product => 
      product.category.toUpperCase() === activeTab
    );
  };

  const currentProducts = getFilteredProducts();
  const itemsPerSlide = 4;
  const maxSlide = Math.max(0, Math.ceil(currentProducts.length / itemsPerSlide) - 1);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const formatPrice = (price) => {
    if (!price) return null;
    return `Rs ${price.toLocaleString()}.00`;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentSlide(0);
  };

  const handleProductClick = (sku) => {
    // Navigate to furniture detail page
    window.location.href = `/furniture/${sku}`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="h-12 w-12 border-4 border-amber-100 rounded-full border-t-amber-600 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-600 p-8">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-8 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-4 px-2 text-sm font-medium tracking-wide transition-colors relative ${
              activeTab === tab
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Slider */}
      <div className="relative">
        {currentProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              disabled={currentProducts.length <= itemsPerSlide}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              disabled={currentProducts.length <= itemsPerSlide}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Products Grid */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
                {Array.from({ length: Math.ceil(currentProducts.length / itemsPerSlide) }, (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {currentProducts
                        .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                        .map((product) => (
                          <div 
                            key={product._id} 
                            className="group cursor-pointer"
                            onClick={() => handleProductClick(product.sku)}
                          >
                            {/* Product Image */}
                            <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3] mb-4">
                              <img
                                src={product.images && product.images.length > 0 
                                  ? product.images[0].url 
                                  : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
                                }
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop';
                                }}
                              />
                              {product.inStock && (
                                <div className="absolute top-3 right-3">
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                    In stock
                                  </span>
                                </div>
                              )}
                              {product.salePrice && product.salePrice < product.price && (
                                <div className="absolute top-3 left-3">
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                                    Sale
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-2">
                              <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                                {product.name}
                              </h3>
                              
                              <div className="flex items-center gap-2">
                                {product.salePrice && product.salePrice < product.price ? (
                                  <>
                                    <span className="text-sm text-gray-500 line-through">
                                      {formatPrice(product.price)}
                                    </span>
                                    <span className="text-lg font-semibold text-red-600">
                                      {formatPrice(product.salePrice)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-lg font-semibold text-gray-900">
                                    {formatPrice(product.price)}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                  {product.inStock ? `${product.stock} in stock` : 'Out of stock'}
                                </div>
                                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                  {product.category}
                                </span>
                              </div>

                              {product.woodType && (
                                <div className="text-xs text-gray-500">
                                  {product.woodType} • {product.color}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      
                      {/* Fill empty slots if needed */}
                      {Array.from({ 
                        length: Math.max(0, itemsPerSlide - currentProducts.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).length) 
                      }, (_, emptyIndex) => (
                        <div key={`empty-${emptyIndex}`} className="hidden lg:block"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            {maxSlide > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxSlide + 1 }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-amber-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FurnitureSlider;