import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from 'next/font/google';
import { routing } from '@/src/i18n/routing';
import { notFound } from 'next/navigation';
import zhCN from '@/src/i18n/zh-CN.json';
import zhTW from '@/src/i18n/zh-TW.json';
import en from '@/src/i18n/en.json';
import '../globals.css';

const messages: Record<string, any> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata() {
  return {
    title: '测试题集合 Hub - 发现真实的自己',
    description: '通过精心设计的心理测试，深入了解你的性格特质、行为模式和潜在优势。',
    keywords: ['心理测试', '性格测试', '趣味测试', '自我探索', 'MBTI', '人格测试'],
    authors: [{ name: '测试题集合 Hub' }],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locale || routing.defaultLocale;
  
  if (!routing.locales.includes(safeLocale as any)) {
    notFound();
  }

  setRequestLocale(safeLocale);
  const localeMessages = messages[safeLocale] || messages[routing.defaultLocale];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <NextIntlClientProvider messages={localeMessages} locale={safeLocale}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
