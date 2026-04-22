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

  useEffect(() => {
    if (!quiz) {
      router.push('/');
    }
  }, [quiz, router]);

  if (!quiz) {
    return null;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = (currentQuestionIndex + 1) / totalQuestions;
  const selectedAnswer = answers[currentQuestion.id];

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
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white gap-2 font-bold border-2 border-stone-900 dark:border-stone-600 rounded-xl shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(120,113,108,1)] hover:shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('common.previous') || '上一题'}
                </Button>

                <div className="flex items-center gap-2">
                  {quiz.questions.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-8 h-8 rounded-full text-sm font-bold transition-all duration-200 border-2 border-stone-900 dark:border-stone-600
                        ${index === currentQuestionIndex 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] dark:shadow-[2px_2px_0px_0px_rgba(120,113,108,1)]' 
                          : answers[quiz.questions[index].id] 
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' 
                            : 'bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                        }`}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                </div>

                {currentQuestionIndex < totalQuestions - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white gap-2 font-bold border-2 border-stone-900 dark:border-stone-600 rounded-xl shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(120,113,108,1)] hover:shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    {t('common.next') || '下一题'}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered}
                    className={`w-full sm:w-auto bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white gap-2 font-bold border-2 border-stone-900 dark:border-stone-600 rounded-xl shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(120,113,108,1)] hover:shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all`}
                  >
                    {t('common.viewResult') || '查看结果'}
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
