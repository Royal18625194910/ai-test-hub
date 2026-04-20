'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import { quizzes } from '@/data/quizzes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ChevronRight, Brain, Sparkles, Shield, Lock, Lightbulb, Gift, Quote, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth, SignInButton, UserButton, ClerkLoaded } from '@clerk/nextjs';

export default function Home() {
  const t = useTranslations();
  const { isSignedIn } = useAuth();

  const features = [
    { icon: <Shield className="w-6 h-6" />, key: 'accuracy', color: 'from-amber-500 to-yellow-500' },
    { icon: <Lock className="w-6 h-6" />, key: 'privacy', color: 'from-orange-500 to-amber-600' },
    { icon: <Lightbulb className="w-6 h-6" />, key: 'insights', color: 'from-red-500 to-orange-500' },
    { icon: <Gift className="w-6 h-6" />, key: 'free', color: 'from-amber-600 to-red-500' },
  ];

  const testimonials = [
    { key: 'user1', rating: 5 },
    { key: 'user2', rating: 5 },
    { key: 'user3', rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-stone-900 dark:to-amber-950">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-stone-900/90 border-b border-amber-200 dark:border-amber-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {t('common.appName')}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:flex items-center gap-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              <Sparkles className="w-3 h-3" />
              {t('common.featured')}
            </Badge>
            <ClerkLoaded>
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="flex items-center gap-2 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors px-3 py-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/20">
                    <span className="font-medium">{t('common.signIn')}</span>
                  </button>
                </SignInButton>
              ) : (
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500',
                    }
                  }}
                />
              )}
            </ClerkLoaded>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="text-center mb-20">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              {t('hero.badge')}
            </div>
          </BlurFade>
          
          <BlurFade delay={0.2} inView>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 dark:text-amber-50 mb-6 leading-tight">
              {t('hero.title')}
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent block mt-2">
                {t('hero.highlight')}
              </span>
            </h1>
          </BlurFade>
          
          <BlurFade delay={0.3} inView>
            <p className="text-lg md:text-xl text-stone-600 dark:text-amber-200/80 max-w-2xl mx-auto leading-relaxed mb-8">
              {t('hero.description')}
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white text-lg px-8 py-6 h-auto shadow-lg shadow-orange-500/25"
                asChild
              >
                <Link href="#quizzes" className="gap-2">
                  {t('common.startQuiz')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </BlurFade>
        </section>

        <section id="quizzes" className="mb-20">
          <BlurFade delay={0.4} inView>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-amber-50 mb-8 flex items-center gap-3">
              <span className="w-1.5 h-10 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
              {t('sections.popularQuizzes')}
            </h2>
          </BlurFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <BlurFade key={quiz.id} delay={0.5 + index * 0.1} inView>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card 
                    className="group hover:shadow-2xl transition-all duration-300 border-amber-200 dark:border-amber-800/50 bg-white dark:bg-stone-800 overflow-hidden h-full flex flex-col shadow-md shadow-amber-100/50 dark:shadow-stone-900/50"
                  >
                    <div className={`h-2 bg-gradient-to-r ${quiz.color}`}></div>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-4xl">{quiz.icon}</div>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${quiz.difficulty === 'easy' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : ''}
                            ${quiz.difficulty === 'medium' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : ''}
                            ${quiz.difficulty === 'hard' ? 'border-red-500 text-red-600 dark:text-red-400' : ''}
                          `}
                        >
                          {t(`difficulty.${quiz.difficulty}`)}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-stone-800 dark:text-amber-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {t(`quizzes.${quiz.id}.title`)}
                      </CardTitle>
                      <CardDescription className="text-stone-600 dark:text-amber-200/70 mt-2">
                        {t(`quizzes.${quiz.id}.description`)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-amber-200/60">
                        <Badge variant="secondary" className="font-normal bg-amber-100/50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
                          {t(`quizzes.${quiz.id}.category`)}
                        </Badge>
                        <span>{quiz.questions.length} {t('questions.count')}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/quiz/${quiz.id}`} className="w-full">
                        <Button 
                          className={`w-full bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white border-0 shadow-md shadow-orange-500/20`}
                        >
                          {t('common.startQuiz')}
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <BlurFade delay={0.6} inView>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-amber-50 mb-12 text-center flex items-center justify-center gap-3">
              <span className="w-1.5 h-10 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
              {t('sections.features')}
              <span className="w-1.5 h-10 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <BlurFade key={feature.key} delay={0.7 + index * 0.1} inView>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full border-amber-200/50 dark:border-amber-800/30 bg-white dark:bg-stone-800 hover:shadow-xl transition-all duration-300 shadow-md shadow-amber-100/30 dark:shadow-stone-900/30">
                    <CardHeader className="pb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg text-stone-800 dark:text-amber-50">
                        {t(`features.${feature.key}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-stone-600 dark:text-amber-200/70 leading-relaxed">
                        {t(`features.${feature.key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <BlurFade delay={0.8} inView>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-amber-50 mb-12 text-center flex items-center justify-center gap-3">
              <span className="w-1.5 h-10 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
              {t('sections.testimonials')}
              <span className="w-1.5 h-10 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <BlurFade key={testimonial.key} delay={0.9 + index * 0.1} inView>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full border-amber-200/50 dark:border-amber-800/30 bg-white dark:bg-stone-800 hover:shadow-xl transition-all duration-300 shadow-md shadow-amber-100/30 dark:shadow-stone-900/30">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <Quote className="w-8 h-8 text-amber-500/30" />
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300 dark:text-stone-600'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-stone-700 dark:text-amber-100 leading-relaxed mb-6 italic">
                        "{t(`testimonials.${testimonial.key}.content`)}"
                      </p>
                    </CardContent>
                    <CardFooter className="border-t border-amber-100 dark:border-amber-900/30 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
                          {t(`testimonials.${testimonial.key}.name`).charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-stone-800 dark:text-amber-50">
                            {t(`testimonials.${testimonial.key}.name`)}
                          </p>
                          <p className="text-sm text-stone-500 dark:text-amber-200/60">
                            {t(`testimonials.${testimonial.key}.role`)}
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </section>

        <BlurFade delay={1.0} inView>
          <section className="mb-20">
            <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 dark:from-amber-500/20 dark:via-orange-500/20 dark:to-red-500/20 rounded-3xl p-8 md:p-12 border border-amber-200 dark:border-amber-800/50 shadow-lg shadow-amber-100/50 dark:shadow-stone-900/50">
              <div className="text-center">
                <h3 className="text-2xl md:text-4xl font-bold text-stone-800 dark:text-amber-50 mb-4">
                  {t('cta.title')}
                </h3>
                <p className="text-stone-600 dark:text-amber-200/80 mb-8 max-w-2xl mx-auto text-lg">
                  {t('cta.description')}
                </p>
                <Button 
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-90 text-white text-lg px-10 py-6 h-auto shadow-lg shadow-orange-500/30"
                  asChild
                >
                  <Link href="#quizzes" className="gap-2">
                    {t('cta.button')}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </BlurFade>

        <BlurFade delay={1.1} inView>
          <section className="text-center">
            <div className="bg-gradient-to-r from-amber-100/50 to-orange-50/50 dark:from-stone-800/50 dark:to-amber-950/50 rounded-3xl p-8 md:p-12 border border-amber-200 dark:border-amber-800/30">
              <h3 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-amber-50 mb-4">
                {t('common.comingSoon')}
              </h3>
              <p className="text-stone-600 dark:text-amber-200/70 mb-6 max-w-xl mx-auto">
                {t('common.comingSoonDesc')}
              </p>
              <Button variant="outline" className="gap-2 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20">
                <Sparkles className="w-4 h-4" />
                {t('common.subscribe')}
              </Button>
            </div>
          </section>
        </BlurFade>
      </main>

      <footer className="mt-20 border-t border-amber-200 dark:border-amber-800/50 bg-white dark:bg-stone-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-stone-800 dark:text-amber-50">
                {t('common.appName')}
              </span>
            </div>
            <p className="text-sm text-stone-500 dark:text-amber-200/60">
              {t('common.footer')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
