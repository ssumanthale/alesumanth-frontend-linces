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
      className="group block"
    >
      <div className="bg-white rounded-2xl overflow-hidden transition-all duration-500 border border-gray-100 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

        {/* IMAGE */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={
              product.imageUrl ||
              "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
            }
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* DARK OVERLAY ON HOVER */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

          {/* CATEGORY */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs tracking-wide text-gray-700 shadow-sm">
            {product.category}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col justify-between h-[170px]">

          <div>
            <h3 className="text-lg font-medium text-[#111] tracking-tight group-hover:text-gray-700 transition">
              {name}
            </h3>

            <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* BOTTOM */}
          <div className="flex items-center justify-between mt-4">

            <span className="text-lg font-semibold text-black">
              ${product.price?.toFixed(2)}
            </span>

            {isAuthenticated && isCustomer() && (
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-xs tracking-wide hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
              >
                <ShoppingCart size={14} />
                {adding ? "..." : t("products.addToCart")}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;