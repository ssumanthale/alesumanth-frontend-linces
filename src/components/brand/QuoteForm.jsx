import { useState } from "react";
import CTAButton from "./CTAButton";
import { quotesAPI } from "../../services/api";

const QuoteForm = ({ disabled = false, onClose }) => {
  const initialState = {
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    quantity: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({}); // ✅ NEW
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // ✅ Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrors({});

  const quoteData = {
    brandName: formData.companyName,
    email: formData.email,
    message: `Contact: ${formData.contactPerson}
Phone: ${formData.phone}
Quantity: ${formData.quantity}

${formData.description}`,
  };

  try {
    const { data } = await quotesAPI.create(quoteData);

    // ✅ SUCCESS
    if (data?.success) {
      setSuccess(true);
      setFormData(initialState);

      setTimeout(() => {
        onClose && onClose();
      }, 2000);
    }

  } catch (error) {
    console.error("Error submitting quote:", error);

    // 🔥 BACKEND VALIDATION ERRORS
    if (error.response?.data?.details) {
      const fieldErrors = {};

      error.response.data.details.forEach((err) => {
        fieldErrors[err.path] = err.msg;
      });

      setErrors(fieldErrors);
    } 
    // 🔥 GENERAL ERROR
    else {
      setErrors({ general: "An error occurred. Please try again." });
    }

  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      {success ? (
        <div className="text-center py-10 transition-all duration-300">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="text-lg font-semibold text-gray-900">
            Request Submitted!
          </h3>
          <p className="text-gray-500 mt-2">We'll get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3.5 rounded-xl border ${
                  errors.companyName ? "border-red-500" : "border-stone-300"
                }`}
                placeholder="Your brand name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3.5 rounded-xl border ${
                  errors.contactPerson ? "border-red-500" : "border-stone-300"
                }`}
                placeholder="Full name"
              />
              {errors.contactPerson && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactPerson}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3.5 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-stone-300"
                }`}
                placeholder="email@company.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3.5 rounded-xl border ${
                  errors.phone ? "border-red-500" : "border-stone-300"
                }`}
                placeholder="+91 9876543210"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Production Quantity
            </label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3.5 rounded-xl border ${
                errors.quantity ? "border-red-500" : "border-stone-300"
              }`}
              placeholder="e.g., 1000 units"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              {" "}
              Provide your estimated order quantity or range{" "}
            </p>{" "}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Details
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Tell us about your project... Include details about product type, materials, design requirements, timeline, and any special requests."
              className={`w-full px-4 py-3.5 rounded-xl border ${
                errors.description ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              {" "}
              Include product type, materials, design requirements, timeline,
              and special requests{" "}
            </p>
          </div>

          {/* Submit */}
          <CTAButton
            type="submit"
            disabled={loading || disabled}
            className={`${
              loading || disabled
                ? "cursor-not-allowed opacity-50 w-full"
                : "w-full"
            }`}
          >
            {disabled
              ? "Login to Submit Request"
              : loading
                ? "Submitting..."
                : "Submit Quote Request"}
          </CTAButton>
        </form>
      )}
    </div>
  );
};

export default QuoteForm;
