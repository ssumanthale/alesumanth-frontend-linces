import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, checkout } = useCart();

  const handleCheckout = () => {
    const orderNumber = checkout();
    navigate('/checkout', { state: { orderNumber } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cart.empty')}</h2>
          <Link
            to="/products"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('cart.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                  <span>{t('cart.total')}</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold mb-4"
              >
                {t('cart.checkout')}
              </button>

              <Link
                to="/products"
                className="block text-center text-gray-700 hover:text-gray-900 transition"
              >
                {t('cart.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
