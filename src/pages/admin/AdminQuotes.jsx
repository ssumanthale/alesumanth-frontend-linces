import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, ChevronRight } from "lucide-react";
import { quotesAPI } from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await quotesAPI.getAll();
      setQuotes(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setError("Failed to load quote requests");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <AdminLayout title="Quote Requests">
      <div className="space-y-6">
        <div>
          <p className="text-gray-600 text-sm">
            Manage and respond to manufacturing quote requests from brands
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
            {error}
          </div>
        ) : quotes.length > 0 ? (
          <div className="space-y-3">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="text-gray-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {quote.brandName}
                        </h3>
                        <p className="text-sm text-gray-600">{quote.email}</p>
                      </div>
                    </div>

                    {quote.message && (
                      <p className="text-sm text-gray-700 line-clamp-2 mt-3 mb-3">
                        {quote.message}
                      </p>
                    )}

                    <p className="text-xs text-gray-500">
                      {formatDate(quote.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-40">
                      <StatusBadge status={quote.status} editable={false} />
                    </div>

                    <Link
                      to={`/admin/quotes/${quote.id}`}
                      className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors flex-shrink-0"
                    >
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Quote Requests
            </h3>
            <p className="text-gray-600">
              Quote requests from brands will appear here
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminQuotes;
