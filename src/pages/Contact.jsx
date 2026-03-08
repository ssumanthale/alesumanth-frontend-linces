import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { contactAPI } from '../services/api';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
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
      await contactAPI.send(formData);
      setMessage({ type: 'success', text: t('contact.form.success') });
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessage({ type: 'error', text: t('contact.form.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Mail className="text-gray-800" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t('contact.email')}
                </h3>
                <a
                  href="mailto:info@lincesckf.com"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  info@lincesckf.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Phone className="text-gray-800" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t('contact.phone')}
                </h3>
                <a
                  href="tel:+1234567890"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
              <div className="flex-shrink-0">
                <MessageSquare className="text-gray-800" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t('contact.whatsapp')}
                </h3>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
              <div className="flex-shrink-0">
                <MapPin className="text-gray-800" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t('contact.address')}
                </h3>
                <p className="text-gray-600">123 Silk Avenue, Fashion District, NY 10001</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Clock className="text-gray-800" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t('contact.hours')}
                </h3>
                <p className="text-gray-600">{t('contact.hoursValue')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.form.title')}</h2>

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
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.email')}
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
                  {t('contact.form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold disabled:opacity-50"
              >
                {loading ? t('common.loading') : t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
