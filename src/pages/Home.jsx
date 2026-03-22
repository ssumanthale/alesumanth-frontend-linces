import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { t } = useLanguage();
  const { isCustomer, isBrand, isAuthenticated, products,loading } = useAuth();

  return (
    <div className="bg-[#f8f6f2] text-[#111]">
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-6">
        <img
          src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury Silk"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-3xl text-white">
          <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight">
            {t("home.hero.title") || "Luxury Silk,"}
            <br />
            <span className="text-white/90">
              {t("home.hero.subtitle") || "Crafted to Perfection"}
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/80 leading-relaxed">
            {t("home.hero.description") ||
              "Timeless silk garments designed with precision, elegance, and purpose."}
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            {isBrand() ? (
              <Link
                to="/services"
                className="px-8 py-3 bg-white text-black rounded-full text-sm tracking-wide hover:bg-gray-200 transition"
              >
                {t("home.hero.requestQuote") || "Request a Quote"}
              </Link>
            ) : (
              <Link
                to="/products"
                className="px-8 py-3 bg-white text-black rounded-full text-sm tracking-wide hover:bg-gray-200 transition"
              >
                {t("home.hero.shopNow") || "Shop Collection"}
              </Link>
            )}

            <Link
              to="/about"
              className="px-8 py-3 border border-white text-white rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition"
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

      {/* BRAND STATEMENT */}
      <section className="py-24 pb-12 max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight">
          {t("home.statement") ||
            "Crafted with precision, inspired by tradition, designed for modern elegance."}
        </h2>
      </section>

      {/* FEATURED PRODUCTS */}
      {(isCustomer() || !isAuthenticated) && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
              {t("home.featured.title") || "Featured Collection"}
            </h2>

            <Link
              to="/products"
              className="text-sm text-gray-500 hover:text-black transition flex items-center gap-1"
            >
              {t("home.featured.viewAll") || "View All"}{" "}
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-16">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      )}
      {/* WHY CHOOSE US (LUXURY VERSION) */}
      <section className="py-20 pt-10 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
            {t("home.why.title") || "Why Choose Us"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t("home.why.quality.title") || "Premium Quality"}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t("home.why.quality.desc") ||
                "Only the finest silk fabrics, carefully selected and inspected."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t("home.why.craft.title") || "Expert Craftsmanship"}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t("home.why.craft.desc") ||
                "Decades of expertise in silk garment production."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t("home.why.sustain.title") || "Sustainable Process"}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t("home.why.sustain.desc") ||
                "Eco-conscious methods for responsible luxury."}
            </p>
          </div>
        </div>
      </section>
      {/* B2B SECTION */}
      <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-5xl font-medium mb-6">
          {t("home.b2b.title") || "Premium Manufacturing for Brands"}
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mb-10">
          {t("home.b2b.desc") ||
            "Partner with us for custom silk manufacturing, private label production, and bulk orders."}
        </p>

        <Link
          to="/services"
          className="px-8 py-3 bg-black text-white rounded-full text-sm tracking-wide hover:bg-gray-800 transition"
        >
          {t("home.b2b.cta") || "Work With Us"}
        </Link>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-black text-white text-center px-6">
        <h2 className="text-3xl md:text-5xl font-medium mb-6">
          {isBrand()
            ? t("home.cta.brandTitle") || "Partner With Us"
            : t("home.cta.customerTitle") || "Experience True Luxury"}
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          {isBrand()
            ? t("home.cta.brandDesc") ||
              "Collaborate with a trusted silk manufacturer."
            : t("home.cta.customerDesc") ||
              "Explore handcrafted silk garments."}
        </p>

        <Link
          to={isCustomer() ? "/services" : "/products"}
          className="px-8 py-3 bg-white text-black rounded-full text-sm tracking-wide hover:bg-gray-200 transition"
        >
          {isCustomer()
            ? t("home.cta.explore") || "Explore Services"
            : t("home.cta.shop") || "Shop Now"}
        </Link>
      </section>
    </div>
  );
};

export default Home;
