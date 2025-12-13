'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const ACCENT_HOVER_CLASS = 'hover:text-[#E91E63]'; // Hot Pink/Magenta for hover
const BASE_LAYOUT_BG = 'bg-gray-50'; // Consistent with Shami layouts

export default function PrivacyPage() {
  return (
    <main className={`min-h-screen p-8 font-sans ${BASE_LAYOUT_BG}`}>
      <div className="max-w-4xl p-6 mx-auto bg-white shadow-md rounded-xl">
        {/* Back Button */}
        <Link 
          href="/" 
          className={`flex items-center text-gray-600 ${ACCENT_HOVER_CLASS} transition-colors mb-6`}
        >
          <ArrowLeft className="mr-2" size={20} />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-3xl font-bold text-[#181a1f] mb-4">Privacy Policy</h1>
        <p className="mb-6 leading-relaxed text-gray-700">
          At Shami, your privacy is everything. This policy explains how we collect, use, and protect the info you share when you order through WhatsApp or browse our platform.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#181a1f] mb-2">1. Info We Collect</h2>
          <p className="leading-relaxed text-gray-700">
            When you message us or place an order via WhatsApp, we collect your name, contact number, delivery address, and order details. We also track interactions on our site to improve your Shami experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#181a1f] mb-2">2. How We Use Your Info</h2>
          <p className="leading-relaxed text-gray-700">
            Your info is used exclusively to process orders, arrange shipping, confirm deliveries, and provide customer support. Nothing else, promise.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#181a1f] mb-2">3. Sharing Info</h2>
          <p className="leading-relaxed text-gray-700">
            Shami never shares your personal details with third parties. All communication stays private between you and Shami — we are the only ones shipping and selling.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#181a1f] mb-2">4. Your Rights</h2>
          <p className="leading-relaxed text-gray-700">
            Ugandan residents can request access to their info, corrections, or deletion. Hit us up via WhatsApp or our support channels, and we’ll take care of it.
          </p>
        </section>
      </div>
    </main>
  );
}
