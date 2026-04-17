'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
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

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function getStoredLocale(): string {
  if (typeof window === 'undefined') {
    return routing.defaultLocale;
  }
  
  try {
    const cookieLocale = getCookie('NEXT_LOCALE');
    if (cookieLocale && routing.locales.includes(cookieLocale as any)) {
      return cookieLocale;
    }
  } catch (e) {
    console.warn('Failed to read cookie:', e);
  }
  
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && routing.locales.includes(stored as any)) {
      return stored;
    }
  } catch (e) {
    console.warn('Failed to read locale from localStorage:', e);
  }
  
  try {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh-tw') || browserLang.startsWith('zh-hk')) {
      return 'zh-TW';
    } else if (browserLang.startsWith('zh')) {
      return 'zh-CN';
    } else if (browserLang.startsWith('en')) {
      return 'en';
    }
  } catch (e) {
    console.warn('Failed to read browser language:', e);
  }
  
  return routing.defaultLocale;
}

function subscribe(callback: () => void) {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === LOCALE_STORAGE_KEY) {
      callback();
    }
  };
  
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }
  
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
  };
}

export function useTranslationFallback() {
  const locale = useSyncExternalStore(
    subscribe,
    getStoredLocale,
    () => routing.defaultLocale
  );

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
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      } catch (e) {
        console.warn('Failed to save locale:', e);
      }
      window.dispatchEvent(new StorageEvent('storage', { key: LOCALE_STORAGE_KEY }));
    }
  }, []);

  return {
    t,
    locale,
    saveLocale,
    isLoaded: true,
    availableLocales: routing.locales,
    defaultLocale: routing.defaultLocale,
  };
}
