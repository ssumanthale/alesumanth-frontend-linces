import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Mail, Building2, MessageSquare, Save } from 'lucide-react';
import { quotesAPI } from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';

const AdminQuoteDetails = () => {
  const { id } = useParams();

  const [quote, setQuote] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuote();
  }, [id]);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await quotesAPI.getByIdAdmin(id);
      const data = result.data.data;

      setQuote(data);
      setResponse(data?.adminResponse || '');

    } catch (error) {
      console.error('Error fetching quote:', error);
      setError('Failed to load quote details');
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE STATUS (WITH EXISTING RESPONSE)
  const handleStatusChange = async (newStatus) => {
    try {
      await quotesAPI.updateStatus(id, {
        status: newStatus,
        adminResponse: response || '',
      });

      setQuote((prev) => ({
        ...prev,
        status: newStatus,
      }));

    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  // ✅ SAVE RESPONSE (WITH CURRENT STATUS)
  const handleSaveResponse = async () => {
    try {
      setSaving(true);

      await quotesAPI.updateStatus(id, {
        status: quote.status,
        adminResponse: response,
      });

      setQuote((prev) => ({
        ...prev,
        adminResponse: response,
      }));

      alert('Response saved successfully');

    } catch (error) {
      console.error('Error saving response:', error);
      alert('Failed to save response');
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <AdminLayout title="Quote Details">
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !quote) {
    return (
      <AdminLayout title="Quote Details">
        <div className="text-center py-16">
          <p className="text-red-600 mb-6">{error || 'Quote not found'}</p>
          <Link
            to="/admin/quotes"
            className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Quotes
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Quote Details">
      <div className="space-y-6">

        <Link
          to="/admin/quotes"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" size={18} />
          <span>Back to Quotes</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* QUOTE DETAILS */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Quote Request #{quote.id}
                  </h2>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Calendar size={14} />
                    {formatDate(quote.createdAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={16} />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Brand Name</p>
                  </div>
                  <p className="text-lg font-semibold">{quote.brandName}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={16} />
                    <p className="text-xs font-semibold text-gray-600 uppercase">Email</p>
                  </div>
                  <p className="text-lg font-semibold">{quote.email}</p>
                </div>

              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={16} />
                  <p className="text-sm font-semibold uppercase">Request Message</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {quote.message}
                  </p>
                </div>
              </div>
            </div>

            {/* RESPONSE */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Admin Response</h3>

              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows="6"
                placeholder="Write your response..."
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-400 resize-none"
              />

              <div className="mt-4">
                <button
                  onClick={handleSaveResponse}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Response'}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-fit">
            <h3 className="text-lg font-bold mb-4">Status</h3>

            <StatusBadge
              status={quote.status}
              onStatusChange={handleStatusChange}
              editable={true}
            />

          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminQuoteDetails;