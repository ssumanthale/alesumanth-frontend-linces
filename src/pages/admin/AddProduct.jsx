import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { productsAPI } from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";

const AddProduct = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_en: "",
    name_es: "",
    description_en: "",
    description_es: "",
    price: "",
    imageUrl: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Frontend validation (important)
    if (!formData.name_en || !formData.name_es) {
      return setError("Product names are required");
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      return setError("Valid price is required");
    }

    setLoading(true);

    try {
      const productData = {
        name_en: formData.name_en,
        name_es: formData.name_es,
        description_en: formData.description_en,
        description_es: formData.description_es,
        category: formData.category,
        imageUrl: formData.imageUrl,
        price: parseFloat(formData.price),
      };

      await productsAPI.create(productData);

      alert("✅ Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      setError(
        error?.response?.data?.message ||
          "Failed to create product. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Product">
      <div className="space-y-6">
        <Link
          to="/admin/products"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft
            className="mr-2 transition-transform group-hover:-translate-x-1"
            size={18}
          />
          <span>Back to Products</span>
        </Link>

        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Create New Product
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Product Name (English)
                </label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Product Name (Spanish)
                </label>
                <input
                  type="text"
                  name="name_es"
                  value={formData.name_es}
                  onChange={handleChange}
                  required
                  placeholder="Enter product name in Spanish"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description (English)
                </label>
                <textarea
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description (Spanish)
                </label>
                <textarea
                  name="description_es"
                  value={formData.description_es}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                />
              </div>

              {/* PRICE + STOCK */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Silk Blouse"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* CATEGORY */}

              {/* IMAGE */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                />
              </div>

              <div className="pt-6 border-t border-gray-200 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Product"}
                </button>
                <Link
                  to="/admin/products"
                  className="flex-1 text-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
