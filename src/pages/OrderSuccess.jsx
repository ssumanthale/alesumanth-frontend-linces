import { useLocation, Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderNumber = location.state?.orderNumber || null;

  useEffect(() => {
    if (!orderNumber) {
      navigate("/cart");
    }
  }, [orderNumber, navigate]);

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-6">

      <div className="max-w-xl w-full text-center">

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
            <CheckCircle className="text-white" size={36} />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-semibold text-[#111] tracking-tight mb-4">
          Order Confirmed
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-500 mb-8 leading-relaxed max-w-md mx-auto">
          Your order has been successfully placed. Our team is preparing your premium silk collection.
        </p>

        {/* ORDER BOX */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            Order Number
          </p>
          <p className="text-xl font-semibold text-black">
            #{orderNumber}
          </p>
        </div>

        {/* DELIVERY INFO */}
        <div className="text-sm text-gray-500 mb-10 space-y-1">
          <p>Estimated Delivery: 3–5 business days</p>
          <p>Payment Method: Cash on Delivery</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-4">

          <Link
            to="/orders"
            className="w-full py-4 rounded-full bg-black text-white text-sm tracking-wide hover:bg-gray-800 transition-all duration-300"
          >
            View Order Details
          </Link>

          <Link
            to="/products"
            className="w-full py-4 rounded-full border border-gray-300 text-gray-700 text-sm tracking-wide hover:bg-gray-100 transition"
          >
            Continue Shopping
          </Link>

        </div>

        {/* BRAND TOUCH */}
        <p className="text-xs text-gray-400 mt-8">
          Thank you for choosing premium craftsmanship ✨
        </p>

      </div>
    </div>
  );
};

export default OrderSuccess;