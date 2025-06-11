import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FurnitureSlider = () => {
  const [activeTab, setActiveTab] = useState('NEW ARRIVALS');
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabs = ['BEST SELLERS', 'NEW ARRIVALS', 'PANTRY', 'DINNING', 'LIVING', 'PILLOWS'];

  const products = {
    'BEST SELLERS': [
      {
        id: 1,
        name: 'Ovya Sofa',
        price: 96500.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 2,
        name: 'Myra Nested Coffee Table',
        price: 87500.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 3,
        name: 'Grace Sofa',
        price: 92000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 4,
        name: 'Amora Chair',
        price: 62500.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 5,
        name: 'Tidal Pantry',
        price: null,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop',
        inStock: true
      }
    ],
    'NEW ARRIVALS': [
      {
        id: 6,
        name: 'Modern Dining Set',
        price: 125000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 7,
        name: 'Luxury Armchair',
        price: 75000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 8,
        name: 'Contemporary Sofa',
        price: 98000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
        inStock: true
      }
    ],
    'PANTRY': [
      {
        id: 9,
        name: 'Kitchen Cabinet Set',
        price: 180000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 10,
        name: 'Pantry Storage Unit',
        price: 95000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        inStock: true
      }
    ],
    'DINNING': [
      {
        id: 11,
        name: 'Dining Table Set',
        price: 145000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 12,
        name: 'Dining Chairs Set of 4',
        price: 68000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
        inStock: true
      }
    ],
    'LIVING': [
      {
        id: 13,
        name: 'Living Room Set',
        price: 185000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 14,
        name: 'Coffee Table',
        price: 45000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop',
        inStock: true
      }
    ],
    'PILLOWS': [
      {
        id: 15,
        name: 'Decorative Pillows Set',
        price: 12500.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        inStock: true
      },
      {
        id: 16,
        name: 'Luxury Throw Pillows',
        price: 18000.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop',
        inStock: true
      }
    ]
  };

  const currentProducts = products[activeTab] || [];
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-8 mb-8 border-b border-gray-200">
        {tabs.map((tab, index) => (
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
                      <div key={product.id} className="group cursor-pointer">
                        {/* Product Image */}
                        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3] mb-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.inStock && (
                            <div className="absolute top-3 right-3">
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                In stock
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
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                From: {formatPrice(product.originalPrice)}
                              </span>
                            )}
                            {product.price ? (
                              <span className="text-lg font-semibold text-gray-900">
                                {product.originalPrice ? '' : 'From: '}{formatPrice(product.price)}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                In stock
                              </span>
                            )}
                          </div>

                          {product.inStock && (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              In stock
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
      </div>
    </div>
  );
};

export default FurnitureSlider;