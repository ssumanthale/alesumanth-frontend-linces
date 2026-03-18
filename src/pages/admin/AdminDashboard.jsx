import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Package, TrendingUp, ArrowRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import { productsAPI, quotesAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalQuotes: 0,
    pendingQuotes: 0,
  });
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productsRes, quotesRes] = await Promise.all([
        productsAPI.getAll(),
        quotesAPI.getAll(),
      ]);

      const products = productsRes.data || [];
      const quotes = quotesRes.data?.data || [];

      setStats({
        totalProducts: products.length,
        totalQuotes: quotes.length,
        pendingQuotes: quotes.filter((q) => q.status === 'pending').length,
      });

      setRecentQuotes(quotes.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Package}
            label="Total Products"
            value={stats.totalProducts}
            color="blue"
          />
          <StatCard
            icon={FileText}
            label="Total Quote Requests"
            value={stats.totalQuotes}
            color="amber"
          />
          <StatCard
            icon={TrendingUp}
            label="Pending Quotes"
            value={stats.pendingQuotes}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Quote Requests</h2>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : recentQuotes.length > 0 ? (
              <div className="space-y-3">
                {recentQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{quote.brandName}</p>
                      <p className="text-sm text-gray-600">{quote.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
                          quote.status === 'pending'
                            ? 'bg-gray-100 text-gray-700 border-gray-200'
                            : quote.status === 'approved'
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : 'bg-blue-100 text-blue-700 border-blue-200'
                        }`}
                      >
                        {quote.status || 'Pending'}
                      </span>
                      <Link
                        to={`/admin/quotes/${quote.id}`}
                        className="text-gray-400 group-hover:text-gray-600 transition-colors"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No quote requests yet</p>
            )}

            <Link
              to="/admin/quotes"
              className="mt-6 inline-flex items-center gap-2 text-gray-900 font-medium hover:text-gray-700 transition-colors"
            >
              View All Quotes
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/admin/products/new"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
                >
                  <Plus size={20} />
                  Add Product
                </Link>
                <Link
                  to="/admin/products"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  <Package size={20} />
                  Manage Products
                </Link>
                <Link
                  to="/admin/quotes"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  <FileText size={20} />
                  View All Quotes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
