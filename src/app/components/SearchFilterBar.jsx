"use client";
import { useState } from "react";

// --- SHAMI GLOBAL SHOP ACCENT COLORS ---
const ACCENT_COLOR_CLASS = 'bg-[#E91E63]'; // Hot Pink/Magenta
const ACCENT_HOVER_CLASS = 'hover:bg-[#C2185B]'; // Darker Pink for hover
const ACCENT_RING_COLOR = 'focus:ring-[#E91E63]';
const ACCENT_LIGHT_HOVER = 'hover:bg-pink-100'; // Light pink for hover on inactive button

const categories = ["Phones", "Clothes", "Electronics", "Shoes", "Groceries", "Others"];

export default function SearchFilterBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="w-full px-4 py-3 bg-gray-100 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        {/* Category buttons - hidden on small screens */}
        <div className="flex-wrap hidden gap-2 md:flex">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full border text-sm transition-colors duration-150 ${
                selectedCategory === cat
                  ? `${ACCENT_COLOR_CLASS} text-white border-transparent ${ACCENT_HOVER_CLASS}` // Active state
                  : `bg-white text-gray-700 hover:border-gray-300 ${ACCENT_LIGHT_HOVER}` // Inactive state
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input - always visible */}
        {/* Updated focus ring color */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products, color, categories..."
          className={`flex-1 min-w-[200px] px-3 py-1 border rounded focus:outline-none focus:ring-2 ${ACCENT_RING_COLOR}`}
        />
      </div>
    </div>
  );
}