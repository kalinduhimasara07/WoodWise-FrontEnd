import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Clock } from "lucide-react";

const LivingShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Effect to fetch and filter data
  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        setLoading(true);
        // Fetch data from the provided backend URL
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/furniture`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiResponse = await response.json();

        // Filter for products in the "Living Room" category
        const livingRoomData = apiResponse.data.filter(
          (item) => item.category === "Living Room"
        );

        // Map the filtered data to the format your component uses
        const formattedProducts = livingRoomData.map((item) => ({
          id: item._id,
          name: item.name,
          status: item.inStock ? "In stock" : "Out of stock",
          // Use the first image from the images array
          image: item.images && item.images.length > 0 ? item.images[0].url : "",
        }));

        setProducts(formattedProducts);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch furniture data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFurniture();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // Effect for the intersection observer animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Optional: stop observing after it's visible
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    if (products.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }
  };

  const prevSlide = () => {
    if (products.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    }
  };
  
  // Render a loading state
  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading furniture...</div>;
  }
  
  // Render an error state
  if (error) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">Error: {error}</div>;
  }
  
  // Render a message if no products are found
  if (products.length === 0) {
    return <div className="min-h-screen flex justify-center items-center">No Living Room furniture available at the moment.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mx-15">
      {/* Hero Section */}
      <div ref={sectionRef} className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className="space-y-8 mx-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-50px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-gray-900">
                Living
                <br />
                Room Furniture
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                Styling your living room allows you the chance to create an
                inviting space reflecting your signature style. We have a range
                of living room furniture to suit your style, whether its
                classic, contemporary or eclectic.
              </p>
            </div>

            <button className="group bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded flex items-center gap-3 transition-all duration-300 hover:gap-5">
              <span className="font-semibold text-sm uppercase tracking-wide">
                Explore All Items
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Content - Carousel */}
          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(50px)",
              transition: "all 0.8s ease-out 0.2s",
            }}
          >
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {products.map((product) => (
                  <div key={product.id} className="min-w-full">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Product Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 text-green-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{product.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-yellow-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivingShowcase;