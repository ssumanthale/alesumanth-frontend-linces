import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight, Calendar, MessageSquare, Mail, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { quotesAPI } from '../services/api';

const Quotes = () => {
  const { t } = useLanguage();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await quotesAPI.getAll({ page, limit: 20 });
      setQuotes(response.data.data || []);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError('Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Quote Requests</h1>
            <p className="text-gray-600">Manage your B2B quote submissions</p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            New Quote Request
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {quotes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <FileText className="text-gray-400" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">No Quote Requests Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Submit a quote request to get started with our B2B manufacturing services
            </p>
            <Link
              to="/services"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-semibold shadow-sm"
            >
              Request a Quote
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                        <FileText className="text-gray-900" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Quote Request #{quote.id}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              quote.status || 'pending'
                            )}`}
                          >
                            {quote.status || 'Pending'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(quote.createdAt)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Building2 size={14} className="mr-2 flex-shrink-0" />
                            <span className="truncate">{quote.brandName}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail size={14} className="mr-2 flex-shrink-0" />
                            <span className="truncate">{quote.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {quote.message && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-start space-x-2 mb-2">
                        <MessageSquare size={16} className="text-gray-600 mt-1 flex-shrink-0" />
                        <p className="text-sm font-medium text-gray-900">Message</p>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-3 ml-6">
                        {quote.message}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Link
                      to={`/quotes/${quote.id}`}
                      className="inline-flex items-center text-gray-900 hover:text-gray-700 font-semibold transition"
                    >
                      View Full Details
                      <ChevronRight size={20} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {pagination && pagination.pages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchQuotes(page)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  pagination.page === page
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
