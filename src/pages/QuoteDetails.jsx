import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Mail, Building2, MessageSquare, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { quotesAPI } from '../services/api';

const QuoteDetails = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuote();
  }, [id]);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await quotesAPI.getById(id);
      setQuote(response.data.data);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setError('Failed to load quote details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Quote not found'}</p>
          <Link
            to="/quotes"
            className="inline-flex items-center text-gray-900 hover:text-gray-700 font-semibold"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Quotes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/quotes"
          className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-8 transition"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Quotes
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quote Request #{quote.id}
              </h1>
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2" />
                {formatDate(quote.createdAt)}
              </div>
            </div>
            <div>
              <span
                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(
                  quote.status || 'pending'
                )}`}
              >
                {quote.status || 'Pending'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Building2 className="text-gray-900 mr-3" size={24} />
                <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Brand Name</div>
                  <div className="font-semibold text-gray-900">{quote.brandName}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Mail className="text-gray-900 mr-3" size={24} />
                <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Email</div>
                  <div className="font-semibold text-gray-900">{quote.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <MessageSquare className="text-gray-900 mr-3" size={24} />
              <h2 className="text-lg font-semibold text-gray-900">Request Details</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{quote.message}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <FileText className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                <p className="text-sm text-gray-700">
                  Our team will review your quote request and get back to you within 1-2 business
                  days. We'll contact you at the email address provided to discuss your
                  requirements in detail.
                </p>
              </div>
            </div>
          </div>

          {quote.response && (
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <MessageSquare className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Response from Team</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{quote.response}</p>
                  {quote.updatedAt && (
                    <p className="text-xs text-gray-600 mt-3">
                      Responded on {formatDate(quote.updatedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteDetails;
