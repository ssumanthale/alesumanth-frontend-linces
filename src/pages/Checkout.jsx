import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const Checkout = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {user} = useAuth();
  const { cartItems, getCartTotal, checkout } = useCart();

  const [placingOrder, setPlacingOrder] = useState(false);

  // Dummy Address (static but premium)
const address = {
  phone: "+1 415 555 2671",
  line1: "742 Evergreen Terrace",
  line2: "Apt 5B",
  city: "Springfield",
  state: "IL",
  pincode: "62704",
  country: "USA",
};

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);

    try {
      const orderNumber = await checkout();
      navigate("/order-success", { state: { orderNumber } });
    } catch (error) {
      console.error(error);
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <h1 className="text-4xl font-semibold mb-12 tracking-tight">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* ADDRESS */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-medium mb-4">Delivery Address</h2>

              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-black">{
                  (user?.name) || "John Doe"
                  
                  }</p>
                <p>{address.phone}</p>
                <p>{address.line1}</p>
                <p>{address.line2}</p>
                <p>
                  {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-medium mb-4">Payment Method</h2>

              <div className="flex items-center justify-between border rounded-xl px-4 py-3">
                <span className="text-sm">Cash on Delivery</span>
                <span className="text-xs text-gray-400">Default</span>
              </div>
            </div>

            {/* ITEMS */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-medium mb-4">Order Items</h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="w-full bg-black text-white py-4 rounded-full text-sm tracking-wide hover:bg-gray-800 transition disabled:opacity-50"
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </button>

              <p className="text-xs text-gray-400 mt-6 text-center">
                Cash on Delivery • Secure Order • Premium Quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
