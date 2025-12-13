// src/app/components/Navbar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"; 

// --- SHAMI GLOBAL SHOP ACCENT COLORS ---
const ACCENT_TEXT_COLOR = 'text-[#E91E63]'; // Hot Pink/Magenta for text
const ACCENT_HOVER_CLASS = 'hover:text-[#E91E63]'; // Hot Pink/Magenta for link hover
const ACCENT_BG_COLOR = 'bg-[#E91E63]'; // Hot Pink/Magenta for buttons
const ACCENT_HOVER_BG = 'hover:bg-[#C2185B]'; // Darker Pink for button hover
const ACCENT_LIGHT_BG = 'hover:bg-pink-50'; // Very light pink for mobile hover

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState(""); // Search term is now handled in HomePage

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center flex-shrink-0 space-x-2">
        {/* Ensure /assets/images/one.jpg exists or replace with your image path */}
        <Image
                  src="/assets/images/one.jpg"
                  alt="Order steps" width={40} height={40} />
        {/* Updated Logo Text Color */}
        <span className={`text-xl font-bold ${ACCENT_TEXT_COLOR}`}>ShopLink</span>
      </Link>

      {/* Desktop Menu & Cart (grouped together and pushed to the right) */}
      <div className="items-center hidden space-x-6 md:flex">
        {/* Updated Hover Colors */}
        <Link href="/" className={`text-gray-700 transition-colors duration-200 ${ACCENT_HOVER_CLASS}`}>Home</Link>
        <Link href="/about" className={`text-gray-700 transition-colors duration-200 ${ACCENT_HOVER_CLASS}`}>About</Link>
        <Link href="/shop" className={`text-gray-700 transition-colors duration-200 ${ACCENT_HOVER_CLASS}`}>Shop</Link>
        <Link href="/categories" className={`text-gray-700 transition-colors duration-200 ${ACCENT_HOVER_CLASS}`}>Categories</Link>


        {/* Cart Icon for Desktop */}
        <Link href="/cart" className="relative ml-4">
          {/* Updated Cart Icon Hover Color */}
          <FontAwesomeIcon icon={faShoppingCart} className={`text-xl text-gray-700 transition-colors duration-200 ${ACCENT_HOVER_CLASS}`} />
          <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-600 rounded-full -top-2 -right-2">
            3
          </span>
        </Link>

        {/* Updated Seller Button Style */}
        <Link 
          href="/auth" 
          className={`px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ${ACCENT_BG_COLOR} rounded-lg shadow-md ${ACCENT_HOVER_BG}`}
        >
          Become a Seller
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="flex items-center md:hidden">
        {/* Updated Hamburger Hover Color */}
        <button onClick={toggleMenu} className={`text-gray-700 ${ACCENT_HOVER_CLASS}`}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="absolute left-0 right-0 flex flex-col items-start p-4 space-y-4 bg-white border-t border-gray-100 shadow-lg top-16 md:hidden">
          {/* Updated Mobile Link Hover Colors */}
          <Link href="/" className={`w-full px-3 py-2 text-lg text-gray-800 transition-colors duration-200 rounded-md ${ACCENT_HOVER_CLASS} ${ACCENT_LIGHT_BG}`}>Home</Link>
          <Link href="/shop" className={`w-full px-3 py-2 text-lg text-gray-800 transition-colors duration-200 rounded-md ${ACCENT_HOVER_CLASS} ${ACCENT_LIGHT_BG}`}>Shop</Link>
          <Link href="/categories" className={`w-full px-3 py-2 text-lg text-gray-800 transition-colors duration-200 rounded-md ${ACCENT_HOVER_CLASS} ${ACCENT_LIGHT_BG}`}>Categories</Link>
          <Link href="/about" className={`w-full px-3 py-2 text-lg text-gray-800 transition-colors duration-200 rounded-md ${ACCENT_HOVER_CLASS} ${ACCENT_LIGHT_BG}`}>About</Link>
          
          {/* Updated Mobile Seller Button Style (Border and Text) */}
          <Link 
            href="/sell" 
            className={`w-full px-4 py-2 font-semibold text-center ${ACCENT_TEXT_COLOR} transition-colors duration-200 border border-[#E91E63] rounded-lg ${ACCENT_LIGHT_BG}`}
          >
            Become a Seller
          </Link>

          {/* Updated Mobile Sign In Link */}
          <Link href="/login" className={`w-full px-3 py-2 text-lg font-semibold ${ACCENT_TEXT_COLOR} transition-colors duration-200 rounded-md hover:text-[#C2185B] ${ACCENT_LIGHT_BG}`}>Sign In</Link>
        </div>
      )}
    </nav>
  );
}