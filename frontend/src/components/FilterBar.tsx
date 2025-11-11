import { motion } from "framer-motion";

interface FilterProps {
  active: string;
  setActive: (v: string) => void;
}

export function FilterBar({ active, setActive }: FilterProps) {
  const tabs = [
    { label: "All", key: "all", icon: "🍽️" },
    { label: "Snacks", key: "snacks", icon: "🍪" },
    { label: "Salad", key: "salad", icon: "🥗" },
    { label: "Bowls", key: "bowls", icon: "🍜" },
    { label: "Drinks", key: "drinks", icon: "🥤" },
    { label: "Wraps", key: "wraps", icon: "🌯" },
  ];

  return (
    <div className="border-b bg-gradient-to-b from-white to-gray-50/50 px-4 py-3 flex gap-3 overflow-x-auto text-sm font-medium text-gray-600 relative scrollbar-hide">
      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      {tabs.map((t, index) => (
        <motion.button
          key={t.key}
          onClick={() => setActive(t.key)}
          className={`relative px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 min-w-fit ${
            active === t.key
              ? "text-red-500 bg-red-50 shadow-sm font-semibold"
              : "hover:bg-gray-100 hover:text-gray-800"
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span 
            className="text-lg"
            animate={active === t.key ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {t.icon}
          </motion.span>
          <span>{t.label}</span>
          
          {/* Active indicator */}
          {active === t.key && (
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"
              layoutId="activeTab"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}