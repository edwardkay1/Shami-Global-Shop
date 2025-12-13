"use client";

import { useEffect } from "react";

// --- SHAMI GLOBAL SHOP ACCENT COLORS ---
const ACCENT_HOVER_CLASS = 'hover:text-[#E91E63]'; // Hot Pink/Magenta for hover

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-4 bg-white shadow-xl rounded-xl">
        <button
          onClick={onClose}
          // Updated hover class for the close button
          className={`absolute text-gray-500 top-2 right-2 ${ACCENT_HOVER_CLASS}`}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}