import * as i18next from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';

import { locales } from './locales';

export { translate } from './translate';
// eslint-disable-next-line
export const i18n = i18next.use(LanguageDetector).init({
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  resources: locales,
  detection: {
    order: ['localstorage', 'navigator'],
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
});
