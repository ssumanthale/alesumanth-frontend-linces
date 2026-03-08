import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { t } = useLanguage();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
      <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
        <img
          src={item.image || 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm">${item.price?.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrease}
          className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="text-lg font-bold text-gray-900">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <button
        onClick={handleRemove}
        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
        aria-label={t('cart.remove')}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;
