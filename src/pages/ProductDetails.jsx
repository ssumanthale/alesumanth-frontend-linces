import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { productsAPI } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsAPI.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(t('productDetails.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, t]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || t('productDetails.error')}</p>
          <Link
            to="/products"
            className="text-gray-800 hover:text-gray-600 font-semibold flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={20} />
            {t('productDetails.backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          {t('productDetails.backToProducts')}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image || 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-gray-900 mb-6">${product.price?.toFixed(2)}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{t('productDetails.description')}</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.category && (
              <div className="mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">Category:</span> {product.category}
                </p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-semibold">Stock:</span>{' '}
                {product.stock > 0 ? (
                  <span className="text-green-600">{product.stock} {t('products.inStock')}</span>
                ) : (
                  <span className="text-red-600">{t('products.outOfStock')}</span>
                )}
              </p>
            </div>

            {isAuthenticated && !isAdmin() && product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-semibold">{t('cart.quantity')}:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center space-x-2 text-lg font-semibold"
                >
                  <ShoppingCart size={24} />
                  <span>{t('productDetails.addToCart')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
