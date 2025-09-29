import React, { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  // Show button only after scrolling down
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-800 text-white py-12 px-6 relative">
      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#a86523] hover:bg-[#c88a4a] text-white rounded-full shadow-lg p-3 transition-all flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 mb-8">
          {/* Brand and Contact Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-6">WoodWise</h1>

            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>322, Batuwatta Road, Ragama</p>
                  <p>39, Godagama Road, Athurugiriya</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">H:</span>
                  <span>0117 110 084</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">M:</span>
                  <span>0778 838 939</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">M:</span>
                  <span>0773 164 404</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">M:</span>
                  <span>0778 404 039</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">W:</span>
                  <span>0774 456 602</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="font-semibold">E:</span>
                  <span>
                    <a
                      href="mailto:woodwise@example.com"
                    >
                      woodwise.services@gmail.com
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-gray-800 text-xs font-bold">T</span>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-gray-800 text-xs font-bold">♪</span>
                </div>
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">PANTRY</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Mahogany
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Teak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">LIVING</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Sofas
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Accent Chairs
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Coffee Tables
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  TV Console
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">BEDROOM</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Beds
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Wardrobe
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Mirrors
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Writing Tables
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">DINING</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Tables
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Dining Chairs
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Credenzas
                </a>
              </li>
            </ul>
          </div>

          <div>
            {/* <h3 className="text-lg font-semibold mb-4">PILLOWS</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Throw Pillows
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Pillow Inserts
                </a>
              </li>
            </ul> */}

            <h3 className="text-lg font-semibold mb-4">DECOR</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Natural Plants
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Artificial Plants
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Decorative Items
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Scented Candles
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Lamps
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Ceramic Pot
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-white transition-colors">
                  Wall Frames
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap gap-6 mb-8 text-gray-300 text-sm">
          <a  className="hover:text-white transition-colors">
            FAQs
          </a>
          <a  className="hover:text-white transition-colors">
            Warranty Policy
          </a>
          <a  className="hover:text-white transition-colors">
            Terms of Use
          </a>
          <a className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a  className="hover:text-white transition-colors">
            Refund & Delivery Policy
          </a>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © 2025 WoodWise Capital Ventures. All Rights Reserved | Powered By
            KH
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
