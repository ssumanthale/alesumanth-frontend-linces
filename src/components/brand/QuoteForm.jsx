import { useState } from "react";
import CTAButton from "./CTAButton";

const QuoteForm = ({
  onSubmit,
  loading = false,
  disabled = false,
  onClose,
}) => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await onSubmit(formData); // expect true/false

    if (res) {
      setSuccess(true);
      setFormData(initialState); // ✅ clear form

      // ⏳ Smooth close after 2 sec
      setTimeout(() => {
        onClose && onClose();
      }, 2000);
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
            {" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {" "}
                Brand Name{" "}
              </label>{" "}
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
                placeholder="Your brand name"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {" "}
                Contact Person{" "}
              </label>{" "}
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
                placeholder="Full name"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {" "}
                Email Address{" "}
              </label>{" "}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
                placeholder="email@company.com"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {" "}
                Phone Number{" "}
              </label>{" "}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
                placeholder="+1 (555) 000-0000"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {" "}
              Estimated Production Quantity{" "}
            </label>{" "}
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
              placeholder="e.g., 1000 units"
            />{" "}
            <p className="mt-2 text-sm text-gray-500">
              {" "}
              Provide your estimated order quantity or range{" "}
            </p>{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {" "}
              Project Details{" "}
            </label>{" "}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all resize-none"
              placeholder="Tell us about your project... Include details about product type, materials, design requirements, timeline, and any special requests."
            ></textarea>{" "}
            <p className="mt-2 text-sm text-gray-500">
              {" "}
              Include product type, materials, design requirements, timeline,
              and special requests{" "}
            </p>{" "}
          </div>
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
