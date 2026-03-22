import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { Award, Heart, Users, Target } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#f8f6f2] text-[#111]">
      {/* HERO */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
          {t("about.title")}
        </h1>
        <p className="mt-6 text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {t("about.subtitle")}
        </p>
      </div>

      {/* IMAGE + STORY */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-20">
        {/* IMAGE */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
            alt="About Linces'CKF"
            className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
          />
        </div>

        {/* STORY */}
        <div>
          <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
            {t("about.story.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            {t("about.story.content")}
          </p>

          <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
            {t("about.mission.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("about.mission.content")}
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200 my-10"></div>

      {/* VALUES */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl text-center font-medium mb-16 tracking-tight">
          {t("about.values.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div className="group">
            <div className="flex justify-center mb-5">
              <Award
                size={28}
                className="text-gray-700 group-hover:text-black transition"
              />
            </div>
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              Excellence
            </h3>
            <p className="text-gray-800 font-medium">
              {t("about.values.quality")}
            </p>
          </div>

          <div className="group">
            <div className="flex justify-center mb-5">
              <Heart
                size={28}
                className="text-gray-700 group-hover:text-black transition"
              />
            </div>
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              Responsibility
            </h3>
            <p className="text-gray-800 font-medium">
              {t("about.values.sustainability")}
            </p>
          </div>

          <div className="group">
            <div className="flex justify-center mb-5">
              <Users
                size={28}
                className="text-gray-700 group-hover:text-black transition"
              />
            </div>
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              Craft
            </h3>
            <p className="text-gray-800 font-medium">
              {t("about.values.craftsmanship")}
            </p>
          </div>

          <div className="group">
            <div className="flex justify-center mb-5">
              <Target
                size={28}
                className="text-gray-700 group-hover:text-black transition"
              />
            </div>
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              Integrity
            </h3>
            <p className="text-gray-800 font-medium">
              {t("about.values.integrity")}
            </p>
          </div>
        </div>
      </div>

      {/* CTA SECTION (NEW - VERY IMPORTANT) */}
      <div className="bg-black text-white py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-medium mb-6">
          {t("about.finalCTA.title")}
        </h2>
        <button className="px-8 py-3 rounded-full bg-white text-black text-sm tracking-wide hover:bg-gray-200 transition">
          {t("about.finalCTA.work")}
        </button>
      </div>
    </div>
  );
};

export default About;
