'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getQuizById } from '@/data/quizzes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { ArrowLeft, Brain, Sparkles, Share2, RotateCcw, Home } from 'lucide-react';

interface ResultPageProps {
  params: {
    id: string;
  };
}

export default function ResultPage({ params }: ResultPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultId = searchParams.get('result');
  const quiz = getQuizById(params.id);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!quiz || !resultId) {
      router.push('/');
      return;
    }
    setIsReady(true);
  }, [quiz, resultId, router]);

  if (!quiz || !resultId || !isReady) {
    return null;
  }

  const result = quiz.results.find(r => r.id === resultId) || quiz.results[0];

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
      case 'analyst': return 'from-indigo-500 to-purple-500';
      case 'diplomat': return 'from-emerald-500 to-teal-500';
      case 'sentinel': return 'from-blue-500 to-cyan-500';
      case 'explorer': return 'from-orange-500 to-amber-500';
      case 'executive': return 'from-rose-500 to-red-500';
      case 'campaigner': return 'from-pink-500 to-rose-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">返回首页</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 flex items-center gap-1 mx-auto">
              <Sparkles className="w-3 h-3" />
              测试完成
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              你的测试结果
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {quiz.title}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            <div className={`h-3 bg-gradient-to-r ${getResultColor(result.type)}`}></div>
            
            <CardHeader className="text-center pb-4 pt-8">
              <div className="text-7xl mb-4">
                {getResultIcon(result.type)}
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {result.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="pb-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-6">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                  {result.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-2xl mb-1">🧠</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">思维方式</div>
                </div>
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                  <div className="text-2xl mb-1">💡</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">创意潜能</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <div className="text-2xl mb-1">🤝</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">社交能力</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">行动力</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/quiz/${quiz.id}`)}
              className="gap-2 w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4" />
              重新测试
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="gap-2 w-full sm:w-auto"
            >
              <Home className="w-4 h-4" />
              浏览更多测试
            </Button>

            <Button
              className={`bg-gradient-to-r ${getResultColor(result.type)} hover:opacity-90 text-white gap-2 w-full sm:w-auto`}
            >
              <Share2 className="w-4 h-4" />
              分享结果
            </Button>
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="mt-12 text-center">
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              注意：本测试仅供娱乐参考，不构成专业心理评估。
            </p>
          </div>
        </BlurFade>
      </main>
    </div>
  );
}
