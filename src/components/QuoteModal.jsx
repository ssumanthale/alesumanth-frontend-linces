import { useState } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import QuoteForm from "./brand/QuoteForm";
import { Link } from "react-router-dom";
import { quotesAPI } from "../services/api";

export default function QuoteModal({ isOpen, onClose }) {
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  if (!isOpen) return null;

const handleSubmit = async (e) => {
  e.preventDefault();

  setErrors({}); // reset old errors

  const res = await onSubmit(formData);

  if (res.success) {
    setSuccess(true);
    setFormData(initialState);

    setTimeout(() => {
      onClose && onClose();
    }, 2000);
  } else {
    // 🔥 Map backend errors
    if (res.details) {
      const fieldErrors = {};
      res.details.forEach((err) => {
        fieldErrors[err.path] = err.msg;
      });
      setErrors(fieldErrors);
    }
  }
};
  const onSubmit = async (formData) => {
    const quoteData = {
      brandName: formData.companyName,
      email: formData.email,
      message: `Contact: ${formData.contactPerson}
Phone: ${formData.phone}
Quantity: ${formData.quantity}

${formData.description}`,
    };

    const res = await quotesAPI.create(quoteData);
    console.log(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-0 border-b border-gray-100">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Request a Quote
            </h2>
            <p className="text-gray-600 mt-2">
              Tell us about your project and we'll get back within 24 hours
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} className="text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 scroll">
          {!isAuthenticated && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-amber-900 font-medium">
                  Please log in to submit a quote request.
                </p>
                <p className="text-sm text-amber-700">
                  Only registered users can submit production requests.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}
          {/* Error / Success Message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle size={20} className="text-green-600 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="text-red-600 mt-0.5" />
              )}

              <p
                className={
                  message.type === "success" ? "text-green-800" : "text-red-800"
                }
              >
                {message.text}
              </p>
            </div>
          )}

          <QuoteForm
            onSubmit={handleSubmit}
            loading={loading}
            disabled={!isAuthenticated}
          />
        </div>
      </div>
    </div>
  );
}
