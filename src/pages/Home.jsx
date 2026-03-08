import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Award, Users, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      
      try {
        const response = await productsAPI.getFeatured();
        console.log(response);
        
        setFeaturedProducts(response.data.products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <section
        className="relative bg-cover bg-center h-[600px] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{t('home.hero.title')}</h1>
          <p className="text-2xl md:text-3xl mb-6">{t('home.hero.subtitle')}</p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              {t('home.hero.shopNow')}
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition font-semibold"
            >
              {t('home.hero.learnMore')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('home.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Award className="text-gray-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('home.values.quality.title')}
              </h3>
              <p className="text-gray-600">{t('home.values.quality.description')}</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Users className="text-gray-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('home.values.craftsmanship.title')}
              </h3>
              <p className="text-gray-600">{t('home.values.craftsmanship.description')}</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Leaf className="text-gray-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t('home.values.sustainability.title')}
              </h3>
              <p className="text-gray-600">{t('home.values.sustainability.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t('home.featured.title')}</h2>
            <Link
              to="/products"
              className="text-gray-800 hover:text-gray-600 font-semibold flex items-center"
            >
              {t('home.featured.viewAll')}
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-12">{t('products.noProducts')}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
