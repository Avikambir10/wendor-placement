import { motion } from "framer-motion";

// Icon Component
const ShoppingBagIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export function Header() {
  return (
    <header className="h-20 border-b flex items-center justify-between px-6 bg-gradient-to-r from-white via-red-50/30 to-white shadow-sm relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-red-200 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        className="flex items-center gap-3 relative z-10"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-red-500 text-3xl font-bold drop-shadow-sm"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          ⟁
        </motion.div>
        <div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">Vending Machine</span>
          <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Fresh & Ready
          </div>
        </div>
      </motion.div>

      <motion.button 
        className="bg-linear-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transition-all relative z-10 flex items-center gap-2 group"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingBagIcon />
        <span>Pick Up Code</span>
        <motion.div
          className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-20"
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </header>
  );
}