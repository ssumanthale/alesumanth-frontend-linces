import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { productsAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../contexts/AuthContext";

const Products = () => {
  const { t } = useLanguage();
  const { products, error, loading } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#f8f6f2] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-[#111] tracking-tight">
              {t("products.title")}
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Discover premium silk collections crafted with precision
            </p>
          </div>

          {/* (UI ONLY) Search / Filter Placeholder */}
          <div className="flex gap-3">
            <input
              placeholder="Search products..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-black text-sm"
            />
            <button className="px-5 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition">
              Filter
            </button>
          </div>
        </div>

        {/* STATES */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products
              .filter((product) =>
                JSON.stringify(product)
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()),
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">{t("products.noProducts")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
