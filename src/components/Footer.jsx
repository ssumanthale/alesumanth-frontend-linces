import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-4">Linces'CKF</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Premium silk garments crafted with excellence, designed for those who appreciate luxury and quality.
            </p>
            <div className="flex space-x-3 mt-6">
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-amber-600 rounded-lg transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-amber-600 rounded-lg transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-amber-600 rounded-lg transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-amber-600 rounded-lg transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-gray-300">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-gray-300">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  {t('footer.termsOfService')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-gray-300">Craft</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Premium Silk</li>
              <li>Handmade Quality</li>
              <li>Sustainable</li>
              <li>Ethical Production</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-gray-300">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Email: info@linces.com</li>
              <li>Phone: +1 (555) 000-0000</li>
              <li>Hours: 9AM - 6PM EST</li>
              <li>Mon - Fri</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-gray-500 text-sm">{t('footer.copyright')} 2024 Linces'CKF. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">Crafted with care for luxury silk enthusiasts worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
