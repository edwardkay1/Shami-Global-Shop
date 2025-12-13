import React from 'react';

// --- SHAMI GLOBAL SHOP ACCENT COLORS ---
const ACCENT_COLOR_CLASS = 'border-t-[#E91E63]'; // Hot Pink/Magenta for the spinning part
const BASE_LAYOUT_BG = 'bg-gray-50'; // Aligned with other layouts

// This is a simple, reusable loading spinner component.
// It uses Tailwind CSS for styling.
const LoadingSpinner = () => {
  return (
    // Updated background to match dashboard theme
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${BASE_LAYOUT_BG} bg-opacity-75`}>
      {/* Updated border-t color */}
      <div className={`w-16 h-16 border-4 border-t-4 border-gray-200 ${ACCENT_COLOR_CLASS} rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;