import { useLanguage } from '../contexts/LanguageContext';
import { Award, Heart, Users, Target } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
              alt="About Linces'CKF"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('about.story.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">{t('about.story.content')}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('about.mission.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">{t('about.mission.content')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.values.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Award className="text-gray-800" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('about.values.quality')}
              </h3>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Heart className="text-gray-800" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('about.values.sustainability')}
              </h3>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Users className="text-gray-800" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('about.values.craftsmanship')}
              </h3>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Target className="text-gray-800" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('about.values.integrity')}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
