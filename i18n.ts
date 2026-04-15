import { createI18nClient } from 'next-intl/client';

export const { I18nProvider, useLocale, useTranslations, useFormatter, useNow, useTimeZone } = createI18nClient({
  locales: ['en', 'zh-CN', 'zh-TW'],
  defaultLocale: 'zh-CN'
});
