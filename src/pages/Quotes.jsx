import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight, Calendar, MessageSquare, Mail, Building2, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { quotesAPI } from '../services/api';
import SectionContainer from '../components/brand/SectionContainer';
import CTAButton from '../components/brand/CTAButton';

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
      const response = await quotesAPI.getMyQuotes({ page, limit: 20 });
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
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'reviewed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <SectionContainer background="white" className="pt-12 pb-8 border-b border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              Quote Requests
            </h1>
            <p className="text-lg text-gray-600">
              Manage your B2B manufacturing quote submissions
            </p>
          </div>
          <Link to="/services">
            <CTAButton icon={false} className="whitespace-nowrap">
              <Plus size={20} />
              New Quote Request
            </CTAButton>
          </Link>
        </div>
      </SectionContainer>

      <SectionContainer background="cream" className="py-12">
        {error && (
          <div className="mb-6 p-5 bg-red-50 border border-red-200 text-red-800 rounded-xl">
            {error}
          </div>
        )}

        {quotes.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-16 md:p-24 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-stone-100 rounded-2xl mb-8">
              <FileText className="text-gray-900" size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              No Quote Requests Yet
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
              Submit a quote request to get started with our premium B2B manufacturing services
            </p>
            <Link to="/services">
              <CTAButton>
                Request Your First Quote
              </CTAButton>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-2xl shadow-sm border border-stone-200 hover:shadow-lg hover:border-stone-300 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-5 flex-1">
                      <div className="bg-stone-100 p-4 rounded-xl flex-shrink-0">
                        <FileText className="text-gray-900" size={28} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                            Quote Request #{quote.id}
                          </h3>
                          <span
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                              quote.status || 'pending'
                            )}`}
                          >
                            {quote.status || 'Pending'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar size={16} className="mr-2" />
                          {formatDate(quote.createdAt)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center text-sm text-gray-700">
                            <Building2 size={16} className="mr-3 flex-shrink-0 text-stone-400" />
                            <span className="truncate font-medium">{quote.brandName}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <Mail size={16} className="mr-3 flex-shrink-0 text-stone-400" />
                            <span className="truncate">{quote.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {quote.message && (
                    <div className="bg-stone-50 rounded-xl p-5 mb-6 border border-stone-200">
                      <div className="flex items-start space-x-3 mb-3">
                        <MessageSquare size={18} className="text-stone-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-semibold text-gray-900">Project Details</p>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-3 ml-9 leading-relaxed">
                        {quote.message}
                      </p>
                    </div>
                  )}

                  <div className="pt-6 border-t border-stone-200">
                    <Link
                      to={`/quotes/${quote.id}`}
                      className="inline-flex items-center text-gray-900 hover:text-gray-700 font-semibold transition group"
                    >
                      View Full Details
                      <ChevronRight size={20} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {pagination && pagination.pages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchQuotes(page)}
                className={`min-w-[44px] h-11 px-4 rounded-xl font-semibold transition-all ${
                  pagination.page === page
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-stone-200 hover:border-stone-300 hover:shadow-sm'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
};

export default Quotes;
