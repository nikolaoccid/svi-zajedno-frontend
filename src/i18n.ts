import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enJSON from './locale/en.json';
import hrJSON from './locale/hr.json';
i18n.use(initReactI18next).init({
  resources: {
    hr: { ...hrJSON },
    en: { ...enJSON },
  },
  lng: import.meta.env.VITE_I18N_DEFAULT_LOCALE ?? 'en',
});
