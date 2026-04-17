import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';
import en from './en.json';

const messages: Record<string, any> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
};

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !routing.locales.includes(locale as any)) {
    return {
      locale: routing.defaultLocale,
      messages: messages[routing.defaultLocale]
    };
  }

  return {
    locale,
    messages: messages[locale]
  };
});
