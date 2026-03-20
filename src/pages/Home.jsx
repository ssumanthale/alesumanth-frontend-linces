import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Award, Zap, Leaf } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { productsAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isBrand } = useAuth();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await productsAPI.getFeatured();
        const products = data?.data || [];
        setFeaturedProducts(products.slice(0, 6));
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-white">
      <section
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden pt-16"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg')",
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Premium Silk Couture</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
            Luxury Silk,
            <br />
            <span className="text-amber-200">Crafted to Perfection</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("home.hero.description") || "Experience the finest handcrafted silk garments. Timeless elegance meets modern luxury."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isBrand ? (
              <Link
                to="/services"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-amber-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
              >
                Request a Quote
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            ) : (
              <Link
                to="/products"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-amber-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
              >
                {t("home.hero.shopNow") || "Shop Collection"}
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            )}

            <Link
              to="/about"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-bold text-lg"
            >
              {t("home.hero.learnMore") || "Our Story"}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Why Choose Linces'CKF
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Premium quality, exceptional craftsmanship, and sustainable practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-xl mb-6 group-hover:bg-amber-200 transition-colors">
                <Award className="text-amber-700" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t("home.values.quality.title") || "Premium Quality"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("home.values.quality.description") || "Only the finest silk fabrics, handpicked and carefully inspected."}
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-xl mb-6 group-hover:bg-amber-200 transition-colors">
                <Zap className="text-amber-700" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t("home.values.craftsmanship.title") || "Masterful Craftsmanship"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("home.values.craftsmanship.description") || "Expert artisans with decades of experience in silk garment creation."}
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-xl mb-6 group-hover:bg-amber-200 transition-colors">
                <Leaf className="text-amber-700" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t("home.values.sustainability.title") || "Sustainable Luxury"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("home.values.sustainability.description") || "Eco-conscious production methods that respect the environment."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {!isBrand && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
                  Featured Collection
                </h2>
                <p className="text-lg text-gray-600 mt-3">Discover our handpicked luxury pieces</p>
              </div>
              <Link
                to="/products"
                className="group inline-flex items-center text-gray-900 hover:text-amber-700 font-bold text-lg transition-colors"
              >
                View All Products
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-16 text-lg">
                {t("products.noProducts")}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {isBrand ? "Partner With Us" : "Join Our Community"}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {isBrand
              ? "Work with a trusted premium silk manufacturer for your brand collection."
              : "Experience the luxury of premium silk garments crafted with perfection."}
          </p>
          {isBrand ? (
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-400 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl group"
            >
              Explore B2B Services
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          ) : (
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-400 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl group"
            >
              Shop Now
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
