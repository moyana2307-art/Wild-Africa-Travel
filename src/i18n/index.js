import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './resources/en';
import { sn } from './resources/sn';
import { zh } from './resources/zh';

const savedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem('wat-language') : null;

i18n.use(initReactI18next).init({
  resources: { en, sn, zh },
  lng: savedLanguage && ['en', 'sn', 'zh'].includes(savedLanguage) ? savedLanguage : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false
});

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('wat-language', language);
  }
});

export const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'sn', label: 'SN', name: 'Shona' },
  { code: 'zh', label: '中文', name: '简体中文' }
];

export default i18n;
