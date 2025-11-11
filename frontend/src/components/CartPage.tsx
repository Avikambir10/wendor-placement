import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { 
  IoArrowBack, 
  IoTrashOutline, 
  IoAddCircleOutline, 
  IoRemoveCircleOutline,
  IoCardOutline,
  IoWalletOutline,
  IoCashOutline,
  IoCheckmarkCircle,
  IoLocationOutline,
  IoTimeOutline
} from "react-icons/io5";
import { useState } from "react";

interface CartPageProps {
  onBack: () => void;
}

export function CartPage({ onBack }: CartPageProps) {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<string>("card");
  const [showSuccess, setShowSuccess] = useState(false);

  const deliveryFee = 20;
  const gst = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + gst;

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: IoCardOutline, color: "blue" },
    { id: "upi", name: "UPI / Wallet", icon: IoWalletOutline, color: "purple" },
    { id: "cash", name: "Cash on Pickup", icon: IoCashOutline, color: "green" },
  ];

  const handleProceedPayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      setShowSuccess(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/30 flex justify-center items-start p-4">
      <motion.div
        className="w-full max-w-[768px] min-h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              onClick={onBack}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoArrowBack className="text-xl" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Your Cart</h1>
              <p className="text-red-100 text-sm">{totalItems} items selected</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Cart Items */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Order Items
            </h2>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <motion.div
                  key={item.product_id}
                  className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  layout
                >
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-20 h-20 object-contain rounded-xl bg-white p-2"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">
                      {item.product_name}
                    </h3>
                    <p className="text-red-600 font-bold text-lg">
                      ₹{item.product_price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <IoRemoveCircleOutline className="text-xl" />
                      </motion.button>
                      <span className="w-8 text-center font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <IoAddCircleOutline className="text-xl" />
                      </motion.button>
                    </div>
                    
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.product_id)}
                      className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                    >
                      <IoTrashOutline className="text-lg" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pickup Info */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <IoLocationOutline className="text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Pickup Location</h3>
                <p className="text-sm text-gray-600">Vending Machine - ID: 2613</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <IoTimeOutline /> Ready in 2-3 minutes
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Payment Method
            </h2>
            
            <div className="grid gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedPayment === method.id;
                return (
                  <motion.button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      isSelected
                        ? `border-${method.color}-500 bg-${method.color}-50`
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? `bg-${method.color}-500 text-white` : "bg-gray-100 text-gray-600"
                    }`}>
                      <Icon className="text-2xl" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-800">{method.name}</p>
                    </div>
                    {isSelected && (
                      <IoCheckmarkCircle className="text-2xl text-green-500" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Bill Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-semibold text-green-600">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (5%)</span>
                <span className="font-semibold">₹{gst}</span>
              </div>
              
              <div className="border-t-2 border-dashed border-gray-300 my-3"></div>
              
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total Amount</span>
                <span className="text-red-600">₹{finalTotal}</span>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <motion.button
            onClick={handleProceedPayment}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Payment • ₹{finalTotal}
            <IoCheckmarkCircle className="text-2xl" />
          </motion.button>
        </div>
      </motion.div>

      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.div
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <IoCheckmarkCircle className="text-5xl text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">Your order has been placed successfully</p>
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-gray-600">Pickup Code</p>
              <p className="text-3xl font-bold text-red-600 tracking-wider">A7B9</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}