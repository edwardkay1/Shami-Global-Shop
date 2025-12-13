import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// --- SHAMI GLOBAL SHOP ACCENT COLOR ---
const ACCENT_COLOR_CLASS = 'text-[#E91E63]'; 
const ACCENT_HOVER_CLASS = 'hover:text-[#C2185B]'; 

export default function TermsPage() {
  return (
    <main className="min-h-screen p-8 font-sans bg-gray-50">
      <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-xl">
        {/* Back Button */}
        <Link 
          href="/" 
          className={`flex items-center text-gray-600 ${ACCENT_HOVER_CLASS} transition-colors mb-6`}
        >
          <ArrowLeft className="mr-2" size={20} />
          <span>Back to Home</span>
        </Link>
        
        {/* Title */}
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900">
          Shami Marketplace – Terms & Conditions
        </h1>
        <p className="mb-8 leading-relaxed text-gray-700">
          Welcome to Shami! Before you place an order or refer a friend, check out these terms — they explain how we operate and what we expect from our Shami fam.
        </p>

        <section className="mb-6">
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">1. Ordering with Shami</h2>
          <p className="leading-relaxed text-gray-700">
            Shami is the only seller and shipper. All orders are placed directly via WhatsApp. By ordering, you agree to follow these terms. If not, you can’t place an order — simple as that.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">2. Your Info & Accuracy</h2>
          <p className="leading-relaxed text-gray-700">
            Make sure your contact info, delivery address, and order details are correct. Any mistakes may cause delays, and Shami is not responsible for wrong info provided by users.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">3. Products & Shipping</h2>
          <p className="leading-relaxed text-gray-700">
            Shami ships original skincare products from Korea & Japan, fashion items from Shein, Amazon, Fashion Nova, and authentic perfumes from abroad. Delivery is free to your doorstep in Uganda, usually within two weeks after order confirmation via WhatsApp.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">4. Payments & Discounts</h2>
          <p className="leading-relaxed text-gray-700">
            Payments are handled directly with Shami via the agreed method on WhatsApp. 
            Refer a friend and get 20% off your next order — because sharing is caring!
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">5. Liability</h2>
          <p className="leading-relaxed text-gray-700">
            Shami guarantees product authenticity but is not responsible for delays caused by external factors like shipping or customs. Once the order is confirmed and shipped, all risk passes to the recipient.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">6. Updates</h2>
          <p className="leading-relaxed text-gray-700">
            Terms may be updated from time to time. Using Shami after changes means you agree to the new rules.
          </p>
        </section>
      </div>
    </main>
  );
}
