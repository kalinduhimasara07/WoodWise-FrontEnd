import React, { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Package,
  Layers,
  Home,
  Contact,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gradient-to-br from-[#f5e9da] via-[#e7d3bc] to-[#cbb08c] text-[#2c1a0f] pt-12 pb-6 px-4 relative">
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & About */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#a86523] font-poppins tracking-tight">
              WoodWise
            </span>
          </div>
          <p className="text-sm text-[#5c4322] leading-relaxed">
            WoodWise is your trusted partner for premium timber, furniture, and
            millwork solutions. We blend craftsmanship and technology to deliver
            quality products for homes and businesses across Sri Lanka.
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="#"
              className="w-9 h-9 bg-[#a86523] rounded-full flex items-center justify-center hover:bg-[#c88a4a] transition-colors"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-[#a86523] rounded-full flex items-center justify-center hover:bg-[#c88a4a] transition-colors"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-[#a86523] rounded-full flex items-center justify-center hover:bg-[#c88a4a] transition-colors"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#a86523] mb-3">
            Contact Us
          </h3>
          <ul className="space-y-3 text-[#5c4322] text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span> H: 011 224 9108</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span> M: 077 418 7068</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:woodwise.services@gmail.com"
                className="hover:underline"
              >
                woodwise.services@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>No 322, School Road, Batuwatta, Ragama, Sri Lanka.</span>
            </li>
          </ul>
        </div>

        {/* Main Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#a86523] mb-3">Explore</h3>
          <ul className="space-y-3 text-[#5c4322] text-sm">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 hover:text-[#a86523] transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/furniture"
                className="flex items-center gap-2 hover:text-[#a86523] transition-colors"
              >
                <Package className="w-4 h-4" />
                Furniture
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                className="flex items-center gap-2 hover:text-[#a86523] transition-colors"
              >
                <Layers className="w-4 h-4" />
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="flex items-center gap-2 hover:text-[#a86523] transition-colors"
              >
                <Info className="w-4 h-4" />
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contactus"
                className="flex items-center gap-2 hover:text-[#a86523] transition-colors"
              >
                <Contact className="w-4 h-4" />
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us / Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold text-[#a86523] mb-3">
            About & Hours
          </h3>
          <p className="text-sm text-[#5c4322] mb-3">
            <span className="font-semibold">Open Hours:</span>
            <br />
            Mon - Fri: 8:30 AM - 6:00 PM
            <br />
            Sat: 8:30 AM - 2:00 PM
            <br />
            Sun & Poya: Closed
          </p>
          <p className="text-sm text-[#5c4322]">
            <span className="font-semibold">Registered Business:</span>
            <br />
            Jayasiri Furniture (Pvt) Ltd,
            <br />
            Reg. No: PV00234567
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-[#5c4322] text-xs">
        © 2025 WoodWise. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
