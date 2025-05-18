import { generateStaticParams } from './generateStaticParams';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export { generateStaticParams };

export const metadata: Metadata = {
  title: 'Ali Farbodnia - Iranian Folk Woodwind Instrumentalist',
  description: 'Official website of Ali Farbodnia, Iranian folk woodwind instrumentalist and composer',
};

// @ts-expect-error Server Component props are typed by Next.js
export default function LocaleLayout({ children, params }) {
  const locale = params.locale;
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
} 