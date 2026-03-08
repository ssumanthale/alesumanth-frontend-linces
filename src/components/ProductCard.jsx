import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductCard = ({ product }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={product.image || 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">{t('products.outOfStock')}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-600 transition">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </span>

          {isAuthenticated && !isAdmin() && product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-1 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              aria-label={t('products.addToCart')}
            >
              <ShoppingCart size={18} />
              <span className="text-sm">{t('products.addToCart')}</span>
            </button>
          )}
        </div>

        {product.stock > 0 && product.stock < 10 && (
          <p className="text-orange-600 text-xs mt-2">
            {product.stock} {t('products.inStock')}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
