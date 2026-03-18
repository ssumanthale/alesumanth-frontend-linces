import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const ProductCard = ({ product }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { isAuthenticated, isCustomer } = useAuth();

  const [adding, setAdding] = useState(false);

  const name = product.name_en;
  const description = product.description_en;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAdding(true);

    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={
            product.imageUrl ||
            "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
          }
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700 capitalize shadow">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-[150px] justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition">
            {name}
          </h3>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </span>

          {isAuthenticated && isCustomer() && (
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex items-center gap-1 bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition text-sm disabled:opacity-50"
            >
              <ShoppingCart size={16} />
              {adding ? "..." : t("products.addToCart")}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;