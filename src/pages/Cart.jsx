import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, checkout, loading } = useCart();

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // 🛒 EMPTY STATE (PREMIUM)
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <ShoppingBag className="mx-auto text-gray-300 mb-6" size={60} />

          <h2 className="text-2xl font-semibold text-[#111] mb-3">
            {t("cart.empty")}
          </h2>

          <p className="text-gray-500 mb-6 text-sm">
            Your collection is currently empty. Discover our premium silk
            pieces.
          </p>

          <Link
            to="/products"
            className="inline-block px-6 py-3 rounded-full bg-black text-white text-sm tracking-wide hover:bg-gray-800 transition"
          >
            {t("cart.continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111]">
            {t("cart.title")}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Review your selections before checkout
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT - ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <CartItem key={item.id} item={item} />
              </div>
            ))}
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-medium text-[#111] mb-6">
                Order Summary
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* PRICE BREAKDOWN */}
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>{t("cart.subtotal")}</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-semibold text-[#111]">
                  <span>{t("cart.total")}</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading || loading}
                className="w-full bg-black text-white py-4 rounded-full text-sm tracking-wide hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
              >
                {checkoutLoading ? t("common.loading") : t("cart.checkout")}
              </button>

              {/* CONTINUE */}
              <Link
                to="/products"
                className="block text-center text-gray-500 hover:text-black text-sm mt-4 transition"
              >
                {t("cart.continueShopping")}
              </Link>

              {/* TRUST NOTE */}
              <p className="text-xs text-gray-400 text-center mt-6">
                Secure checkout • Premium quality assurance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
