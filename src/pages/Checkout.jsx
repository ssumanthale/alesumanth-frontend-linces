import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Checkout = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || 'N/A';

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

        <Link
          to="/products"
          className="inline-block w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
        >
          {t('checkout.continueShopping')}
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
