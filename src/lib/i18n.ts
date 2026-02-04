import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa os arquivos de tradução
import enTranslations from '../locales/en.json';
import ptTranslations from '../locales/pt.json';
import esTranslations from '../locales/es.json'; // <--- NOVO
import frTranslations from '../locales/fr.json'; // <--- NOVO

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true, // Mantém true enquanto estiver desenvolvendo para ver logs
    
    resources: {
      en: { 
        translation: enTranslations 
      },
      pt: { 
        translation: ptTranslations 
      },
      // 👇 Registrando os novos idiomas
      es: { 
        translation: esTranslations 
      },
      fr: { 
        translation: frTranslations 
      },
    },
    
    fallbackLng: 'en', // Inglês continua sendo o "paraquedas"
    supportedLngs: ['en', 'pt', 'es', 'fr'], // <--- Adicionado es e fr
    
    // O PULO DO GATO (Mantido)
    load: 'languageOnly', 
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;