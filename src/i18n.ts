import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

const backendOpts = {
  loadPath: `assets/locales/{{lng}}/{{ns}}.json`
}

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    backend: backendOpts,
    lng: 'en',
    fallbackLng: 'en',
    react: {
      wait: true,
    }
  });

export default i18n;