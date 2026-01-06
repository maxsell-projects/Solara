import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa os teus ficheiros JSON que criaste antes
import enTranslations from '../locales/en.json';
import ptTranslations from '../locales/pt.json';

i18n
  .use(LanguageDetector) // Deteta o idioma do browser (se quiseres)
  .use(initReactI18next) // Passa a instância para o react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
    },
    fallbackLng: 'en', // Se falhar, vai para Inglês
    lng: 'en', // Força o inicio em Inglês (podes tirar isto se quiseres detetar auto)
    interpolation: {
      escapeValue: false, // React já protege contra XSS
    },
  });

export default i18n;