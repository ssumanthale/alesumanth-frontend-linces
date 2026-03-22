import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, CreditCard as Edit, Trash2, Package, Edit2Icon, FilePen } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { productsAPI } from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import DeleteModal from "../../components/admin/DeleteModal";

const AdminProducts = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getAll();

      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, productId: id });
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await productsAPI.delete(deleteModal.productId);
      setProducts(products.filter((p) => p.id !== deleteModal.productId));
      setDeleteModal({ isOpen: false, productId: null });
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(t("admin.products.deleteError"));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Products">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm">
              Manage your product inventory
            </p>
          </div>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
            {error}
          </div>
        ) : products.length > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      #
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Price
                    </th>
              
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{product.id}</span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.imageUrl ||
                              "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
                            }
                            alt={product.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {language === "en"
                                ? product.name_en
                                : product.name_es}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {product.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">
                          ${product.price?.toFixed(2) || "0.00"}
                        </span>
                      </td>
             
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FilePen size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(product.id)}
                            className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Products Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first product to get started
            </p>
            <Link
              to="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <Plus size={18} />
              Add First Product
            </Link>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, productId: null })}
        loading={deleting}
      />
    </AdminLayout>
  );
};

export default AdminProducts;
