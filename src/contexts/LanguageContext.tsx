
import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string, options?: any) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation();
  
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      localStorage.setItem('preferred-language', language);
      
      // Update document direction and lang attribute
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      
      // Force re-render by updating a CSS custom property
      document.documentElement.style.setProperty('--language-direction', language === 'ar' ? 'rtl' : 'ltr');
      
      console.log('Language changed to:', language);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  useEffect(() => {
    // Set initial direction based on current language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    document.documentElement.style.setProperty('--language-direction', isRTL ? 'rtl' : 'ltr');
    
    // Debug logging
    console.log('Current language:', currentLanguage, 'RTL:', isRTL);
  }, [currentLanguage, isRTL]);

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    t,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
