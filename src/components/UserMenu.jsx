import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, FileText, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout, isAdmin } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center">
          <User size={18} />
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user.name?.split(' ')[0]}
        </span>
        <ChevronDown size={16} className="text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1 capitalize">
              {user.accountType} Account
            </p>
          </div>

          <div className="py-2">
            {user.accountType === 'customer' && !isAdmin() && (
              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <Package size={16} className="mr-3" />
                My Orders
              </Link>
            )}

            {user.accountType === 'brand' && !isAdmin() && (
              <Link
                to="/quotes"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <FileText size={16} className="mr-3" />
                My Quotes
              </Link>
            )}
          </div>

          <div className="border-t border-gray-200 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={16} className="mr-3" />
              {t('nav.logout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
