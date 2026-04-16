import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { contactAPI } from "../services/api";

const Contact = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await contactAPI.send(formData);
      setMessage({ type: "success", text: t("contact.form.success") });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: t("contact.form.error") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f6f2] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111]">
            {t("contact.title")}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-500 leading-8">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT - INFO */}
          <div className="space-y-10">
            <div className="flex items-start gap-4">
              <Mail size={20} className="text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-widest">
                  Email
                </p>
                <a
                  href="mailto:info@lincesckf.com"
                  className="text-lg text-[#111] hover:opacity-70 transition"
                >
                  info@lincesckf.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone size={20} className="text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-widest">
                  Phone
                </p>
                <p className="text-lg text-[#111]">+1 (234) 567-890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageSquare size={20} className="text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-widest">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#111] hover:opacity-70 transition"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-widest">
                  Address
                </p>
                <p className="text-lg text-[#111]">
                  123 Silk Avenue, Fashion District, NY
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock size={20} className="text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-widest">
                  Hours
                </p>
                <p className="text-lg text-[#111]">{t("contact.hoursValue")}</p>
              </div>
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="bg-white rounded-2xl p-10 border border-gray-100">
            <h2 className="text-2xl font-medium mb-8 tracking-tight">
              {t("contact.form.title")}
            </h2>

            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder={t("contact.form.name")}
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 bg-transparent py-3 focus:outline-none focus:border-black transition"
              />

              <input
                type="email"
                name="email"
                placeholder={t("contact.form.email")}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 bg-transparent py-3 focus:outline-none focus:border-black transition"
              />

              <textarea
                name="message"
                placeholder={t("contact.form.message")}
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border-b border-gray-300 bg-transparent py-3 focus:outline-none focus:border-black transition"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-full text-sm tracking-wide hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? t("common.loading") : t("contact.form.submit")}
              </button>
            </form>
          </div>
        </div>
        <div className="mb-14">
          <iframe
            title="Contact location"
            src="https://www.google.com/maps?q=123 Silk Avenue, Fashion District, NY&output=embed"
            className="w-full h-72 rounded-[28px] border border-gray-200 shadow-sm"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
