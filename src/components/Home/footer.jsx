import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-12 px-6">
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
                      woodwise@example.com
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-gray-800 text-xs font-bold">T</span>
                </div>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
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
                <a href="#" className="hover:text-white transition-colors">
                  Mahogany
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Teak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">LIVING</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sofas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accent Chairs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Coffee Tables
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  TV Console
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">BEDROOM</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Beds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Wardrobe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mirrors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Writing Tables
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">DINING</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tables
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Dining Chairs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Credenzas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">PILLOWS</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Throw Pillows
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pillow Inserts
                </a>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4 mt-6">DECOR</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Natural Plants
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Artificial Plants
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Decorative Items
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Scented Candles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Lamps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Ceramic Pot
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Wall Frames
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap gap-6 mb-8 text-gray-300 text-sm">
          <a href="#" className="hover:text-white transition-colors">
            FAQs
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Warranty Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Use
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
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

        {/* Scroll to Top Button */}
        <div className="fixed bottom-6 right-6">
          <button className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>

        {/* Chat Widget */}
        <div className="fixed bottom-6 right-24">
          <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
