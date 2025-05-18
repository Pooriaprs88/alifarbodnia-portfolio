import { useParams } from 'next/navigation';
import enTranslations from '../translations/en.json';
import frTranslations from '../translations/fr.json';

const translations = {
  en: enTranslations,
  fr: frTranslations,
} as const;

type TranslationKey = keyof typeof translations;

export function useTranslation() {
  const params = useParams();
  const locale = (Array.isArray(params?.locale) ? params.locale[0] : params?.locale || 'en') as TranslationKey;
  
  const t = (key: string): string => {
    if (!key) return '';
    
    try {
      const keys = key.split('.');
      let value: any = translations[locale];
      
      for (const k of keys) {
        if (!value || typeof value !== 'object') {
          return key;
        }
        value = value[k];
      }
      
      return typeof value === 'string' ? value : key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  return {
    t,
    locale
  };
} 