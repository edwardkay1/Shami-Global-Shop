'use client';

import { useState, useEffect } from "react";
import { useCart } from "../providers/CartProvider";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, X } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

// --- SHAMI GLOBAL SHOP THEME CONFIGURATION (Hot Pink/Magenta) ---
const PRIMARY_COLOR = '#E91E63'; // Hot Pink/Magenta
const PRIMARY_COLOR_HOVER = '#C2185B'; // Darker Pink for hover
const PRIMARY_COLOR_RING = '#FF4081'; // Lighter Pink for focus ring

const ACCENT_COLOR_CLASS = 'bg-[' + PRIMARY_COLOR + ']';
const ACCENT_HOVER_CLASS = 'hover:bg-[' + PRIMARY_COLOR_HOVER + ']';
const ACCENT_RING_CLASS = 'focus:ring-[' + PRIMARY_COLOR_RING + ']';

const PRIMARY_TEXT_CLASS = 'text-gray-800'; // Standard text is dark gray/black
const BASE_BG = 'bg-white';
const BODY_BG = 'bg-[#f0f2f5]'; // Light background color for the page

const DEFAULT_IMAGE_URL = "https://placehold.co/400x400/E8F5E9/1E8449?text=No+Image";

export default function CartPage() {
  const { cartItems, removeItem, updateQuantity } = useCart();
  const [sellersData, setSellersData] = useState({});
  const [isLoadingSellers, setIsLoadingSellers] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch seller data from Firestore based on unique seller IDs in the cart
  useEffect(() => {
    if (cartItems.length === 0) {
      setIsLoadingSellers(false);
      setSellersData({});
      return;
    }

    const uniqueSellerIds = [...new Set(cartItems.map(item => item.sellerId))];
    
    if (uniqueSellerIds.length === 0) {
      setIsLoadingSellers(false);
      return;
    }

    const fetchSellers = async () => {
      try {
        const sellersCollectionRef = collection(db, "sellers");
        const q = query(sellersCollectionRef, where("uid", "in", uniqueSellerIds));
        
        const snapshot = await getDocs(q);
        const fetchedSellers = {};
        snapshot.forEach(doc => {
          fetchedSellers[doc.data().uid] = doc.data();
        });
        setSellersData(fetchedSellers);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      } finally {
        setIsLoadingSellers(false);
      }
    };

    fetchSellers();
  }, [cartItems]);

  // Function to display the toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Hide the toast after 3 seconds
  };

  // Group cart items by seller ID
  const groupedItems = cartItems.reduce((acc, item) => {
    (acc[item.sellerId] = acc[item.sellerId] || []).push(item);
    return acc;
  }, {});

  const totalCartValue = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Function to generate the simplified WhatsApp order link for a specific seller
  const generateWhatsAppLink = (shopItems, sellerId) => {
    const seller = sellersData[sellerId];
    const whatsappNumber = seller?.whatsapp || '256XXXXXXXXX'; // Use a Uganda prefix placeholder
    const whatsappStoreName = seller?.storeName || 'Unknown Store';
    
    let message = `Hello ${whatsappStoreName}, I would like to order the following items:\n\n`;
    
    let subtotal = 0;
    shopItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      // Note: Removed delivery details since the input section was removed
      message += `- ${item.name} (x${item.quantity}) - UGX ${itemTotal.toLocaleString()}\n`;
    });

    message += `\nTotal for this order: UGX ${subtotal.toLocaleString()}\n`;
    message += `\nPlease provide delivery instructions/details.`; // Prompt user for missing info

    return `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;
  };
  
  // Handler for the individual "Order from" buttons
  const handleOrderClick = (shopItems, sellerId) => {
    const whatsappLink = generateWhatsAppLink(shopItems, sellerId);
    window.open(whatsappLink, '_blank');
  };

  if (isLoadingSellers) {
    return (
      <div className={`min-h-screen p-6 ${BODY_BG} font-sans flex items-center justify-center`}>
        <p className="text-xl font-medium text-gray-600">Loading cart details...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${BODY_BG} font-sans`}>
      {/* Toast Notification (Themed) */}
      {toastMessage && (
        <div className={`fixed z-50 px-6 py-3 text-white transition-all duration-300 ease-in-out transform -translate-x-1/2 ${ACCENT_COLOR_CLASS} rounded-full shadow-lg top-5 left-1/2 animate-fade-in-down`}>
          {toastMessage}
        </div>
      )}
      
      <style jsx global>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
        /* Custom colors for Tailwind JIT compatibility */
        .${ACCENT_COLOR_CLASS} { background-color: ${PRIMARY_COLOR}; }
        .${ACCENT_HOVER_CLASS}:hover { background-color: ${PRIMARY_COLOR_HOVER}; }
        .focus\\:${ACCENT_RING_CLASS}:focus { --tw-ring-color: ${PRIMARY_COLOR_RING}; }
        /* Note: Tailwind JIT often fails with string interpolation for arbitrary values, 
           so we use inline style or the defined classnames where possible. 
           For this specific component structure, inline background styles will be 
           used on the Grand Total for guaranteed rendering. */
      `}</style>

      <div className="container max-w-2xl mx-auto">
        {/* Header - Themed */}
        <div className="flex items-center justify-between py-2 mb-8">
          <Link href="/" className="flex items-center text-gray-800">
            <div className={`flex items-center justify-center w-10 h-10 mr-4 ${BASE_BG} shadow-md rounded-xl hover:shadow-lg transition-shadow`}>
              <ArrowLeft className="w-6 h-6" />
            </div>
          </Link>
          <h1 className={`flex-grow text-2xl font-bold text-center ${PRIMARY_TEXT_CLASS} md:text-3xl`}>
            Your Cart
          </h1>
          <div className={`flex items-center justify-center w-10 h-10 ml-4 ${BASE_BG} shadow-md rounded-xl`}>
            {/* Themed cart icon */}
            <ShoppingCart className={`w-6 h-6 text-[${PRIMARY_COLOR}]`} style={{ color: PRIMARY_COLOR }} />
          </div>
        </div>
        
        {Object.keys(groupedItems).length === 0 ? (
          /* Empty Cart State - Themed */
          <div className={`p-12 text-center ${BASE_BG} shadow-xl rounded-3xl`}>
            <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-gray-400" />
            <p className="mb-6 text-xl font-medium text-gray-500">
              Your shopping cart is empty.
            </p>
            <Link
              href="/"
              className={`inline-block px-8 py-3 text-sm font-bold text-white transition-all ${ACCENT_COLOR_CLASS} ${ACCENT_HOVER_CLASS} rounded-full shadow-lg`}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div>
            {Object.keys(groupedItems).map((sellerId) => {
              const shopItems = groupedItems[sellerId];
              const seller = sellersData[sellerId] || { storeName: "Unknown Store", whatsapp: "" };
              const shopSubtotal = shopItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              );
              return (
                <div key={sellerId} className={`p-5 mb-6 ${BASE_BG} shadow-xl rounded-2xl`}>
                  <h2 className={`pb-3 mb-4 text-lg font-bold ${PRIMARY_TEXT_CLASS} border-b border-gray-100`}>
                    Seller: {seller.storeName}
                  </h2>
                  <ul className="divide-y divide-gray-100">
                    {shopItems.map((item) => (
                      <li key={item.id} className="flex items-center justify-between py-4">
                        {/* Item Details */}
                        <div className="flex items-start flex-grow mr-4">
                          <div className="relative flex-shrink-0 w-16 h-16 mr-3 rounded-lg">
                            <Image
                              src={item.image || DEFAULT_IMAGE_URL}
                              alt={item.name}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className={`text-base font-semibold ${PRIMARY_TEXT_CLASS} line-clamp-2`}>
                              {item.name}
                            </h3>
                            <p className="mt-0.5 text-sm font-medium text-gray-500">
                              UGX {item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center flex-shrink-0 space-x-3">
                           {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="flex items-center justify-center w-8 h-8 text-gray-700 transition-colors rounded-l-lg hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className={`w-6 text-sm font-semibold text-center ${PRIMARY_TEXT_CLASS}`}>
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="flex items-center justify-center w-8 h-8 text-gray-700 transition-colors rounded-r-lg hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                                onClick={() => removeItem(item.id)}
                                className="p-1 text-red-500 transition-colors rounded-full hover:text-red-700 hover:bg-red-50"
                                title="Remove Item"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Subtotal and Order Button */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-700">Subtotal:</p>
                    <p className={`text-lg font-bold ${PRIMARY_TEXT_CLASS}`}>UGX {shopSubtotal.toLocaleString()}</p>
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => handleOrderClick(shopItems, sellerId)}
                      className={`inline-block px-6 py-3 text-sm font-bold text-white transition-all ${ACCENT_COLOR_CLASS} ${ACCENT_HOVER_CLASS} rounded-full shadow-md hover:shadow-lg`}
                    >
                      Order from {seller.storeName}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Grand Total - Themed (Inline style used for guaranteed color application) */}
            <div className={`flex items-center justify-between p-5 mt-6 ${BASE_BG} shadow-xl rounded-2xl`}>
              <h2 className={`text-xl font-bold ${PRIMARY_TEXT_CLASS}`}>Grand Total</h2>
              <p 
                className={`text-2xl font-extrabold text-white p-1 rounded-lg`}
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                UGX {totalCartValue.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}