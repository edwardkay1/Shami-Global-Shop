'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// --- SHAMI GLOBAL SHOP THEME CONFIGURATION (Hot Pink/Magenta) ---
const PRIMARY_COLOR = '#E91E63'; // Hot Pink/Magenta
const PRIMARY_TEXT_COLOR = 'text-gray-800'; // Dark text for primary elements
const BASE_BG = 'bg-white';
const BODY_BG = 'bg-[#f0f2f5]'; // Light background color for the page

export default function AboutPage() {
  return (
    // Apply consistent body background
    <main className={`min-h-screen p-8 font-sans ${BODY_BG}`}>
      <div className={`max-w-4xl p-6 mx-auto ${BASE_BG} shadow-md rounded-xl`}>
        {/* Back Button - Themed hover color */}
        <Link 
            href="/" 
            className={`flex items-center text-gray-600 hover:text-[${PRIMARY_COLOR}] transition-colors mb-6`}
            style={{ '--tw-hover-text-color': PRIMARY_COLOR }} // Inline style for guaranteed arbitrary value
        >
          <ArrowLeft className="mr-2" size={20} />
          <span>Back to Home</span>
        </Link>
        
        {/* Heading 1 - Themed text color */}
        <h1 className={`text-3xl font-bold ${PRIMARY_TEXT_COLOR} mb-4`}>About Us</h1>

        <section className="mb-8">
          {/* Heading 2 - Themed text color */}
          <h2 className={`text-2xl font-semibold ${PRIMARY_TEXT_COLOR} mb-2`}>Our Mission</h2>
          <p className="leading-relaxed text-gray-700">
            Our mission is to create a trusted and accessible online marketplace where
            everyone can easily buy and sell products directly within their community.  
            We empower sellers to grow their businesses and help buyers find what they need
            conveniently and securely.
          </p>
        </section>

        <section className="mb-8">
          {/* Heading 2 - Themed text color */}
          <h2 className={`text-2xl font-semibold ${PRIMARY_TEXT_COLOR} mb-2`}>Our Vision</h2>
          <p className="leading-relaxed text-gray-700">
            We envision a future where local commerce thrives online — connecting buyers and
            sellers through simple, transparent communication and trustworthy transactions.
            By leveraging technology and direct negotiation via WhatsApp, we aim to build a
            marketplace that feels personal and secure.
          </p>
        </section>

        <section>
          {/* Heading 2 - Themed text color */}
          <h2 className={`text-2xl font-semibold ${PRIMARY_TEXT_COLOR} mb-2`}>Our Story</h2>
          <p className="leading-relaxed text-gray-700">
            Founded with the goal to simplify online buying and selling, our platform bridges
            the gap between traditional local trade and modern e-commerce.  
            We started as a small community initiative and have grown into a platform that
            values trust, transparency, and the power of direct communication.
          </p>
        </section>
        
      </div>
    </main>
  );
}