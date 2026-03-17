import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Mail, Building2, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { quotesAPI } from '../services/api';
import SectionContainer from '../components/brand/SectionContainer';

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

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-6">{error || 'Quote not found'}</p>
          <Link
            to="/quotes"
            className="inline-flex items-center text-gray-900 hover:text-gray-700 font-semibold group"
          >
            <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" size={20} />
            Back to Quotes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <SectionContainer background="white" className="py-12 border-b border-stone-200">
        <Link
          to="/quotes"
          className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-8 transition group"
        >
          <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" size={20} />
          <span className="font-medium">Back to Quotes</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              Quote Request #{quote.id}
            </h1>
            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2" />
              <span className="text-lg">{formatDate(quote.createdAt)}</span>
            </div>
          </div>
          <div>
            <span
              className={`inline-block px-6 py-3 rounded-xl text-sm font-semibold border ${getStatusColor(
                quote.status || 'pending'
              )}`}
            >
              {quote.status || 'Pending'}
            </span>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="cream" className="py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mr-4">
                  <Building2 className="text-gray-900" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Company Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Brand Name</div>
                  <div className="text-lg font-semibold text-gray-900">{quote.brandName}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="text-gray-900" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email Address</div>
                  <div className="text-lg font-semibold text-gray-900">{quote.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mr-4">
                <MessageSquare className="text-gray-900" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
                {quote.message}
              </p>
            </div>
          </div>

          {!quote.response && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-blue-700" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">What Happens Next?</h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Our manufacturing team is reviewing your quote request. We'll get back to you
                    within 1-2 business days with a detailed proposal. You'll receive an email at{' '}
                    <span className="font-semibold">{quote.email}</span> to discuss your requirements
                    and next steps.
                  </p>
                </div>
              </div>
            </div>
          )}

          {quote.response && (
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-green-700" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Response from Our Team</h3>
                  <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
                    {quote.response}
                  </p>
                  {quote.updatedAt && (
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar size={14} className="mr-2" />
                      Responded on {formatDate(quote.updatedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
};

export default QuoteDetails;
