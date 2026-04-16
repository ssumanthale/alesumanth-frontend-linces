import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Globe, Package, FileText, Settings } from "lucide-react";
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
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    const sentinel = document.createElement("div");
    document.body.insertBefore(sentinel, document.body.firstChild);
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      document.body.removeChild(sentinel);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-semibold tracking-tight text-gray-900 group-hover:opacity-80 transition">
              Linces'CKF
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
            {[
              { name: "home", path: "/" },
              { name: "products", path: "/products" },
              { name: "services", path: "/services" },
              { name: "about", path: "/about" },
              { name: "contact", path: "/contact" },
            ].map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group text-gray-600 hover:text-black transition"
                >
                  {t(`nav.${item.name}`)}

                  {/* underline */}
                  <span
                    className={`
            absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300
            ${isActive ? "w-full" : "w-0 group-hover:w-full"}
          `}
                  />
                </Link>
              );
            })}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* LANGUAGE */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm transition text-xs md:text-sm font-medium"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>

            {/* USER ACTIONS */}
            {isAuthenticated && !isAdmin() && (
              <div className="flex items-center gap-1 md:gap-2">
                {user?.accountType === "customer" && (
                  <>
                    {/* CART */}
                    <Link
                      to="/cart"
                      className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 hover:shadow-sm transition"
                    >
                      <ShoppingCart size={20} />

                      {getCartItemsCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-medium rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
                          {getCartItemsCount()}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/orders"
                      className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 hover:shadow-sm transition"
                    >
                      <Package size={20} />
                    </Link>

                    <Link
                      to="/settings"
                      className="flex md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 hover:shadow-sm transition"
                    >
                      <Settings size={20} />
                    </Link>
                  </>
                )}

                {user?.accountType === "brand" && (
                  <Link
                    to="/quotes"
                    className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 hover:shadow-sm transition"
                  >
                    <FileText size={20} />
                  </Link>
                )}
              </div>
            )}

            {/* AUTH */}
            {isAuthenticated ? (
              isAdmin() ? (
                <div className="hidden md:flex items-center gap-2 ml-2">
                  <Link
                    to="/admin/products"
                    className="px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium hover:opacity-90 hover:shadow-md transition"
                  >
                    {t("nav.admin")}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-full text-sm text-gray-600 hover:text-black hover:bg-gray-100 transition"
                  >
                    {t("nav.logout")}
                  </button>
                </div>
              ) : (
                <div className="hidden md:block ml-2">
                  <UserMenu />
                </div>
              )
            ) : (
              <div className="hidden md:flex items-center gap-2 ml-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-full text-sm text-gray-600 hover:text-black hover:bg-gray-100 transition"
                >
                  {t("nav.login")}
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium hover:opacity-90 hover:shadow-md transition"
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 space-y-3 bg-white border-t">
          {["home", "products", "services", "about", "contact"].map((item) => (
            <Link
              key={item}
              to={item === "home" ? "/" : `/${item}`}
              onClick={toggleMenu}
              className="block text-gray-700 py-2 hover:text-black transition"
            >
              {t(`nav.${item}`)}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              {user?.accountType === "customer" && !isAdmin() && (
                <Link to="/orders" onClick={toggleMenu} className="block py-2">
                  My Orders
                </Link>
              )}

              {user?.accountType === "brand" && !isAdmin() && (
                <Link to="/quotes" onClick={toggleMenu} className="block py-2">
                  My Quotes
                </Link>
              )}


              {isAdmin() && (
                <Link
                  to="/admin/products"
                  onClick={toggleMenu}
                  className="block py-2"
                >
                  {t("nav.admin")}
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-gray-700"
              >
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="block py-2">
                {t("nav.login")}
              </Link>

              <Link to="/register" onClick={toggleMenu} className="block py-2">
                {t("nav.register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
