import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Mail,
  Building2,
  MessageSquare,
  Clock,
  CheckCircle2,
} from 'lucide-react';
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
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ✅ STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'IN_REVIEW':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'APPROVED':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'REJECTED':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  // ✅ STATUS LABEL
  const getStatusLabel = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'IN_REVIEW':
        return 'In Review';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  // ✅ STATUS DESCRIPTION
  const getStatusDescription = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Your request is waiting to be reviewed by our team.';
      case 'IN_REVIEW':
        return 'Our team is currently reviewing your requirements.';
      case 'APPROVED':
        return 'Your request has been approved. We will proceed with next steps.';
      case 'REJECTED':
        return 'Unfortunately, we are unable to fulfill this request.';
      default:
        return '';
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

      {/* HEADER */}
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

          {/* STATUS BADGE */}
          <div>
            <span
              className={`inline-block px-6 py-3 rounded-xl text-sm font-semibold border ${getStatusColor(
                quote.status
              )}`}
            >
              {getStatusLabel(quote.status)}
            </span>
          </div>

        </div>
      </SectionContainer>

      {/* BODY */}
      <SectionContainer background="cream" className="py-12">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* STATUS INFO */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
            <h3 className="text-lg font-bold mb-2">Status Details</h3>
            <p className="text-gray-600">{getStatusDescription(quote.status)}</p>
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl p-8 border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Company</h2>
              <p className="text-lg font-semibold">{quote.brandName}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <p className="text-lg font-semibold">{quote.email}</p>
            </div>

          </div>

          {/* MESSAGE */}
          <div className="bg-white rounded-2xl p-8 border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Request</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{quote.message}</p>
          </div>

          {/* ADMIN RESPONSE */}
          {!quote.adminResponse && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <p className="text-blue-800">
                Your request is being reviewed. We will respond shortly.
              </p>
            </div>
          )}

          {quote.adminResponse && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-3">Admin Response</h3>

              <p className="text-gray-800 whitespace-pre-wrap mb-4">
                {quote.adminResponse}
              </p>

              {quote.updatedAt && (
                <p className="text-sm text-gray-600">
                  Responded on {formatDate(quote.updatedAt)}
                </p>
              )}
            </div>
          )}

        </div>
      </SectionContainer>
    </div>
  );
};

export default QuoteDetails;