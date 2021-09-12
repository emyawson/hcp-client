import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { locales } from './locales';

export { translate } from './translate';

// eslint-disable-next-line import/no-named-as-default-member
export const i18n = i18next.use(LanguageDetector).init({
  defaultNS: 'translations',
  detection: {
    order: ['localstorage', 'navigator'],
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  ns: ['translations'],
  resources: locales,
});
