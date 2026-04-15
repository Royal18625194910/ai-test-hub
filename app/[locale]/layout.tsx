import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { routing } from '@/src/i18n/routing';
import { notFound } from 'next/navigation';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    'zh-CN': '测试题集合 Hub - 发现真实的自己',
    'zh-TW': '測試題集合 Hub - 發現真實的自己',
    'en': 'Quiz Hub - Discover Your True Self',
  };
  
  const descriptions: Record<string, string> = {
    'zh-CN': '通过精心设计的心理测试，深入了解你的性格特质、行为模式和潜在优势。',
    'zh-TW': '通過精心設計的心理測試，深入了解你的性格特質、行為模式和潛在優勢。',
    'en': 'Through carefully designed psychological tests, gain deep insights into your personality traits, behavioral patterns, and potential strengths.',
  };

  return {
    title: titles[locale] || titles['zh-CN'],
    description: descriptions[locale] || descriptions['zh-CN'],
    keywords: ['心理测试', '性格测试', '趣味测试', '自我探索', 'MBTI', '人格测试'],
    authors: [{ name: '测试题集合 Hub' }],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <NextIntlClientProvider messages={messages}>
        <html
          lang={locale}
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
          <body className="min-h-full flex flex-col">{children}</body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
