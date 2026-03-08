import { Link, useLocation } from 'react-router-dom';
import { Package, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { t } = useLanguage();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 bg-gray-900 text-white min-h-screen fixed">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </div>

          <nav className="mt-6">
            <Link
              to="/admin/products"
              className={`flex items-center space-x-3 px-6 py-3 hover:bg-gray-800 transition ${
                isActive('/admin/products') ? 'bg-gray-800 border-l-4 border-white' : ''
              }`}
            >
              <Package size={20} />
              <span>{t('admin.products.title')}</span>
            </Link>
          </nav>

          <div className="absolute bottom-6 left-0 right-0 px-6">
            <button
              onClick={logout}
              className="flex items-center space-x-3 w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              <LogOut size={20} />
              <span>{t('nav.logout')}</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
