import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">

          {/* BRAND */}
          <div>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              Linces'CKF
            </h3>
            <p className="text-sm mt-1 text-gray-500">
              {t('footer.tagline')}
            </p>
          </div>

          {/* LINKS */}
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/about" className="hover:text-white transition-colors duration-200">
              {t('nav.about')}
            </Link>
            <Link to="/products" className="hover:text-white transition-colors duration-200">
              {t('nav.products')}
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors duration-200">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* SOCIAL */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors duration-200"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white transition-colors duration-200"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">

          <p>{t('footer.copyright')}</p>

          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-200">
              {t('footer.termsOfService')}
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;