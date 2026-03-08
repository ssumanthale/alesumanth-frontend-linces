import { createContext, useState, useContext, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import esTranslations from '../translations/es.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const translations = language === 'en' ? enTranslations : esTranslations;

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  const t = (path) => {
    const keys = path.split('.');
    let value = translations;

    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${path}`);
        return path;
      }
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
