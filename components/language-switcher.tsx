'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, routing } from '@/src/i18n/routing';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

const LOCALE_STORAGE_KEY = 'ai-test-hub-locale';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveLocale = useCallback((newLocale: string) => {
    try {
      if (routing.locales.includes(newLocale as any)) {
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
        try {
          document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        } catch (e) {
          console.warn('Failed to set locale cookie:', e);
        }
      }
    } catch (e) {
      console.warn('Failed to save locale to localStorage:', e);
    }
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    saveLocale(newLocale);
    setIsOpen(false);
    
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const segments = currentPath.split('/');
      
      if (segments.length > 1 && routing.locales.includes(segments[1] as any)) {
        segments[1] = newLocale;
      } else {
        segments.splice(1, 0, newLocale);
      }
      
      const newPath = segments.join('/') || `/${newLocale}`;
      const searchParams = window.location.search;
      window.location.href = newPath + searchParams;
    }
  };

  const currentLang = languages.find(lang => lang.code === locale) || languages[0];

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2">
        <Globe className="w-4 h-4 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">{currentLang.flag} {currentLang.name}</span>
        <span className="sm:hidden text-sm">{currentLang.flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                locale === lang.code 
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                  : 'text-slate-700 dark:text-slate-300'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
              {locale === lang.code && (
                <span className="ml-auto w-2 h-2 rounded-full bg-purple-500"></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
