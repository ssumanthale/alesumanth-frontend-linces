import { useState } from 'react';
import { Sparkles, Scissors, Package, Truck, CheckCircle, Users, ShieldCheck, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { quotesAPI } from '../services/api';
import SectionContainer from '../components/brand/SectionContainer';
import Card from '../components/brand/Card';
import ProcessStep from '../components/brand/ProcessStep';
import QuoteForm from '../components/brand/QuoteForm';
import CTAButton from '../components/brand/CTAButton';

const Services = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (formData) => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const quoteData = {
        brandName: formData.companyName,
        email: formData.email,
        message: `Contact: ${formData.contactPerson}\nPhone: ${formData.phone}\nQuantity: ${formData.quantity}\n\n${formData.description}`
      };

      await quotesAPI.create(quoteData);
      setMessage({ type: 'success', text: t('services.quote.success') });

      setTimeout(() => {
        window.location.href = '/quotes';
      }, 2000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setMessage({ type: 'error', text: error.response?.data?.error || t('services.quote.error') });
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <SectionContainer background="white" className="pt-24 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full mb-8">
            <Sparkles size={16} className="text-gray-900" />
            <span className="text-sm font-medium text-gray-900">Premium Manufacturing Partner</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            Bring Your Vision
            <br />
            <span className="text-stone-600">To Life</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            Partner with Linces'CKF for world-class silk garment manufacturing.
            From concept to creation, we deliver excellence at scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton onClick={scrollToForm}>
              Request a Quote
            </CTAButton>
            <CTAButton variant="secondary" icon={false}>
              View Portfolio
            </CTAButton>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="cream" className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Manufacturing Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions for fashion brands seeking premium silk production
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            icon={Scissors}
            title="Custom Design Manufacturing"
            description="Transform your designs into reality with our expert pattern making and sampling services"
          />
          <Card
            icon={Package}
            title="Private Label Production"
            description="Launch your own silk line with our white-label manufacturing expertise"
          />
          <Card
            icon={Users}
            title="Bulk Order Manufacturing"
            description="Scale your production with our high-capacity facilities and quality assurance"
          />
          <Card
            icon={ShieldCheck}
            title="Quality Assurance"
            description="Every piece undergoes rigorous quality control to meet luxury standards"
          />
        </div>
      </SectionContainer>

      <SectionContainer background="white" className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Why Partner With Us
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We combine traditional silk craftsmanship with modern manufacturing excellence,
              delivering products that meet the highest standards of luxury fashion.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
                  <CheckCircle size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Premium Materials
                  </h3>
                  <p className="text-gray-600">
                    100% authentic silk sourced from certified suppliers worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
                  <Clock size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Reliable Timelines
                  </h3>
                  <p className="text-gray-600">
                    On-time delivery with transparent production tracking and updates
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
                  <Truck size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Global Logistics
                  </h3>
                  <p className="text-gray-600">
                    Seamless shipping and customs handling to any destination
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
            Our Production Process
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A seamless journey from your initial concept to final delivery
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ProcessStep
            number="01"
            title="Design Consultation"
            description="Share your vision with our design team. We'll discuss materials, specifications, quantities, and provide expert guidance on bringing your concept to life."
          />
          <ProcessStep
            number="02"
            title="Fabric Selection & Sampling"
            description="Choose from our premium silk collection. We'll create samples for your approval, ensuring every detail meets your expectations before production begins."
          />
          <ProcessStep
            number="03"
            title="Sample Creation & Approval"
            description="Receive your prototype samples for review. We'll make any necessary adjustments until you're completely satisfied with the final design."
          />
          <ProcessStep
            number="04"
            title="Mass Production & Delivery"
            description="Once approved, we begin full-scale production with rigorous quality control at every stage. Your order is delivered on time, ready for market."
            isLast
          />
        </div>
      </SectionContainer>

      <SectionContainer background="white" className="py-24" id="quote-form">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Request a Quote
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about your project and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="bg-stone-50 rounded-3xl p-8 md:p-12 border border-stone-200">
            {message.text && (
              <div
                className={`mb-8 p-5 rounded-xl flex items-start gap-3 ${
                  message.type === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <CheckCircle
                  size={20}
                  className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}
                />
                <p className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                  {message.text}
                </p>
              </div>
            )}

            <QuoteForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="dark" className="py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
            Join the brands who trust Linces'CKF for premium silk manufacturing
          </p>
          <CTAButton variant="secondary" onClick={scrollToForm}>
            Get Started Today
          </CTAButton>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Services;
