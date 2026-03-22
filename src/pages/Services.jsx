import { useState } from "react";
import {
  Sparkles,
  Scissors,
  Package,
  Truck,
  CheckCircle,
  Users,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import SectionContainer from "../components/brand/SectionContainer";
import Card from "../components/brand/Card";
import ProcessStep from "../components/brand/ProcessStep";
import CTAButton from "../components/brand/CTAButton";
import QuoteModal from "../components/QuoteModal";

const Services = () => {
  const { t } = useLanguage();

  const [openQuoteModal, setOpenQuoteModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SectionContainer background="white" className="pt-24 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full mb-8">
            <Sparkles size={16} className="text-gray-900" />
            <span className="text-sm font-medium text-gray-900">
              Premium Manufacturing Partner
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            {t("services.hero.title.line1")}
            <br />
            <span className="text-stone-600">
              {t("services.hero.title.line2")}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            {t("services.hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton onClick={() => setOpenQuoteModal(true)}>
              {t("services.hero.ctaPrimary")}
            </CTAButton>

            <CTAButton variant="secondary" icon={false}>
              {t("services.hero.ctaSecondary")}
            </CTAButton>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="cream" className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t("services.capabilities.title")}
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("services.capabilities.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            icon={Scissors}
            title={t("services.capabilities.custom.title")}
            description={t("services.capabilities.custom.desc")}
          />
          <Card
            icon={Package}
            title={t("services.capabilities.private.title")}
            description={t("services.capabilities.private.desc")}
          />
          <Card
            icon={Users}
            title={t("services.capabilities.bulk.title")}
            description={t("services.capabilities.bulk.desc")}
          />
          <Card
            icon={ShieldCheck}
            title={t("services.capabilities.quality.title")}
            description={t("services.capabilities.quality.desc")}
          />
        </div>
      </SectionContainer>

      <SectionContainer background="white" className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {t("services.why.title")}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {t("services.why.description")}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
                  <CheckCircle size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("services.why.points.materials.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("services.why.points.materials.desc")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
                  <Clock size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("services.why.points.timeline.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("services.why.points.timeline.desc")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
                  <Truck size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("services.why.points.logistics.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("services.why.points.logistics.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-stone-200 to-stone-300 overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg"
                alt="Manufacturing facility"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-stone-100 rounded-2xl -z-10"></div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="cream" className="py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t("services.process.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("services.process.subtitle")}{" "}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ProcessStep
            number="01"
            title={t("services.process.steps.step1.title")}
            description={t("services.process.steps.step1.desc")}
          />
          <ProcessStep
            number="02"
            title={t("services.process.steps.step2.title")}
            description={t("services.process.steps.step2.desc")}
          />
          <ProcessStep
            number="03"
            title={t("services.process.steps.step3.title")}
            description={t("services.process.steps.step3.desc")}
          />
          <ProcessStep
            number="04"
            title={t("services.process.steps.step4.title")}
            description={t("services.process.steps.step4.desc")}
            isLast
          />
        </div>
      </SectionContainer>

      <div className="text-center py-24">
        <h2 className="text-4xl font-bold mb-6">
          {t("services.custom.title")}
        </h2>

        <button
          onClick={() => setOpenQuoteModal(true)}
          className="px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          {t("services.custom.cta")}
        </button>
      </div>

      <CTAButton>{t("services.final.cta")}</CTAButton>
      <SectionContainer background="dark" className="py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("services.final.title")}
          </h2>
          <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
            {t("services.final.subtitle")}
          </p>
          <CTAButton
            variant="secondary"
            onClick={() => setOpenQuoteModal(true)}
          >
            {t("services.final.cta")}
          </CTAButton>
        </div>
      </SectionContainer>
      <QuoteModal
        isOpen={openQuoteModal}
        onClose={() => setOpenQuoteModal(false)}
      />
    </div>
  );
};

export default Services;
