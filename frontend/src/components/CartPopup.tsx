import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { 
  IoCart, 
  IoTrash, 
  IoChevronUp, 
  IoChevronDown, 
  IoCheckmarkCircle 
} from "react-icons/io5";

interface CartPopupProps {
  onProceedToCart: () => void;
}

// Icons
const ShoppingCartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export function CartPopup({ onProceedToCart }: CartPopupProps) {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  if (totalItems === 0) return null;

  const handleProceedToPayment = () => {
    onProceedToCart();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-4 pointer-events-none"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <div className="w-full max-w-[768px] pointer-events-auto">
          <motion.div
            className="bg-white rounded-t-3xl shadow-2xl border border-gray-200 overflow-hidden"
            layout
          >
            {/* Expanded Cart Items */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="max-h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.product_id}
                        className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                      >
                        <img
                          src={item.image}
                          alt={item.product_name}
                          className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-800 truncate">
                            {item.product_name}
                          </h4>
                          <p className="text-red-600 font-bold text-sm">
                            ₹{item.product_price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-700 font-bold"
                            >
                              -
                            </motion.button>
                            <span className="w-8 text-center font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-700 font-bold"
                            >
                              +
                            </motion.button>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.product_id)}
                            className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <IoTrash className="text-base" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cart Summary Bar */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
              <div className="flex items-center justify-between gap-4">
                {/* Cart Info */}
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-3 text-white flex-1"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <IoCart className="text-xl" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 bg-white text-red-600 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      key={totalItems}
                    >
                      {totalItems}
                    </motion.div>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium opacity-90">
                      {totalItems} {totalItems === 1 ? "Item" : "Items"} Added
                    </div>
                    <div className="text-xl font-bold">₹{totalPrice}</div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? <IoChevronDown className="text-xl" /> : <IoChevronUp className="text-xl" />}
                  </motion.div>
                </motion.button>

                {/* Proceed Button */}
                <motion.button
                  onClick={handleProceedToPayment}
                  className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Proceed</span>
                  <IoCheckmarkCircle className="text-xl" />
                </motion.button>
              </div>

              {/* Quick Summary */}
              {!isExpanded && cartItems.length > 0 && (
                <motion.div
                  className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {cartItems.slice(0, 3).map((item) => (
                    <div
                      key={item.product_id}
                      className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2"
                    >
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-6 h-6 object-contain rounded"
                      />
                      <span className="text-white text-xs font-medium">
                        {item.quantity}x {item.product_name.substring(0, 15)}
                        {item.product_name.length > 15 ? "..." : ""}
                      </span>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center">
                      <span className="text-white text-xs font-medium">
                        +{cartItems.length - 3} more
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}