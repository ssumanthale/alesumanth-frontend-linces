import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { productsAPI } from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { isAuthenticated, isCustomer } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await productsAPI.getById(id);
        const productData = response.data.data;

        setProduct({
          id: productData.id,
          name: productData.name_en,
          description: productData.description_en,
          price: parseFloat(productData.price),
          image: productData.imageUrl,
          category: productData.category,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(t("productDetails.error"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, t]);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product, quantity);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAdding(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f2]">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-black"></div>
      </div>
    );
  }

  // ERROR
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f2]">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">
            {error || t("productDetails.error")}
          </p>
          <Link
            to="/products"
            className="text-black hover:opacity-70 flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            {t("productDetails.backToProducts")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BACK */}
        <Link
          to="/products"
          className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-10 transition"
        >
          <ArrowLeft className="mr-2" size={16} />
          {t("productDetails.backToProducts")}
        </Link>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT - IMAGE */}
          <div className="rounded-2xl overflow-hidden bg-white">
            <div className="h-[500px] overflow-hidden">
              <img
                src={
                  product.image ||
                  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
                }
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
          </div>

          {/* RIGHT - DETAILS */}
          <div className="flex flex-col justify-center">

            {/* CATEGORY */}
            {product.category && (
              <span className="text-xs tracking-widest uppercase text-gray-500 mb-3">
                {product.category}
              </span>
            )}

            {/* NAME */}
            <h1 className="text-4xl md:text-5xl font-semibold text-[#111] tracking-tight mb-4">
              {product.name}
            </h1>

            {/* PRICE */}
            <p className="text-2xl font-medium text-black mb-6">
              ${product.price?.toFixed(2)}
            </p>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
              {product.description}
            </p>

            {/* QUANTITY */}
            {isAuthenticated && isCustomer() && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-600">Qty</span>
                <div className="flex items-center border rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 text-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* CTA */}
            {isAuthenticated && isCustomer() && (
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full md:w-[300px] bg-black text-white py-4 rounded-full flex items-center justify-center gap-3 text-sm tracking-wide hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                {adding
                  ? t("common.loading")
                  : t("productDetails.addToCart")}
              </button>
            )}

            {/* EXTRA TRUST TEXT */}
            <p className="text-xs text-gray-400 mt-6">
              Premium silk • Handcrafted quality • Trusted manufacturing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;