import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Globe, Package, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import UserMenu from "./UserMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { isAuthenticated, logout, isAdmin, user } = useAuth();
  const { getCartItemsCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
        : 'bg-white/40 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-lg font-bold tracking-wide text-gray-900 group-hover:text-gray-700 transition-colors">Linces'CKF</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/products"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {t("nav.products")}
            </Link>
            <Link
              to="/services"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {t("nav.services")}
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {t("nav.contact")}
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-1 text-gray-700 hover:text-gray-900"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span className="text-xs font-semibold">
                {language.toUpperCase()}
              </span>
            </button>

            {isAuthenticated && !isAdmin() && (
              <>
                {user?.accountType === "customer" && (
                  <>
                    <Link
                      to="/cart"
                      className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900"
                      title="Cart"
                    >
                      <ShoppingCart size={18} />
                      {getCartItemsCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {getCartItemsCount()}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/orders"
                      className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900"
                      title="Orders"
                    >
                      <Package size={18} />
                    </Link>
                  </>
                )}
                {user?.accountType === "brand" && (
                  <Link
                    to="/quotes"
                    className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900"
                    title="Quotes"
                  >
                    <FileText size={18} />
                  </Link>
                )}
              </>
            )}

            {isAuthenticated ? (
              <>
                {isAdmin() ? (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="hidden md:block px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
                    >
                      {t("nav.admin")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="hidden md:block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-all duration-200"
                    >
                      {t("nav.logout")}
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
                  className="hidden md:block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-all duration-200"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="hidden md:block px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
                >
                  {t("nav.register")}
                </Link>
              </>
            )}

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
              onClick={toggleMenu}
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
              onClick={toggleMenu}
            >
              {t("nav.products")}
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
              onClick={toggleMenu}
            >
              {t("nav.services")}
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
              onClick={toggleMenu}
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
              onClick={toggleMenu}
            >
              {t("nav.contact")}
            </Link>
            {isAuthenticated ? (
              <>
                {user?.accountType === "customer" && !isAdmin() && (
                  <Link
                    to="/orders"
                    className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
                    onClick={toggleMenu}
                  >
                    My Orders
                  </Link>
                )}
                {user?.accountType === "brand" && !isAdmin() && (
                  <Link
                    to="/quotes"
                    className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
                    onClick={toggleMenu}
                  >
                    My Quotes
                  </Link>
                )}
                {isAdmin() && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
                    onClick={toggleMenu}
                  >
                    {t("nav.admin")}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 text-sm font-medium"
                  onClick={toggleMenu}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2.5 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium"
                  onClick={toggleMenu}
                >
                  {t("nav.register")}
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
