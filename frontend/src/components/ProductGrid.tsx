import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { getProducts } from "../api/productService";
import { useCart } from "../context/CartContext";

type Props = {
  selectedCategory: string;
};

// Close Icon
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Info Icon
const InfoIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

// Cart Icon
const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default function ProductGrid({ selectedCategory }: Props) {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filterByCategory = (p: any) => {
    if (selectedCategory === "all") return true;

    const name = p.product_name.toLowerCase();

    const map: any = {
      snacks: ["biscuit", "cake", "peanuts", "chocolate"],
      salad: ["salad"],
      bowls: ["bowl", "biryani", "rice"],
      drinks: ["shake", "juice", "coffee", "tea", "chaas", "milk"],
      wraps: ["roll", "wrap"]
    };

    return map[selectedCategory]?.some((k: string) => name.includes(k));
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  const filteredProducts = products.filter(filterByCategory);

  return (
    <div className="p-4 pb-32">
      {/* Added to Cart Toast */}
      <AnimatePresence>
        {showAddedToast && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Added to cart!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">Loading delicious items...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p, index) => (
                <motion.div
                  key={p.product_id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={p} onClick={() => setSelectedProduct(p)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </motion.div>
          )}
        </>
      )}

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <CloseIcon />
              </motion.button>

              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-red-50 to-gray-50 overflow-hidden">
                <motion.img
                  src={selectedProduct.image || selectedProduct.image_mini || "/placeholder.png"}
                  alt={selectedProduct.product_name}
                  className="w-full h-full object-contain p-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-4">
                <div>
                  <motion.h2 
                    className="text-2xl font-bold text-gray-800 mb-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedProduct.product_name}
                  </motion.h2>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <span className="text-3xl font-bold text-red-600">₹{selectedProduct.product_price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{Math.floor(selectedProduct.product_price * 1.2)}</span>
                  </motion.div>
                </div>

                {/* Info badges */}
                <motion.div 
                  className="flex gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex-1 bg-red-50 rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-xs text-gray-600 font-medium">{selectedProduct.calories || "N/A"}</div>
                  </div>
                  <div className="flex-1 bg-red-50 rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">⚖️</div>
                    <div className="text-xs text-gray-600 font-medium">{selectedProduct.weight || "N/A"}</div>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div 
                  className="bg-gray-50 rounded-xl p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <div className="flex items-start gap-2">
                    <InfoIcon />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-700 text-sm mb-1">Description</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {selectedProduct.description || "Fresh and delicious item, ready to enjoy!"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-3 pt-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CartIcon />
                    Add to Cart
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}