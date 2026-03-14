import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Globe, Package, FileText } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import UserMenu from './UserMenu';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { isAuthenticated, logout, isAdmin, user } = useAuth();
  const { getCartItemsCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">Linces'CKF</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition">
              {t('nav.home')}
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-gray-900 transition">
              {t('nav.products')}
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-gray-900 transition">
              {t('nav.services')}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 transition">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition">
              {t('nav.contact')}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100 transition flex items-center space-x-1"
              aria-label="Toggle language"
            >
              <Globe size={20} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {isAuthenticated && !isAdmin() && (
              <>
                {user?.accountType === 'customer' && (
                  <>
                    <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition" title="Cart">
                      <ShoppingCart size={24} />
                      {getCartItemsCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {getCartItemsCount()}
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition" title="Orders">
                      <Package size={24} />
                    </Link>
                  </>
                )}
                {user?.accountType === 'brand' && (
                  <Link to="/quotes" className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition" title="Quotes">
                    <FileText size={24} />
                  </Link>
                )}
              </>
            )}

            {isAuthenticated ? (
              <>
                {isAdmin() ? (
                  <>
                    <Link
                      to="/admin/products"
                      className="hidden md:block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                      {t('nav.admin')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="hidden md:block px-4 py-2 text-gray-700 hover:text-gray-900 transition"
                    >
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <div className="hidden md:block">
                    <UserMenu />
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:block px-4 py-2 text-gray-700 hover:text-gray-900 transition"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="hidden md:block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={toggleMenu}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/products"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={toggleMenu}
            >
              {t('nav.products')}
            </Link>
            <Link
              to="/services"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={toggleMenu}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={toggleMenu}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={toggleMenu}
            >
              {t('nav.contact')}
            </Link>
            {isAuthenticated ? (
              <>
                {user?.accountType === 'customer' && !isAdmin() && (
                  <Link
                    to="/orders"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={toggleMenu}
                  >
                    My Orders
                  </Link>
                )}
                {user?.accountType === 'brand' && !isAdmin() && (
                  <Link
                    to="/quotes"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={toggleMenu}
                  >
                    My Quotes
                  </Link>
                )}
                {isAdmin() && (
                  <Link
                    to="/admin/products"
                    className="block py-2 text-gray-700 hover:text-gray-900"
                    onClick={toggleMenu}
                  >
                    {t('nav.admin')}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:text-gray-900"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-gray-900"
                  onClick={toggleMenu}
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-gray-700 hover:text-gray-900"
                  onClick={toggleMenu}
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
