'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// --- Cleaned Imports ---
import { Menu, Search, ShoppingCart, Home, User, Heart, Star, ChevronLeft, ChevronRight, Plus, X } from "lucide-react"; 
import { useCart } from "./providers/CartProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase/config.js";

// --- TEMPORARY UI/UX CONFIGURATION ---
const ACCENT_COLOR = 'bg-[#ffc600]'; 
const ACCENT_TEXT_COLOR = 'text-black';
const PRIMARY_COLOR = 'bg-black'; 
const BASE_BG = 'bg-white';
const BODY_BG = 'bg-gray-100'; 

// Updated list of categories with 'All' first
const categories = [
  "All", 
  "Lifestyle",
  "Basketball",
  "Running",
  "Fashion & Apparel",
  "Electronics",
  "Groceries",
  "Home & Kitchen",
  "Other",
];

// Banner data for the two specified slides
const dynamicBanners = [
  { 
    id: 1, 
    title: "🎄 Christmas Mega Sale! 🎁", 
    discount: "Up to 60% OFF", 
    buttonText: "Shop Holiday Deals", 
    img: "/assets/images/xmas2.jpeg", 
    bgColor: "from-red-600 to-red-500", 
  },
  { 
    id: 2, 
    title: "New Year, New Gear! ✨", 
    discount: "Electronics Drop", 
    buttonText: "See Gadgets", 
    img: "/assets/images/xmas2.jpeg", 
    bgColor: "from-blue-700 to-blue-500", 
  },
];

// Helper functions (kept for functionality)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const formatPrice = (price) => {
  return `UGX ${price.toLocaleString()}`;
};


