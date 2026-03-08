import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsAPI.getAll();
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(t('products.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [t]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('products.title')}</h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">{t('products.noProducts')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
