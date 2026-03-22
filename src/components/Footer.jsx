import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* BRAND */}
          <div>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              Linces'CKF
            </h3>
            <p className="text-sm mt-1 text-gray-500">
              Premium silk garments crafted with excellence.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/about" className="hover:text-white transition">
              {t('nav.about')}
            </Link>
            <Link to="/products" className="hover:text-white transition">
              {t('nav.products')}
            </Link>
            <Link to="/contact" className="hover:text-white transition">
              {t('nav.contact')}
            </Link>
          </div>

          {/* SOCIAL */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">

          <p>{t('footer.copyright')}</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              {t('footer.privacyPolicy')}
            </a>
            <a href="#" className="hover:text-white transition">
              {t('footer.termsOfService')}
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;