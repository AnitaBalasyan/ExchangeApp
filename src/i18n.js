import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru/translation.json";
import en from "./locales/en/translation.json";
import hay from "./locales/hay/translation.json"

i18n.use(initReactI18next).init({
  fallbackLng: localStorage.getItem("lang") || "en",
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
    hay: {
      translation: hay,
    }
  },
});

export default i18n;
