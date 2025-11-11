import { useState } from "react";
import { motion } from "framer-motion";
import ProductGrid from "./components/ProductGrid";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { CartProvider } from "./context/CartContext";
import { CartPopup } from "./components/CartPopup";
import { CartPage } from "./components/CartPage";

export default function App() {
  const [activeCat, setActiveCat] = useState("all");
  const [showCartPage, setShowCartPage] = useState(false);

  if (showCartPage) {
    return (
      <CartProvider>
        <CartPage onBack={() => setShowCartPage(false)} />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-start p-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Main container */}
        <motion.div
          className="w-full max-w-[768px] h-[700px] bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden flex flex-col relative z-10"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          <FilterBar active={activeCat} setActive={setActiveCat} />

          {/* Scrollable content with custom scrollbar */}
          <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-gray-100 hover:scrollbar-thumb-red-400">
            {/* Tray header with enhanced design */}
            <motion.div 
              className="px-4 pt-4 pb-2 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Tray 1</h2>
                  <p className="text-xs text-gray-500">Available items</p>
                </div>
              </div>
              <motion.div
                className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-medium">In Stock</span>
              </motion.div>
            </motion.div>

            <ProductGrid selectedCategory={activeCat} />
          </div>

          {/* Enhanced footer */}
          <motion.div
            className="flex justify-between items-center px-4 py-3 border-t bg-gradient-to-r from-gray-50 to-white text-sm text-gray-500 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            
            <div className="flex items-center gap-1.5">
              <span className="text-gray-600">Powered By</span>
              <motion.span 
                className="text-red-500 font-bold text-base"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                wendor
              </motion.span>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                <span className="font-medium text-gray-700">ID:</span>
                <span className="font-mono">2613</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                <span className="font-mono">v5.0.4</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Cart Popup - Floats above footer */}
        <CartPopup onProceedToCart={() => setShowCartPage(true)} />
      </div>
    </CartProvider>
  );
}

// Add custom scrollbar styles to your global CSS or Tailwind config
// @layer utilities {
//   .scrollbar-thin::-webkit-scrollbar {
//     width: 6px;
//   }
//   .scrollbar-thumb-red-300::-webkit-scrollbar-thumb {
//     background-color: #fca5a5;
//     border-radius: 3px;
//   }
//   .scrollbar-track-gray-100::-webkit-scrollbar-track {
//     background-color: #f3f4f6;
//   }
//   .scrollbar-hide::-webkit-scrollbar {
//     display: none;
//   }
// }