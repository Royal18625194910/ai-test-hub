'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, routing } from '@/src/i18n/routing';
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

  const currentLang = languages.find(lang => lang.code === locale) || languages[0];

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
      window.location.reload();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 px-3 hover:bg-amber-100 dark:hover:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">{currentLang.flag} {currentLang.name}</span>
        <span className="sm:hidden text-sm">{currentLang.flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white dark:bg-stone-800 shadow-lg border border-amber-200 dark:border-amber-800/50 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors ${
                locale === lang.code 
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' 
                  : 'text-stone-700 dark:text-amber-100'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
              {locale === lang.code && (
                <span className="ml-auto w-2 h-2 rounded-full bg-amber-500"></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
