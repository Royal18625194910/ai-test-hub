'use client';

import { SignIn } from '@clerk/nextjs';
import { useTranslationFallback } from '@/lib/hooks';
import { LanguageSwitcherFallback } from '@/components/language-switcher-fallback';
import { Brain, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const { t } = useTranslationFallback();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t('common.appName')}</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcherFallback />
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4 pt-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🧠</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {t('common.signIn')} {t('common.appName')}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {t('common.loginHint')}
            </p>
          </div>
          <SignIn 
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-in"
            forceRedirectUrl="/"
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl',
                headerTitle: 'text-slate-900 dark:text-white',
                headerSubtitle: 'text-slate-600 dark:text-slate-400',
                socialButtonsBlockButton: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700',
                formButtonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white',
                formFieldLabel: 'text-slate-700 dark:text-slate-300',
                formFieldInput: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white',
                footerActionLink: 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
