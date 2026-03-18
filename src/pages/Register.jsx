import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("customer");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.register.passwordMismatch"));
      setLoading(false);
      return;
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      accountType,
    );

    if (result.success) {
      window.location.href = "/";
    } else {
      setError(result.error || t("auth.register.error"));
    }

    setLoading(false);
  };

  return (
    <>
      <div className=" bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {t("auth.register.title")}
            </h2>
            <p className="text-gray-500 mt-2">
              Create your account to get started
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                {error}
              </div>
            )}

            {/* Account Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose Account Type
              </label>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAccountType("customer")}
                  className={`p-4 rounded-lg border text-sm font-semibold transition
                ${
                  accountType === "customer"
                    ? "border-gray-800 bg-gray-100"
                    : "border-gray-300 hover:border-gray-500"
                }`}
                >
                  Customer
                  <p className="text-xs text-gray-500 mt-1">
                    Discover and buy products
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType("brand")}
                  className={`p-4 rounded-lg border text-sm font-semibold transition
                ${
                  accountType === "brand"
                    ? "border-gray-800 bg-gray-100"
                    : "border-gray-300 hover:border-gray-500"
                }`}
                >
                  Brand
                  <p className="text-xs text-gray-500 mt-1">
                    Sell and manage products
                  </p>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.register.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.register.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.register.password")}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.register.confirmPassword")}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? t("common.loading") : t("auth.register.submit")}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">
                {t("auth.register.hasAccount")}
              </span>{" "}
              <Link
                to="/login"
                className="text-gray-900 font-semibold hover:underline"
              >
                {t("auth.register.loginLink")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
