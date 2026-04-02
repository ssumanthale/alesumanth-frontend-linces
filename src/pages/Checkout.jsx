import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard as Edit2, MapPin, AlertCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import AddressModal from "../components/AddressModal";

const Checkout = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, address, updateAddress, createAddress, addressLoading } = useAuth();
  const { cartItems, getCartTotal, checkout } = useCart();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    if (!addressLoading && !address) {
      setShowAddressModal(true);
    }
  }, [address, addressLoading]);

  const handleSaveAddress = async (addressData) => {
    if (address) {
      await updateAddress(addressData);
    } else {
      await createAddress(addressData);
    }
  };

  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please add a delivery address first");
      setShowAddressModal(true);
      return;
    }

    setPlacingOrder(true);

    try {
      const orderNumber = await checkout();
      navigate("/order-success", { state: { orderNumber } });
    } catch (error) {
      console.error(error);
      setPlacingOrder(false);
    }
  };

  if (addressLoading) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Delivery Address</h2>
                {address && (
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                )}
              </div>

              {address ? (
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-black">{user?.name || "Customer"}</p>
                  <p>{address.phone}</p>
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p>{address.country}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <MapPin size={24} className="text-amber-700" />
                  </div>
                  <p className="text-gray-600 mb-4 text-center">
                    No delivery address found
                  </p>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
                  >
                    Add Address
                  </button>
                </div>
              )}
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

              {!address && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-700 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    Please add a delivery address to proceed
                  </p>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder || !address}
                className="w-full bg-black text-white py-4 rounded-full text-sm tracking-wide hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* ADDRESS MODAL */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSave={handleSaveAddress}
        initialAddress={address}
      />
    </div>
  );
};

export default Checkout;
