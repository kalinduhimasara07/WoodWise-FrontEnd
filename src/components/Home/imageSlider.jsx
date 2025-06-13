import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample images - in a real app, these would be passed as props
  const slides = [
    {
      id: 1,
      image: "https://finez.lk/cdn/shop/files/01_11_2048x.jpg?v=1691488783",
      alt: "Modern colorful living room with red sofa"
    },
    {
      id: 2,
      image: "https://finez.lk/cdn/shop/files/banner_3_2048x.jpg?v=1646308554",
      alt: "Contemporary living space"
    },
    {
      id: 3,
      image: "https://static.vecteezy.com/system/resources/thumbnails/056/802/377/small_2x/a-white-and-orange-framed-picture-hangs-on-a-wall-in-a-room-with-a-table-free-photo.jpeg",
      alt: "Stylish modern interior"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  
      useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
      }, []);
      

  return (
    <div className="relative w-full h-120 overflow-hidden rounded-lg bg-gray-100">
      {/* Image Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Gradient overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white shadow-lg'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Auto-play functionality */}
      {/* You can uncomment this useEffect to enable auto-play */}
      {/*
      React.useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
      }, []);
      */}
    </div>
  );
}