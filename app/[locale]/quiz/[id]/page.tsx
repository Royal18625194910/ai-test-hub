'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getQuizById, calculateResult } from '@/data/quizzes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ArrowLeft, ChevronRight, Brain, Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface QuizPageProps {
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

export default function QuizPage({ params }: QuizPageProps) {
  const t = useTranslations();
  const router = useRouter();
  const resolvedParams = use(params);
  const quiz = getQuizById(resolvedParams.id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const getVisibleQuestionIndices = () => {
    if (!quiz || !quiz.questions) return [];
    
    const total = quiz.questions.length;
    const current = currentQuestionIndex;
    const maxSlots = 15;
    const visible: (number | string)[] = [];
    
    if (total <= maxSlots) {
      for (let i = 0; i < total; i++) {
        visible.push(i);
      }
      return visible;
    }
    
    const reservedSlots = 4;
    const neighborSlots = Math.floor((maxSlots - reservedSlots) / 2);
    
    const leftStart = Math.max(1, current - neighborSlots);
    const leftEnd = current - 1;
    
    const rightStart = current + 1;
    const rightEnd = Math.min(total - 2, current + neighborSlots);
    
    // 添加 0，只有当 current 不是 0 时才添加
    if (current !== 0) {
      visible.push(0);
    }
    
    if (leftStart > 1) {
      visible.push('ellipsis-start');
    }
    
    for (let i = leftStart; i <= leftEnd; i++) {
      if (i > 0) {
        visible.push(i);
      }
    }
    
    visible.push(current);
    
    for (let i = rightStart; i <= rightEnd; i++) {
      if (i < total - 1) {
        visible.push(i);
      }
    }
    
    if (rightEnd < total - 2) {
      visible.push('ellipsis-end');
    }
    
    // 添加 total - 1，只有当 current 不是 total - 1 时才添加
    if (current !== total - 1) {
      visible.push(total - 1);
    }
    
    return visible;
  };

  useEffect(() => {
    if (!quiz) {
      router.push('/');
    }
  }, [quiz, router]);

  if (!quiz) {
    return null;
  }

  const totalQuestions = quiz.questions.length;
  const safeIndex = Math.min(Math.max(currentQuestionIndex, 0), totalQuestions - 1);
  const currentQuestion = quiz.questions[safeIndex];
  const progress = (safeIndex + 1) / totalQuestions;
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const getTranslatedQuestion = (questionIndex: number) => {
    try {
      return t(`quizzes.${quiz.id}.questions.${questionIndex}.text`);
    } catch {
      return currentQuestion.text;
    }
  };

  const getTranslatedOption = (questionIndex: number, optionIndex: number) => {
    try {
      return t(`quizzes.${quiz.id}.questions.${questionIndex}.options.${optionIndex}.text`);
    } catch {
      return currentQuestion.options[optionIndex]?.text || '';
    }
  };

  const handleAnswerSelect = (optionId: string) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: optionId
    };
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      const allAnswered = Object.keys(newAnswers).length === totalQuestions;
      if (allAnswered) {
        setTimeout(() => {
          const result = calculateResult(newAnswers, quiz);
          router.push(`/quiz/${quiz.id}/result?result=${result.id}`);
        }, 300);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const result = calculateResult(answers, quiz);
    router.push(`/quiz/${quiz.id}/result?result=${result.id}`);
  };

  const allQuestionsAnswered = Object.keys(answers).length === totalQuestions;

  return (
    <div className="min-h-screen bg-amber-50 dark:from-stone-900 dark:to-amber-950">
      <header className="sticky top-0 z-[60] bg-amber-50/95 dark:bg-stone-900/95 backdrop-blur-sm py-3 sm:py-4">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-stone-900 dark:bg-black rounded-xl translate-x-1 translate-y-1" />
            <div className="relative bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-600 rounded-xl">
              <div className="px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between gap-2">
                <Link href="/" className="flex items-center gap-1 sm:gap-2 text-stone-900 dark:text-stone-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors min-w-0">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-bold text-sm sm:text-base truncate">{t('common.appName')}</span>
                </Link>

                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <LanguageSwitcher />
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center border-2 border-stone-900 flex-shrink-0">
                    <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <StickerCard delay={0.2} className="mb-8">
          <div className="p-6 text-center">
            <h1 className="text-2xl md:text-3xl font-black text-stone-900 dark:text-stone-100 mb-2">
              {t(`quizzes.${quiz.id}.title`)}
            </h1>
            <p className="text-stone-600 dark:text-stone-400 font-medium">
              {currentQuestionIndex + 1} / {totalQuestions}
            </p>
          </div>
        </StickerCard>

        <StickerCard delay={0.3} className="mb-8">
          <div className="p-4">
            <div className="w-full h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
          </div>
        </StickerCard>

        <StickerCard delay={0.4}>
          <Card className="border-0 bg-transparent overflow-hidden">
            <div className={`h-3 bg-gradient-to-r ${quiz.color}`}></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl font-black text-stone-900 dark:text-stone-100 leading-relaxed">
                {getTranslatedQuestion(currentQuestionIndex)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestion.options.map((option, optionIndex) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    whileHover={selectedAnswer !== option.id ? { scale: 1.01 } : {}}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                      ${selectedAnswer === option.id 
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] dark:shadow-[2px_2px_0px_0px_rgba(120,113,108,1)]' 
                        : 'border-stone-200 dark:border-stone-600 hover:border-orange-400 dark:hover:border-orange-700 bg-white dark:bg-stone-700/50 text-stone-700 dark:text-stone-100 hover:bg-orange-50/50 dark:hover:bg-stone-700'
                      }`}
                  >
                    <span className="flex-1 font-medium">{getTranslatedOption(currentQuestionIndex, optionIndex)}</span>
                    {selectedAnswer === option.id && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center ml-3 border-2 border-stone-900">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </StickerCard>

        <div className="mt-8">
          <StickerCard delay={0.5}>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white gap-1 sm:gap-2 font-bold border-2 border-stone-900 dark:border-stone-600 rounded-xl shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(120,113,108,1)] hover:shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all px-3 sm:px-4 py-2 h-auto min-h-10"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('common.previous')}</span>
                  <span className="sm:hidden">上一题</span>
                </Button>

                <div className="flex-1 overflow-x-auto scrollbar-hide mx-2">
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-max">
                    {getVisibleQuestionIndices().map((item) => {
                      if (typeof item === 'string') {
                        return (
                          <div 
                            key={item} 
                            className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-stone-400 dark:text-stone-500 font-bold text-xs"
                          >
                            ...
                          </div>
                        );
                      }
                      
                      const index = item as number;
                      return (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentQuestionIndex(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full text-xs font-bold transition-all duration-200 border border-stone-900 dark:border-stone-600
                            ${index === currentQuestionIndex 
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] dark:shadow-[1px_1px_0px_0px_rgba(120,113,108,1)]' 
                              : quiz.questions[index] && answers[quiz.questions[index].id] 
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' 
                                : 'bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                            }`}
                        >
                          {index + 1}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {currentQuestionIndex < totalQuestions - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white gap-1 sm:gap-2 font-bold border-2 border-stone-900 dark:border-stone-600 rounded-xl shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(120,113,108,1)] hover:shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all px-3 sm:px-4 py-2 h-auto min-h-10"
                  >
                    <span className="hidden sm:inline">{t('common.next')}</span>
                    <span className="sm:hidden">下一题</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered}
                    className={`flex-shrink-0 bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white gap-1 sm:gap-2 font-bold border-2 border-stone-900 dark:border-stone-600 rounded-xl shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(120,113,108,1)] hover:shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all px-3 sm:px-4 py-2 h-auto min-h-10`}
                  >
                    <span className="hidden sm:inline">{t('common.viewResult')}</span>
                    <span className="sm:hidden">结果</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </StickerCard>
        </div>
      </main>
    </div>
  );
}
