import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';

const Checkout = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const orderNumber = location.state?.orderNumber || null;

  useEffect(() => {
    if (!orderNumber) {
      navigate('/cart');
    }
  }, [orderNumber, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500" size={64} />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('checkout.success')}</h1>
        <p className="text-gray-600 mb-6">{t('checkout.message')}</p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">{t('checkout.orderNumber')}</p>
          <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
        </div>

        <div className="flex flex-col space-y-3">
          <Link
            to="/orders"
            className="inline-block w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            View Order Details
          </Link>
          <Link
            to="/products"
            className="inline-block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            {t('checkout.continueShopping')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
