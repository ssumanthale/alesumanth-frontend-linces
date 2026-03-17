import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import CTAButton from './CTAButton';

const QuoteForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    quantity: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
            placeholder="Your brand name"
          />
        </div>

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
            className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
            placeholder="Full name"
          />
        </div>

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
            className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
            placeholder="email@company.com"
          />
        </div>

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
            className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

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
          className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
          placeholder="e.g., 1000 units"
        />
        <p className="mt-2 text-sm text-gray-500">
          Provide your estimated order quantity or range
        </p>
      </div>

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
          className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all resize-none"
          placeholder="Tell us about your project... Include details about product type, materials, design requirements, timeline, and any special requests."
        ></textarea>
        <p className="mt-2 text-sm text-gray-500">
          Include product type, materials, design requirements, timeline, and special requests
        </p>
      </div>

      <CTAButton
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Submitting...' : 'Submit Quote Request'}
      </CTAButton>
    </form>
  );
};

export default QuoteForm;
