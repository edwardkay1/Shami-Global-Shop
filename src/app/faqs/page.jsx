'use client';
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ACCENT_TEXT_COLOR = 'text-[#E91E63]';
const ACCENT_HOVER_CLASS = 'hover:text-[#E91E63]';
const BASE_LAYOUT_BG = 'bg-gray-50';

const faqs = [
  {
    category: "How It Works",
    items: [
      {
        question: "How does Shami work?",
        answer: (
          <>
            Shami is your go-to for original products straight from Korea, Japan, Shein, Amazon, and Fashion Nova.  
            <strong>No other platform ships like we do.</strong> You browse, add to cart, and place your order directly via WhatsApp. We handle everything and deliver to your doorstep in ~2 weeks. 🚀  

          </>
        ),
      },
      {
        question: "Can I track my order?",
        answer: (
          <>
            Not yet — all orders are coordinated via WhatsApp for a personal touch. We promise fast delivery and transparent communication.
          </>
        ),
      },
      {
        question: "How do I avoid scams?",
        answer: (
          <>
            Stay safe with these tips:
            <ul className="mt-2 text-gray-700 list-disc list-inside">
              <li>Always chat through the official WhatsApp links.</li>
              <li>Never send money before confirming details with Shami.</li>
              <li>Meet in public if doing in-person exchanges.</li>
              <li>Report sketchy behavior via <a href="https://wa.me/256778997693" className={`${ACCENT_TEXT_COLOR} hover:underline`}>WhatsApp support</a>.</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    category: "Orders & Delivery",
    items: [
      {
        question: "How does shipping & payment work?",
        answer: (
          <>
            Shami delivers your order straight to your door. Payment is handled on WhatsApp directly with the seller — we recommend <strong>payment on delivery</strong> for safety.
          </>
        ),
      },
    ],
  },
  
  {
    category: "Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "Payment is arranged between buyer and seller on WhatsApp. We suggest payment on delivery for secure transactions.",
      },
      {
        question: "Is my payment info safe?",
        answer: "All payments happen directly via WhatsApp between you and the seller. Always follow safe practices.",
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-4 border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full font-medium text-left text-gray-900 focus:outline-none"
        aria-expanded={open}
        aria-controls={`${question.replace(/\s+/g, "-").toLowerCase()}-answer`}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          id={`${question.replace(/\s+/g, "-").toLowerCase()}-answer`}
          className="mt-2 leading-relaxed text-gray-700"
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  return (
    <main className={`min-h-screen p-8 font-sans ${BASE_LAYOUT_BG}`}>
      <div className="max-w-5xl p-8 mx-auto bg-white shadow-lg rounded-xl">
        <Link href="/" className={`flex items-center text-gray-600 ${ACCENT_HOVER_CLASS} transition-colors mb-6`}>
          <ArrowLeft className="mr-2" size={20} />
          <span>Back to Home</span>
        </Link>
        
        <h1 className="mb-6 text-4xl font-extrabold text-gray-900">FAQs</h1>
        <p className="max-w-xl mb-10 text-gray-600">
          Answers to your most common questions. Can’t find what you need? <a href="https://wa.me/256778997693" className={`${ACCENT_TEXT_COLOR} hover:underline`}>Chat with Shami on WhatsApp</a>.
        </p>

        {faqs.map(({ category, items }) => (
          <section key={category} className="mb-10">
            <h2 className="pb-2 mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-300">{category}</h2>
            <div>
              {items.map(({ question, answer }, idx) => (
                <FAQItem key={idx} question={question} answer={answer} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