// --- CARD COMPONENT (Kept unchanged) ---
const ProductCard = ({ item, seller, addToCart }) => {
    const mainName = item.name || "Product Name";
    const subName = item.category || "Men's Shoes";
    
    const RatingStars = () => (
        <div className="flex my-1 text-xs text-yellow-500">
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" className="opacity-50" />
            <Star size={12} className="text-gray-300" />
        </div>
    );
    
    return (
        <div
            key={item.id}
            className="flex flex-col p-2.5 transition-shadow duration-300 bg-white rounded-3xl shadow-lg hover:shadow-xl"
        >
            <div className="relative w-full h-40 mb-2 overflow-hidden rounded-2xl">
                <Image
                    src={item.image || "https://placehold.co/400x400/E5E7EB/4B5563?text=Product"}
                    alt={mainName}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-2xl"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority
                />
            </div>
            
            <p className="text-xs text-gray-500 line-clamp-1">{subName}</p>
            <p className="mb-1 text-sm font-semibold text-gray-900 line-clamp-2">
                {mainName}
            </p>
            
            <RatingStars /> 
            
            <div className="flex items-center justify-between pt-2 mt-auto">
                <p className="text-sm font-bold text-gray-800">
                    {formatPrice(item.price || 0)}
                </p>
                <button
                    onClick={() => addToCart(item)}
                    className={`p-1.5 text-white transition-colors ${PRIMARY_COLOR} rounded-lg shadow-sm hover:bg-gray-800`}
                    title="Add to Cart"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};


// --- MAIN HOME PAGE COMPONENT ---
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { cartItems, addToCart } = useCart();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [sortOption, setSortOption] = useState("Latest"); 
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0); 
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState({});
  const categoryScrollRef = useRef(null);
  const searchInputRef = useRef(null); // Ref for the search input

  // --- NEW: Handle Mobile Search Click ---
  const handleMobileSearchClick = () => {
    // 1. Focus the search input field
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    // 2. Optional: Scroll to the top if the search bar might be off-screen
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  // ----------------------------------------

  // Auto-scroll banners (5 seconds interval)
  useEffect(() => {
    if (dynamicBanners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === dynamicBanners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [dynamicBanners.length]);

  const goToNextBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === dynamicBanners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? dynamicBanners.length - 1 : prevIndex - 1
    );
  };

  // Scroll to the selected category (Improved for better centering)
  useEffect(() => {
    if (categoryScrollRef.current) {
      const selectedElement = Array.from(categoryScrollRef.current.children).find(
        (child) => child.dataset.category === selectedCategory
      );
      if (selectedElement) {
        const containerWidth = categoryScrollRef.current.offsetWidth;
        const elementWidth = selectedElement.offsetWidth;
        const elementOffset = selectedElement.offsetLeft;
        
        const scrollPosition = elementOffset - (containerWidth / 2) + (elementWidth / 2);

        categoryScrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [selectedCategory]);

  // Fetch products and sellers from Firestore (Original logic preserved)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsQuery = query(collection(db, "products"));
        const productsSnapshot = await getDocs(productsQuery);
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          price: doc.data().price || 15000, 
          category: doc.data().category || categories[Math.floor(Math.random() * categories.length)],
        }));
        
        setProducts(shuffleArray(productsList));
        
        // Fetch Sellers logic 
        const sellerIds = [...new Set(productsList.map(p => p.sellerId))];
        const sellersMap = {};
        if (sellerIds.length > 0) {
            const sellersQuery = query(collection(db, "sellers"), where("uid", "in", sellerIds));
            const sellersSnapshot = await getDocs(sellersQuery);
            sellersSnapshot.forEach(doc => { sellersMap[doc.data().uid] = doc.data(); });
        }
        setSellers(sellersMap);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter and Sort Logic 
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory; 
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = 
      !searchTerm || 
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      (sellers[product.sellerId]?.storeName.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (product.color && product.color.toLowerCase().includes(lowerCaseSearchTerm));
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Latest":
      default:
        return b.id.localeCompare(a.id); 
    }
  });

  // --- UI IMPLEMENTATION STARTS HERE ---

  return (
    <main className={`min-h-screen pb-24 ${BODY_BG} font-sans`}>
      {/* -------------------- 1. TOP NAV BAR (STATIONARY) -------------------- */}
      <nav className={`sticky top-0 z-50 flex items-center p-4 ${BASE_BG} shadow-sm md:shadow-md`}>
        
        {/* Left Section (Menu Icon / Logo) */}
        <div className="flex items-center flex-shrink-0 space-x-2">
            <button
              onClick={toggleMenu}
              className={`flex items-center justify-center w-8 h-8 text-black rounded-lg transition-colors md:hidden`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
             {/* Logo/Title for Desktop or if no menu icon needed */}
            <Link href="/" className="hidden text-xl font-bold text-gray-800 md:block">Nkozi Mart</Link>
        </div>
        
        {/* Center Section (Search Bar - Responsive) */}
        <div className="flex-grow mx-3 md:mx-auto md:w-full md:max-w-xl">
            <div className="relative">
              <input
                ref={searchInputRef} // Attaching ref here
                type="text"
                placeholder="Search products, sellers, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300 ${BASE_BG} md:py-3 md:pl-12 md:text-base`}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400 md:w-5 md:h-5" />
              </div>
            </div>
        </div>
        
        {/* Right Section (Cart Icon) */}
        <Link href="/cart" className="relative flex-shrink-0 ml-2">
            <div className={`flex items-center justify-center w-8 h-8 text-black rounded-lg md:w-10 md:h-10 md:bg-gray-100 md:shadow-sm`}>
              <ShoppingCart size={24} />
            </div>
            {cartItems.length > 0 && (
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1 md:w-5 md:h-5">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
        </Link>

        {/* Mobile Menu Dropdown (Kept unchanged) */}
        {menuOpen && (
          <div className={`absolute left-0 right-0 flex flex-col items-start p-4 space-y-2 ${BASE_BG} border-t border-gray-100 shadow-lg top-16 md:hidden`}>
            <Link href="/about" className="w-full px-3 py-2 text-lg text-gray-800 transition-colors duration-200 rounded-md hover:text-black hover:bg-gray-50">About</Link>
            <Link href="/auth?mode=register" className={`w-full px-3 py-2 text-lg font-semibold text-white transition-colors duration-200 ${PRIMARY_COLOR} rounded-md shadow-md text-center`}>Become a Seller</Link>
            <Link href="/auth?mode=login" className="w-full px-3 py-2 text-lg font-semibold text-gray-800 transition-colors duration-200 rounded-md hover:text-black hover:bg-gray-50">Sign In</Link>
          </div>
        )}
      </nav>

      <div className="px-4 pt-6 mx-auto max-w-7xl">
        
        {/* -------------------- 2. BANNER SLIDER -------------------- */}
        <div className="relative w-full h-40 mb-8 overflow-hidden shadow-xl rounded-2xl md:h-56">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
          >
            {dynamicBanners.map((banner) => (
              <div
                key={banner.id}
                className={`flex-shrink-0 w-full h-full bg-gradient-to-r ${banner.bgColor} flex items-center p-4 md:p-6`}
              >
                {/* Text Content */}
                <div className="relative z-10 w-2/3">
                    <h1 className="text-xl font-bold text-white md:text-3xl">
                        {banner.title}
                    </h1>
                    <p className={`text-3xl font-extrabold ${ACCENT_TEXT_COLOR} mt-1 mb-3 bg-white px-2 py-0.5 rounded-lg inline-block shadow-sm md:text-4xl`}>
                        {banner.discount}
                    </p>
                    <button 
                        className={`px-6 py-2 text-sm font-semibold ${ACCENT_TEXT_COLOR} transition-colors ${BASE_BG} rounded-full shadow-lg hover:bg-gray-200`}
                    >
                        {banner.buttonText}
                    </button>
                </div>
                
                {/* Image */}
                <div className="relative z-10 w-1/3 h-full">
                    <Image
                        src={banner.img}
                        alt={banner.title}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="transform scale-150 translate-x-10 translate-y-2 drop-shadow-2xl"
                        sizes="(max-width: 768px) 33vw, 15vw"
                        priority
                    />
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={goToPreviousBanner}
            className="absolute p-2 text-gray-700 transition-colors -translate-y-1/2 bg-white rounded-full shadow-md left-2 top-1/2 bg-opacity-70 hover:bg-opacity-90"
            aria-label="Previous banner"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextBanner}
            className="absolute p-2 text-gray-700 transition-colors -translate-y-1/2 bg-white rounded-full shadow-md right-2 top-1/2 bg-opacity-70 hover:bg-opacity-90"
            aria-label="Next banner"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute flex space-x-2 -translate-x-1/2 bottom-4 left-1/2">
            {dynamicBanners.map((_, index) => (
              <span
                key={index}
                className={`block w-2 h-2 rounded-full transition-colors ${
                  currentBannerIndex === index
                    ? "bg-white"
                    : "bg-white bg-opacity-50"
                }`}
              ></span>
            ))}
          </div>
        </div>
        
        {/* -------------------- 3. CATEGORY SCROLLER -------------------- */}
        <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold text-gray-800">Categories</h2>
            <div ref={categoryScrollRef} className="flex pb-2 space-x-3 overflow-x-auto scrollbar-hide">
                {categories.map((cat, i) => (
                    <button
                        key={i}
                        data-category={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex-shrink-0 px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 shadow-sm border whitespace-nowrap ${
                            selectedCategory === cat
                                ? `${ACCENT_COLOR} ${ACCENT_TEXT_COLOR} border-transparent shadow-md` 
                                : `bg-white text-gray-700 border-gray-300 hover:bg-gray-50`
                        } flex items-center space-x-2`}
                    >
                        {cat !== "All" && <Star size={16} className={`${selectedCategory === cat ? ACCENT_TEXT_COLOR : 'text-gray-500'}`} />}
                        <span>{cat}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* -------------------- 4. PRODUCT LIST/GRID -------------------- */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    Recommended
                </h2>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                    <option value="Latest">Latest</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            seller={sellers[item.sellerId] || {}}
                            addToCart={addToCart}
                        />
                    ))
                ) : (
                    <p className="py-12 text-center text-gray-500 col-span-full">
                        No products found.
                    </p>
                )}
            </div>
        </div>
      </div>
      
      {/* -------------------- 5. BOTTOM NAVIGATION BAR (MOBILE) -------------------- */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 ${BASE_BG} shadow-[0_-4px_10px_rgba(0,0,0,0.05)] sm:hidden`}>
        <div className="flex justify-around py-2.5">
          
          {/* Home */}
          <Link href="/" className="flex flex-col items-center text-xs font-medium text-black">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${ACCENT_COLOR} shadow-md`}>
              <Home className={`w-5 h-5 ${ACCENT_TEXT_COLOR}`} fill={ACCENT_TEXT_COLOR} />
            </div>
          </Link>
          


          {/* Central Action Button (Search - Now functional) */}
          <button
            onClick={handleMobileSearchClick} // <-- New handler attached here
            className="flex flex-col items-center text-gray-500 transition-colors"
            aria-label="Activate Search"
          >
             <div className={`flex items-center justify-center w-12 h-12 -mt-5 ${PRIMARY_COLOR} rounded-full shadow-xl hover:bg-gray-800 transition-colors`}>
              <Search className="w-6 h-6 text-white" /> {/* <-- Icon changed to Search */}
            </div>
          </button>
          
          {/* Cart */}
          <Link href="/cart" className="relative flex flex-col items-center text-gray-500 transition-colors hover:text-gray-700">
             <div className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100">
              <ShoppingCart className="w-6 h-6" />
            </div>
            {cartItems.length > 0 && (
              <span className="absolute top-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full right-1">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>


          
        </div>
      </nav>
    </main>
  );
}