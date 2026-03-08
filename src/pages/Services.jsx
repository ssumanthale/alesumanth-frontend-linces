import { useState } from 'react';
import { Palette, Factory, Award, Truck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { quotesAPI } from '../services/api';

const Services = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    quantity: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await quotesAPI.create(formData);
      setMessage({ type: 'success', text: t('services.quote.success') });
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        quantity: '',
        description: '',
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      setMessage({ type: 'error', text: t('services.quote.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('services.subtitle')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <p className="text-gray-700 leading-relaxed text-lg">{t('services.description')}</p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t('services.features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Palette className="text-gray-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('services.features.design.title')}
              </h3>
              <p className="text-gray-600">{t('services.features.design.description')}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Factory className="text-gray-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('services.features.production.title')}
              </h3>
              <p className="text-gray-600">{t('services.features.production.description')}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Award className="text-gray-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('services.features.quality.title')}
              </h3>
              <p className="text-gray-600">{t('services.features.quality.description')}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Truck className="text-gray-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('services.features.logistics.title')}
              </h3>
              <p className="text-gray-600">{t('services.features.logistics.description')}</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">{t('services.quote.title')}</h2>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('services.quote.companyName')}
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('services.quote.contactPerson')}
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('services.quote.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('services.quote.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('services.quote.quantity')}
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('services.quote.description')}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? t('common.loading') : t('services.quote.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Services;
