import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

// --- SHAMI GLOBAL SHOP ACCENT COLORS ---
const ACCENT_HOVER_CLASS = 'hover:text-[#E91E63]'; // Hot Pink/Magenta for hover
const BASE_LAYOUT_BG = 'bg-gray-50'; // Aligned with other layouts

export default function Footer() {
  return (
    // Updated background to match theme
    <footer className={`${BASE_LAYOUT_BG} p-6 text-center text-gray-500 font-sans md:px-16 lg:px-32`}>
      <div className="container max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-[#181a1f]">Shami Global Shop</h2>
            <p>Your campus essentials, delivered faster — and now, students can sell too!
               Connecting buyers and sellers around Uganda. Shami Global Shop</p>


          </div>

          {/* Links - Updated Hover Colors */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link href="/help" className={ACCENT_HOVER_CLASS}>Help</Link>
            <Link href="/faqs" className={ACCENT_HOVER_CLASS}>FAQs</Link>
            <Link href="/terms" className={ACCENT_HOVER_CLASS}>Terms</Link>
            <Link href="/privacy" className={ACCENT_HOVER_CLASS}>Privacy</Link>
          </div>

          {/* Contact - Updated Hover Colors */}
          <div className="flex justify-center gap-6 mt-4 text-xl">
            <a
              href="https://whatsapp.com/channel/0029VbBL5lUDTkJup86yPr3w" // Replace with actual WhatsApp business number
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-500 ${ACCENT_HOVER_CLASS}`}
            >
              <FaWhatsapp />
            </a>
            
            
            <a
              href="https://x.com/NkoziMart" // Replace with your real X (Twitter) handle
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-500 ${ACCENT_HOVER_CLASS}`}
            >
              <FaXTwitter />
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-8 text-xs text-gray-400">
            © {new Date().getFullYear()} Shami Global Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}