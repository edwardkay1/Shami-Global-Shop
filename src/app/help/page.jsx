'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// --- SHAMI GLOBAL SHOP ACCENT COLORS ---
const ACCENT_TEXT_COLOR = 'text-[#E91E63]'; // Hot Pink/Magenta for text
const ACCENT_HOVER_CLASS = 'hover:text-[#E91E63]';
const BASE_LAYOUT_BG = 'bg-gray-50';

export default function HelpPage() {
  return (
    <main className={`min-h-screen p-8 font-sans ${BASE_LAYOUT_BG}`}>
      <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-xl">
        {/* Back Button */}
        <Link 
          href="/" 
          className={`flex items-center text-gray-600 ${ACCENT_HOVER_CLASS} transition-colors mb-6`}
        >
          <ArrowLeft className="mr-2" size={20} />
          <span>Back to Home</span>
        </Link>
        
        <h1 className="mb-6 text-4xl font-extrabold text-[#181a1f]">Help & Support</h1>
        <p className="mb-8 leading-relaxed text-gray-700">
          Got questions? We got you! Browse our FAQs, check how it works, or reach out directly on WhatsApp — we ship straight to your door.
        </p>

        {/* Quick Links */}
        <section className="mb-12">
          <h2 className="pb-2 mb-4 text-2xl font-semibold text-[#181a1f] border-b border-gray-300">
            Quick Links
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>
              <Link href="/faqs" className={`${ACCENT_TEXT_COLOR} hover:underline`}>
                FAQs – Your Quick Answers
              </Link>
            </li>
            <li>
              <Link href="/faqs" className={`${ACCENT_TEXT_COLOR} hover:underline`}>
                How Shami Works
              </Link>
            </li>
            <li>
              <Link href="/terms" className={`${ACCENT_TEXT_COLOR} hover:underline`}>
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={`${ACCENT_TEXT_COLOR} hover:underline`}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="pb-2 mb-4 text-2xl font-semibold text-[#181a1f] border-b border-gray-300">
            Still Need Help?
          </h2>
          <p className="mb-4 text-gray-700">
            Can’t find what you’re looking for? No stress. Hit us up directly on WhatsApp and we’ll sort you out ASAP.
          </p>
          <address className="space-y-2 not-italic text-gray-700">
            <div>
              WhatsApp: <a 
                href="https://wa.me/256778997693" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${ACCENT_TEXT_COLOR} hover:underline`}
              >
                Chat with Shami
              </a>
            </div>
          </address>
        </section>
      </div>
    </main>
  );
}
