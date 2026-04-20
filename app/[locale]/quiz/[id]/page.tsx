'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import { getQuizById, calculateResult } from '@/data/quizzes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ArrowLeft, ChevronRight, Brain, Check, ArrowRight } from 'lucide-react';

interface QuizPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-stone-900 dark:to-amber-950">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-stone-900/90 border-b border-amber-200 dark:border-amber-800/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t('common.appName')}</span>
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                <Brain className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-amber-100/50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
            {t(`quizzes.${quiz.id}.category`)}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-amber-50 mb-2">
            {t(`quizzes.${quiz.id}.title`)}
          </h1>
          <p className="text-stone-600 dark:text-amber-200/60">
            {currentQuestionIndex + 1} / {totalQuestions}
          </p>
        </div>

        <div className="w-full h-2 bg-amber-200 dark:bg-stone-700 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out rounded-full shadow-md shadow-orange-500/30"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>

        <Card className="border-amber-200/50 dark:border-amber-800/30 bg-white dark:bg-stone-800 shadow-lg shadow-amber-100/50 dark:shadow-stone-900/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl md:text-2xl text-stone-800 dark:text-amber-50 leading-relaxed">
              {getTranslatedQuestion(currentQuestionIndex)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, optionIndex) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                    ${selectedAnswer === option.id 
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 shadow-md shadow-amber-200/50 dark:shadow-stone-900/50' 
                      : 'border-amber-200/50 dark:border-stone-600 hover:border-amber-400 dark:hover:border-amber-700 bg-white dark:bg-stone-700/50 text-stone-700 dark:text-amber-100 hover:bg-amber-50/50 dark:hover:bg-stone-700'
                    }`}
                >
                  <span className="flex-1">{getTranslatedOption(currentQuestionIndex, optionIndex)}</span>
                  {selectedAnswer === option.id && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center ml-3 shadow-md shadow-orange-500/30">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="gap-2 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.previous') || '上一题'}
          </Button>

          <div className="flex items-center gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200
                  ${index === currentQuestionIndex 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white scale-110 shadow-md shadow-orange-500/30' 
                    : answers[quiz.questions[index].id] 
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' 
                      : 'bg-amber-200/50 dark:bg-stone-700 text-stone-500 dark:text-amber-200/50'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white gap-2 shadow-lg shadow-orange-500/30"
            >
              {t('common.next') || '下一题'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90 text-white gap-2 shadow-lg shadow-orange-500/30"
            >
              {t('common.viewResult') || '查看结果'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
