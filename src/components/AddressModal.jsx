import { useState } from "react";
import { X, MapPin } from "lucide-react";

const AddressModal = ({ isOpen, onClose, onSave, initialAddress = null }) => {
  const [formData, setFormData] = useState({
    phone: initialAddress?.phone || "",
    line1: initialAddress?.line1 || "",
    line2: initialAddress?.line2 || "",
    city: initialAddress?.city || "",
    state: initialAddress?.state || "",
    pincode: initialAddress?.pincode || "",
    country: initialAddress?.country || "USA",
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.line1.trim()) newErrors.line1 = "Address line 1 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving address:", error);
      setErrors({ general: "Failed to save address. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <MapPin size={20} className="text-gray-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {initialAddress ? "Edit Address" : "Add Delivery Address"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Enter your complete delivery information
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* FORM */}
        <div className="overflow-y-auto p-6">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (234) 567-890"
                className={`w-full px-4 py-3 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* ADDRESS LINE 1 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="line1"
                value={formData.line1}
                onChange={handleChange}
                placeholder="Street address, P.O. box"
                className={`w-full px-4 py-3 border ${
                  errors.line1 ? "border-red-500" : "border-gray-300"
                } rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all`}
              />
              {errors.line1 && (
                <p className="text-red-500 text-sm mt-1">{errors.line1}</p>
              )}
            </div>

            {/* ADDRESS LINE 2 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                name="line2"
                value={formData.line2}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
              />
            </div>

            {/* CITY + STATE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={`w-full px-4 py-3 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className={`w-full px-4 py-3 border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            {/* PINCODE + COUNTRY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="ZIP / Postal code"
                  className={`w-full px-4 py-3 border ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  } rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className={`w-full px-4 py-3 border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all`}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
