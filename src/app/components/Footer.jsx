import Link from "next/link";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";

// --- SHAMI GLOBAL SHOP ACCENT COLORS ---
const ACCENT_HOVER_CLASS = 'hover:text-[#E91E63]';
const BASE_LAYOUT_BG = 'bg-gray-50';

export default function Footer() {
  return (
    <footer className={`${BASE_LAYOUT_BG} p-6 text-center text-gray-500 font-sans md:px-16 lg:px-32`}>
      <div className="container max-w-2xl mx-auto space-y-6">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-[#181a1f]">Shami Global Shop</h2>
          <p>
            Shami ships original skincare, perfumes, fashion & accessories straight to Uganda — all ordered via WhatsApp!  
            You only pay for delivery to your doorstep. Fast, reliable, and 100% hassle-free.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="/help" className={ACCENT_HOVER_CLASS}>Help</Link>
          <Link href="/faqs" className={ACCENT_HOVER_CLASS}>FAQs</Link>
          <Link href="/terms" className={ACCENT_HOVER_CLASS}>Terms</Link>
          <Link href="/privacy" className={ACCENT_HOVER_CLASS}>Privacy</Link>
        </div>

        {/* Contact */}
        <div className="flex justify-center gap-6 mt-4 text-xl">
          <a
            href="https://wa.me/256778997693" 
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-500 ${ACCENT_HOVER_CLASS}`}
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://x.com/shamiglobalshop"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-500 ${ACCENT_HOVER_CLASS}`}
          >
            <FaXTwitter />
          </a>
        </div>

        {/* Developer Credit */}
        <p className="mt-4 text-xs text-gray-400">
          Developed by <strong>edwardkay1</strong> — <a href="https://edwardkay.vercel.app" className={`${ACCENT_HOVER_CLASS} underline`}>WhatsApp me</a>
        </p>

        {/* Copyright */}
        <p className="mt-2 text-xs text-gray-400">
          © {new Date().getFullYear()} Shami Global Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
