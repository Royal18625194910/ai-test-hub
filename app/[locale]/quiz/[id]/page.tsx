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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t('common.appName')}</span>
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            {t(`quizzes.${quiz.id}.category`)}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {t(`quizzes.${quiz.id}.title`)}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {currentQuestionIndex + 1} / {totalQuestions}
          </p>
        </div>

        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl md:text-2xl text-slate-900 dark:text-white leading-relaxed">
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
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                >
                  <span className="flex-1">{getTranslatedOption(currentQuestionIndex, optionIndex)}</span>
                  {selectedAnswer === option.id && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center ml-3">
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
            className="gap-2"
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110' 
                    : answers[quiz.questions[index].id] 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white gap-2"
            >
              {t('common.next') || '下一题'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white gap-2"
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
