'use client';

import { useState, useEffect, useCallback } from 'react';
import { routing } from '@/src/i18n/routing';
import zhCN from '@/src/i18n/zh-CN.json';
import zhTW from '@/src/i18n/zh-TW.json';
import en from '@/src/i18n/en.json';

const LOCALE_STORAGE_KEY = 'ai-test-hub-locale';

const messages: Record<string, any> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
};

export function useTranslationFallback() {
  const [locale, setLocale] = useState<string>(routing.defaultLocale);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && routing.locales.includes(stored as any)) {
        setLocale(stored);
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('zh-tw') || browserLang.startsWith('zh-hk')) {
          setLocale('zh-TW');
        } else if (browserLang.startsWith('zh')) {
          setLocale('zh-CN');
        } else if (browserLang.startsWith('en')) {
          setLocale('en');
        }
      }
    } catch (e) {
      console.warn('Failed to read locale:', e);
    }
    setIsLoaded(true);
  }, []);

  const t = useCallback((key: string, defaultValue?: string): string => {
    const keys = key.split('.');
    let value: any = messages[locale] || messages[routing.defaultLocale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }
    
    return typeof value === 'string' ? value : defaultValue || key;
  }, [locale]);

  const saveLocale = useCallback((newLocale: string) => {
    if (routing.locales.includes(newLocale as any)) {
      setLocale(newLocale);
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      } catch (e) {
        console.warn('Failed to save locale:', e);
      }
    }
  }, []);

  return {
    t,
    locale,
    saveLocale,
    isLoaded,
    availableLocales: routing.locales,
    defaultLocale: routing.defaultLocale,
  };
}
