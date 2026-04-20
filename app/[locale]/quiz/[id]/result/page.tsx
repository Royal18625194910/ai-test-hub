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

interface ResultPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-stone-900 dark:to-amber-950">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-stone-900/90 border-b border-amber-200 dark:border-amber-800/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t('common.appName')}</span>
            </Link>
            <div className="flex items-center gap-2">
              {isLoaded && isSignedIn && user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-stone-600 dark:text-amber-200/70">
                    {user.emailAddresses[0]?.emailAddress || user.username}
                  </span>
                </div>
              ) : (
                <Link href="/sign-in" className="flex items-center gap-2 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors">
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">{t('common.signIn') || '登录'}</span>
                </Link>
              )}
              <LanguageSwitcher />
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                <Brain className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 flex items-center gap-1 mx-auto bg-amber-100/50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
              <Sparkles className="w-3 h-3" />
              {t('common.testCompleted') || '测试完成'}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-amber-50 mb-2">
              {t('common.yourResult') || '你的测试结果'}
            </h1>
            <p className="text-stone-600 dark:text-amber-200/60">
              {t(`quizzes.${quiz.id}.title`)}
            </p>
          </div>
        </BlurFade>

        {!isUnlocked ? (
          <BlurFade delay={0.2} inView>
            <Card className="border-amber-200/50 dark:border-amber-800/30 bg-white dark:bg-stone-800 shadow-xl overflow-hidden shadow-lg shadow-amber-100/50 dark:shadow-stone-900/50">
              <div className="h-3 bg-gradient-to-r from-stone-400 to-stone-500"></div>
              
              <CardHeader className="text-center pb-4 pt-8">
                <div className="text-7xl mb-4">
                  🔒
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-amber-50">
                  {t('common.resultLocked') || '结果已锁定'}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-8">
                <div className="bg-amber-50/50 dark:bg-stone-700/50 rounded-2xl p-6 mb-6">
                  <p className="text-stone-700 dark:text-amber-100 leading-relaxed text-lg text-center">
                    {t('common.loginToViewResult') || '登录后即可查看你的完整测试结果，了解你的性格特质和行为模式。'}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={handleUnlock}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white gap-2 w-full sm:w-auto text-lg py-6 px-8 shadow-lg shadow-orange-500/30"
                  >
                    <Unlock className="w-5 h-5" />
                    {isSignedIn ? (t('common.unlockResult') || '解锁查看结果') : (t('common.loginToUnlock') || '登录解锁结果')}
                  </Button>
                  
                  {!isSignedIn && (
                    <p className="text-sm text-stone-500 dark:text-amber-200/50 text-center">
                      {t('common.loginHint') || '使用邮箱验证码登录，无需密码，首次登录自动注册'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ) : (
          <BlurFade delay={0.2} inView>
            <Card className="border-amber-200/50 dark:border-amber-800/30 bg-white dark:bg-stone-800 shadow-xl overflow-hidden shadow-lg shadow-amber-100/50 dark:shadow-stone-900/50">
              <div className={`h-3 bg-gradient-to-r ${getResultColor(result.type)}`}></div>
              
              <CardHeader className="text-center pb-4 pt-8">
                <div className="text-7xl mb-4">
                  {getResultIcon(result.type)}
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-amber-50">
                  {getTranslatedResultTitle()}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-8">
                <div className="bg-amber-50/50 dark:bg-stone-700/50 rounded-2xl p-6 mb-6">
                  <p className="text-stone-700 dark:text-amber-100 leading-relaxed text-lg">
                    {getTranslatedResultDescription()}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <div className="text-2xl mb-1">🧠</div>
                    <div className="text-sm text-stone-600 dark:text-amber-200/70">{t('common.thinkingStyle') || '思维方式'}</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <div className="text-2xl mb-1">💡</div>
                    <div className="text-sm text-stone-600 dark:text-amber-200/70">{t('common.creativePotential') || '创意潜能'}</div>
                  </div>
                  <div className="text-center p-4 bg-amber-100/50 dark:bg-amber-800/20 rounded-xl">
                    <div className="text-2xl mb-1">🤝</div>
                    <div className="text-sm text-stone-600 dark:text-amber-200/70">{t('common.socialSkills') || '社交能力'}</div>
                  </div>
                  <div className="text-center p-4 bg-orange-100/50 dark:bg-orange-800/20 rounded-xl">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-sm text-stone-600 dark:text-amber-200/70">{t('common.actionAbility') || '行动力'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        <BlurFade delay={0.4} inView>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/quiz/${quiz.id}`)}
              className="gap-2 w-full sm:w-auto border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20"
            >
              <RotateCcw className="w-4 h-4" />
              {t('common.retakeQuiz') || '重新测试'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="gap-2 w-full sm:w-auto border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20"
            >
              <Home className="w-4 h-4" />
              {t('common.browseMore') || '浏览更多测试'}
            </Button>

            {isUnlocked && (
              <Button
                className={`bg-gradient-to-r ${getResultColor(result.type)} hover:opacity-90 text-white gap-2 w-full sm:w-auto shadow-lg shadow-orange-500/30`}
              >
                <Share2 className="w-4 h-4" />
                {t('common.shareResult') || '分享结果'}
              </Button>
            )}
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="mt-12 text-center">
            <p className="text-stone-500 dark:text-amber-200/50 text-sm">
              {t('common.forEntertainment') || '注意：本测试仅供娱乐参考，不构成专业心理评估。'}
            </p>
          </div>
        </BlurFade>
      </main>
    </div>
  );
}
