import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '../locales/en.json';
import ptTranslations from '../locales/pt.json';



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true, // Ativado para ajudar a ver erros no Console (F12)
    
    resources: {
      en: { 
        translation: enTranslations 
      },
      pt: { 
        translation: ptTranslations 
      },
    },
    
    fallbackLng: 'en', // Se der tudo errado, usa inglês
    supportedLngs: ['en', 'pt'], // Lista oficial de idiomas
    
    // --- O PULO DO GATO ---
    // Isso garante que se o navegador for 'pt-BR' ou 'pt-PT', ele use 'pt'
    load: 'languageOnly', 
    
    detection: {
      // 1. Procura no localStorage (se o usuário já escolheu antes)
      // 2. Se não achar, vê o idioma do navegador
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // Salva a escolha para a próxima vez
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;