import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

type Props = {
  product: any;
  onClick: () => void;
};

// Icon Components
const FlameIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
  </svg>
);

const WeightIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

export default function ProductCard({ product, onClick }: Props) {

  const { addToCart } = useCart();


  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  // Dummy placeholder image
  const dummyImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="border border-gray-200 rounded-2xl bg-white p-3 cursor-pointer shadow-sm hover:shadow-2xl hover:border-red-200 transition-all duration-300 group relative overflow-hidden"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Image container */}
      <div className="relative h-32 mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        <img
          src={product.image || product.image_mini || dummyImage}
          alt={product.product_name}
          className="w-full h-full object-contain p-2 transition-all duration-300 group-hover:scale-110"
        />

        {/* Corner badge */}
        <motion.div
          className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          HOT
        </motion.div>
      </div>

      {/* Product info */}
      <div className="relative z-10">
        <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {product.product_name}
        </h3>

        {/* Calories and weight with icons */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <FlameIcon />
            <span>{product.calories || "-"}</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <WeightIcon />
            <span>{product.weight || "-"}</span>
          </div>
        </div>

        {/* Buy button */}
        <motion.button
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-red-200 group-hover:shadow-lg group-hover:shadow-red-300 transition-all relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            handleQuickAdd(e)
            e.stopPropagation();

          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            BUY FOR ₹{product.product_price}
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}