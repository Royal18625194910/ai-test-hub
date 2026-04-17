'use client';

import { useState, useEffect, useCallback } from 'react';
import { routing } from '@/src/i18n/routing';

const LOCALE_STORAGE_KEY = 'ai-test-hub-locale';

export function useLanguageStorage() {
  const [savedLocale, setSavedLocale] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && routing.locales.includes(stored as any)) {
        setSavedLocale(stored);
      }
    } catch (e) {
      console.warn('Failed to read locale from localStorage:', e);
    }
  }, []);

  const saveLocale = useCallback((locale: string) => {
    try {
      if (routing.locales.includes(locale as any)) {
        localStorage.setItem(LOCALE_STORAGE_KEY, locale);
        setSavedLocale(locale);
        try {
          document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
        } catch (e) {
          console.warn('Failed to set locale cookie:', e);
        }
      }
    } catch (e) {
      console.warn('Failed to save locale to localStorage:', e);
    }
  }, []);

  const getStoredLocale = useCallback((): string | null => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && routing.locales.includes(stored as any)) {
        return stored;
      }
    } catch (e) {
      console.warn('Failed to read locale from localStorage:', e);
    }
    return null;
  }, []);

  return {
    savedLocale,
    saveLocale,
    getStoredLocale,
    defaultLocale: routing.defaultLocale,
    availableLocales: routing.locales,
  };
}

export function getStoredLocaleServer(): string | null {
  return null;
}
