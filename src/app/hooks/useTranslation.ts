import { useParams } from 'next/navigation';
import en from '../../../locales/en.json';
import fr from '../../../locales/fr.json';

const translations: any = { en, fr };

export function useTranslation() {
  const params = useParams();
  // Next.js App Router: locale is the first segment if i18n is enabled
  const locale = Array.isArray(params?.locale) ? params.locale[0] : params?.locale || 'en';
  return translations[locale as 'en' | 'fr'] || translations.en;
} 