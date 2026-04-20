'use client';

import { useEffect, useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import { useAuth, useUser } from '@clerk/nextjs';
import { getQuizById } from '@/data/quizzes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ArrowLeft, Brain, Sparkles, Share2, RotateCcw, Home, Lock, Unlock, LogIn, User } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

const StickerCard = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`relative ${className}`}
  >
    <div className="absolute inset-0 bg-stone-900 dark:bg-black rounded-xl translate-x-1 translate-y-1" />
    <div className="relative bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-600 rounded-xl">
      {children}
    </div>
  </motion.div>
);

export default function ResultPage({ params }: ResultPageProps) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultId = searchParams.get('result');
  const resolvedParams = use(params);
  const quiz = getQuizById(resolvedParams.id);
  const [isReady, setIsReady] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!quiz || !resultId) {
      router.push('/');
      return;
    }
    setIsReady(true);
  }, [quiz, resultId, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsUnlocked(true);
    }
  }, [isLoaded, isSignedIn]);

  if (!quiz || !resultId || !isReady) {
    return null;
  }

  const result = quiz.results.find(r => r.id === resultId) || quiz.results[0];

  const getTranslatedResultTitle = () => {
    try {
      return t(`quizzes.${quiz.id}.results.${result.id}.title`);
    } catch {
      return result.title;
    }
  };

  const getTranslatedResultDescription = () => {
    try {
      return t(`quizzes.${quiz.id}.results.${result.id}.description`);
    } catch {
      return result.description;
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'analyst': return '🔍';
      case 'diplomat': return '💫';
      case 'sentinel': return '🛡️';
      case 'explorer': return '🎯';
      case 'executive': return '👑';
      case 'campaigner': return '🌟';
      default: return '✨';
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'analyst': return 'from-amber-500 to-yellow-500';
      case 'diplomat': return 'from-orange-500 to-amber-500';
      case 'sentinel': return 'from-amber-600 to-orange-500';
      case 'explorer': return 'from-orange-500 to-red-500';
      case 'executive': return 'from-red-500 to-orange-500';
      case 'campaigner': return 'from-amber-500 to-orange-600';
      default: return 'from-amber-500 to-orange-500';
    }
  };

  const handleUnlock = () => {
    if (!isSignedIn) {
      router.push('/sign-in?redirect_url=' + encodeURIComponent(window.location.pathname + window.location.search));
    } else {
      setIsUnlocked(true);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:from-stone-900 dark:to-amber-950">
      <header className="sticky top-0 z-[60] bg-amber-50/95 dark:bg-stone-900/95 backdrop-blur-sm py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-stone-900 dark:bg-black rounded-xl translate-x-1 translate-y-1" />
            <div className="relative bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-600 rounded-xl">
              <div className="px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-stone-900 dark:text-stone-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-bold">{t('common.appName')}</span>
                </Link>

                <div className="flex items-center gap-2">
                  {isLoaded && isSignedIn && user ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center border-2 border-stone-900">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-stone-600 dark:text-stone-400 font-medium">
                        {user.emailAddresses[0]?.emailAddress || user.username}
                      </span>
                    </div>
                  ) : (
                    <Link href="/sign-in" className="flex items-center gap-2 text-stone-900 dark:text-stone-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                      <LogIn className="w-5 h-5" />
                      <span className="font-bold">{t('common.signIn') || '登录'}</span>
                    </Link>
                  )}
                  <LanguageSwitcher />
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center border-2 border-stone-900">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <StickerCard delay={0.1} className="mb-8">
          <div className="p-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-stone-900 dark:border-stone-600 bg-white dark:bg-stone-800 rounded-md mb-4">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                {t('common.testCompleted') || '测试完成'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-stone-100 mb-2">
              {t('common.yourResult') || '你的测试结果'}
            </h1>
            <p className="text-stone-600 dark:text-stone-400 font-medium">
              {t(`quizzes.${quiz.id}.title`)}
            </p>
          </div>
        </StickerCard>

        {!isUnlocked ? (
          <StickerCard delay={0.2}>
            <Card className="border-0 bg-transparent overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-stone-400 to-stone-500"></div>
              
              <CardHeader className="text-center pb-4 pt-8">
                <div className="text-7xl mb-4">
                  🔒
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black text-stone-900 dark:text-stone-100">
                  {t('common.resultLocked') || '结果已锁定'}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-8">
                <div className="bg-amber-50/50 dark:bg-stone-700/50 rounded-2xl p-6 mb-6">
                  <p className="text-stone-700 dark:text-stone-100 leading-relaxed text-lg text-center font-medium">
                    {t('common.loginToViewResult') || '登录后即可查看你的完整测试结果，了解你的性格特质和行为模式。'}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={handleUnlock}
                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2 w-full sm:w-auto text-lg py-6 px-8 font-black border-2 border-stone-900 dark:border-stone-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(120,113,108,1)] hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <Unlock className="w-5 h-5" />
                    {isSignedIn ? (t('common.unlockResult') || '解锁查看结果') : (t('common.loginToUnlock') || '登录解锁结果')}
                  </Button>
                  
                  {!isSignedIn && (
                    <p className="text-sm text-stone-500 dark:text-stone-400 text-center font-medium">
                      {t('common.loginHint') || '使用邮箱验证码登录，无需密码，首次登录自动注册'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </StickerCard>
        ) : (
          <StickerCard delay={0.2}>
            <Card className="border-0 bg-transparent overflow-hidden">
              <div className={`h-3 bg-gradient-to-r ${getResultColor(result.type)}`}></div>
              
              <CardHeader className="text-center pb-4 pt-8">
                <div className="text-7xl mb-4">
                  {getResultIcon(result.type)}
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black text-stone-900 dark:text-stone-100">
                  {getTranslatedResultTitle()}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-8">
                <div className="bg-amber-50/50 dark:bg-stone-700/50 rounded-2xl p-6 mb-6">
                  <p className="text-stone-700 dark:text-stone-100 leading-relaxed text-lg font-medium">
                    {getTranslatedResultDescription()}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StickerCard delay={0.3} className="border-0 bg-transparent">
                    <div className="text-center p-4">
                      <div className="text-2xl mb-1">🧠</div>
                      <div className="text-sm text-stone-600 dark:text-stone-400 font-medium">{t('common.thinkingStyle') || '思维方式'}</div>
                    </div>
                  </StickerCard>
                  <StickerCard delay={0.35} className="border-0 bg-transparent">
                    <div className="text-center p-4">
                      <div className="text-2xl mb-1">💡</div>
                      <div className="text-sm text-stone-600 dark:text-stone-400 font-medium">{t('common.creativePotential') || '创意潜能'}</div>
                    </div>
                  </StickerCard>
                  <StickerCard delay={0.4} className="border-0 bg-transparent">
                    <div className="text-center p-4">
                      <div className="text-2xl mb-1">🤝</div>
                      <div className="text-sm text-stone-600 dark:text-stone-400 font-medium">{t('common.socialSkills') || '社交能力'}</div>
                    </div>
                  </StickerCard>
                  <StickerCard delay={0.45} className="border-0 bg-transparent">
                    <div className="text-center p-4">
                      <div className="text-2xl mb-1">⚡</div>
                      <div className="text-sm text-stone-600 dark:text-stone-400 font-medium">{t('common.actionAbility') || '行动力'}</div>
                    </div>
                  </StickerCard>
                </div>
              </CardContent>
            </Card>
          </StickerCard>
        )}

        <div className="mt-8">
          <StickerCard delay={0.5}>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => router.push(`/quiz/${quiz.id}`)}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white gap-2 text-lg px-8 py-6 h-auto font-bold border-2 border-stone-900 dark:border-stone-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(120,113,108,1)] hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  {t('common.retakeQuiz') || '重新测试'}
                </Button>
                
                <Button
                  onClick={() => router.push('/')}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white gap-2 text-lg px-8 py-6 h-auto font-bold border-2 border-stone-900 dark:border-stone-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(120,113,108,1)] hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <Home className="w-5 h-5" />
                  {t('common.browseMore') || '浏览更多测试'}
                </Button>

                {isUnlocked && (
                  <Button
                    className={`w-full sm:w-auto bg-gradient-to-r ${getResultColor(result.type)} hover:opacity-90 text-white gap-2 font-black border-2 border-stone-900 dark:border-stone-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(120,113,108,1)] hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all`}
                  >
                    <Share2 className="w-4 h-4" />
                    {t('common.shareResult') || '分享结果'}
                  </Button>
                )}
              </div>
            </div>
          </StickerCard>
        </div>

        <div className="mt-8 text-center">
          <p className="text-stone-500 dark:text-stone-400 text-sm font-medium">
            {t('common.forEntertainment') || '注意：本测试仅供娱乐参考，不构成专业心理评估。'}
          </p>
        </div>
      </main>
    </div>
  );
}
