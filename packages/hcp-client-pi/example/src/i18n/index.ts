import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';

import { locales } from './locales';

const instance = i18n.use(LanguageDetector).init({
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  resources: locales,
  detection: {
    order: ['localstorage', 'navigator'],
  },
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
});

export default instance;
