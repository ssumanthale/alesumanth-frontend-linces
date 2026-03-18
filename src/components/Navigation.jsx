import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Globe, Package, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import UserMenu from "./UserMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { isAuthenticated, logout, isAdmin, user } = useAuth();
  const { getCartItemsCount } = useCart();
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold tracking-tight text-gray-900">
              Linces'CKF
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { to: "/", label: t("nav.home") },
              { to: "/products", label: t("nav.products") },
              { to: "/services", label: t("nav.services") },
              { to: "/about", label: t("nav.about") },
              { to: "/contact", label: t("nav.contact") },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition relative ${
                  pathname === item.to
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}

                {/* underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gray-900 transition-transform duration-300 ${
                    pathname === item.to ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* LANGUAGE */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <Globe size={16} />
              <span className="text-xs font-medium text-gray-700">
                {language.toUpperCase()}
              </span>
            </button>

            {/* USER ACTIONS */}
            {isAuthenticated && !isAdmin() && (
              <>
                {user?.accountType === "customer" && (
                  <>
                    <Link
                      to="/cart"
                      className="relative p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      <ShoppingCart size={20} />
                      {getCartItemsCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                          {getCartItemsCount()}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/orders"
                      className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      <Package size={20} />
                    </Link>
                  </>
                )}

                {user?.accountType === "brand" && (
                  <Link
                    to="/quotes"
                    className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <FileText size={20} />
                  </Link>
                )}
              </>
            )}

            {/* AUTH */}
            {isAuthenticated ? (
              <>
                {isAdmin() ? (
                  <>
                    <Link
                      to="/admin/products"
                      className="hidden md:flex px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                    >
                      {t("nav.admin")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="hidden md:block text-sm text-gray-600 hover:text-gray-900"
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
                  className="hidden md:block text-sm text-gray-600 hover:text-gray-900"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="hidden md:flex px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  {t("nav.register")}
                </Link>
              </>
            )}

            {/* MOBILE MENU */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-6 py-4 space-y-4 text-sm">

            {[
              { to: "/", label: t("nav.home") },
              { to: "/products", label: t("nav.products") },
              { to: "/services", label: t("nav.services") },
              { to: "/about", label: t("nav.about") },
              { to: "/contact", label: t("nav.contact") },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={toggleMenu}
                className="block text-gray-700 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                {user?.accountType === "customer" && !isAdmin() && (
                  <Link to="/orders" onClick={toggleMenu}>
                    My Orders
                  </Link>
                )}

                {user?.accountType === "brand" && !isAdmin() && (
                  <Link to="/quotes" onClick={toggleMenu}>
                    My Quotes
                  </Link>
                )}

                {isAdmin() && (
                  <Link to="/admin/products" onClick={toggleMenu}>
                    {t("nav.admin")}
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="block text-left w-full text-gray-700"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  {t("nav.login")}
                </Link>
                <Link to="/register" onClick={toggleMenu}>
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