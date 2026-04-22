'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { quizzes } from '@/data/quizzes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ChevronRight, Brain, Sparkles, Shield, Lock, Lightbulb, Gift, Quote, Star, ArrowRight, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth, SignInButton, UserButton, ClerkLoaded } from '@clerk/nextjs';
import Image from 'next/image';

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

const StickerButton = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-transform hover:-translate-y-0.5 active:translate-y-0';
  const primaryStyles = 'bg-orange-500 text-white border-2 border-stone-900 dark:border-stone-600 rounded-2xl px-8 py-4 text-lg shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(120,113,108,1)]';
  const secondaryStyles = 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-2 border-stone-900 dark:border-stone-600 rounded-2xl px-8 py-4 text-lg shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(120,113,108,1)]';
  
  return (
    <button className={`${baseStyles} ${variant === 'primary' ? primaryStyles : secondaryStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

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
    <div className="min-h-screen bg-amber-50 dark:from-stone-900 dark:to-amber-950">
      <header className="sticky top-0 z-[60] bg-amber-50/95 dark:bg-stone-900/95 backdrop-blur-sm py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-stone-900 dark:bg-black rounded-xl translate-x-1 translate-y-1" />
            <div className="relative bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-600 rounded-xl">
              <div className="px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center border-2 border-stone-900">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
                    {t('common.appName')}
                  </span>
                </Link>
                
                <nav className="hidden md:flex items-center gap-8">
                  <a href="#quizzes" className="font-semibold text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    {t('sections.popularQuizzes')}
                  </a>
                  <a href="#features" className="font-semibold text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    {t('sections.features')}
                  </a>
                </nav>

                <div className="flex items-center gap-2">
                  <ClerkLoaded>
                    {!isSignedIn ? (
                      <SignInButton mode="modal">
                        <button className="font-bold text-stone-900 dark:text-stone-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors px-3 py-2">
                          {t('common.signIn')}
                        </button>
                      </SignInButton>
                    ) : (
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: 'w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border-2 border-stone-900',
                          }
                        }}
                      />
                    )}
                  </ClerkLoaded>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <BlurFade delay={0.2} inView>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-stone-900 dark:border-stone-600 bg-white dark:bg-stone-800 rounded-md">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{t('hero.badge')}</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-stone-900 dark:text-stone-100 leading-tight tracking-tight">
                  {t('hero.title')}
                  <span className="block text-orange-500 mt-2">
                    {t('hero.highlight')}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
                  {t('hero.description')}
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 h-auto font-bold border-2 border-stone-900 dark:border-stone-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(120,113,108,1)] hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    asChild
                  >
                    <a href="#quizzes" className="flex items-center justify-center gap-2">
                      {t('common.startQuiz')}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">5-10 分钟完成</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">随时随地测试</span>
                  </div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-stone-900 dark:border-stone-600 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)]"
                    whileHover={{ y: -4, rotate: -1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=psychological%20test%20concept%20with%20colorful%20personality%20traits%20visualization%2C%20warm%20colors%2C%20artistic%20style&image_size=square_hd"
                      alt="性格测试"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  
                  <motion.div
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-stone-900 dark:border-stone-600 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] translate-y-8"
                    whileHover={{ y: 4, rotate: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brain%20thinking%20concept%20with%20neurons%20and%20connections%2C%20creative%20mind%20map%2C%20warm%20orange%20tones&image_size=square_hd"
                      alt="思维探索"
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-stone-900 dark:border-stone-600 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] -translate-y-4"
                    whileHover={{ y: -8, rotate: -1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=emotional%20intelligence%20concept%20with%20colorful%20emotions%20represented%20as%20soft%20shapes%2C%20warm%20palette&image_size=square_hd"
                      alt="情感探索"
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-stone-900 dark:border-stone-600 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)]"
                    whileHover={{ y: -4, rotate: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=discovery%20journey%20concept%20with%20path%20and%20milestones%2C%20adventure%20theme%2C%20warm%20cozy%20colors&image_size=square_hd"
                      alt="自我发现"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-orange-500 text-white border-2 border-stone-900 dark:border-stone-600 rounded-lg px-6 py-4 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                >
                  <div className="text-3xl font-black">10+</div>
                  <div className="text-sm font-bold opacity-90">精选测试</div>
                </motion.div>
              </div>
            </BlurFade>
          </div>
        </section>

        <section id="quizzes" className="mb-24">
          <BlurFade delay={0.4} inView>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 dark:text-stone-100 mb-12 flex items-center gap-4">
              <span className="w-2 h-12 bg-orange-500 rounded-full"></span>
              {t('sections.popularQuizzes')}
            </h2>
          </BlurFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <BlurFade key={quiz.id} delay={0.5 + index * 0.1} inView>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <StickerCard delay={0.5 + index * 0.1}>
                    <Card className="border-0 bg-transparent overflow-hidden h-full flex flex-col">
                      <div className={`h-3 bg-gradient-to-r ${quiz.color}`}></div>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-5xl">{quiz.icon}</div>
                          <Badge 
                            variant="outline" 
                            className={`
                              font-bold px-3 py-1
                              ${quiz.difficulty === 'easy' ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : ''}
                              ${quiz.difficulty === 'medium' ? 'border-amber-600 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20' : ''}
                              ${quiz.difficulty === 'hard' ? 'border-red-600 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20' : ''}
                            `}
                          >
                            {t(`difficulty.${quiz.difficulty}`)}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-black text-stone-900 dark:text-stone-100">
                          {t(`quizzes.${quiz.id}.title`)}
                        </CardTitle>
                        <CardDescription className="text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                          {t(`quizzes.${quiz.id}.description`)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="flex items-center gap-4 text-sm">
                          <Badge variant="secondary" className="font-bold bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700">
                            {t(`quizzes.${quiz.id}.category`)}
                          </Badge>
                          <span className="text-stone-500 dark:text-stone-400 font-medium">{quiz.questions.length} {t('questions.count')}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className={`w-full bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white font-bold border-2 border-stone-900 dark:border-stone-600 rounded-xl shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(120,113,108,1)] hover:shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all`}
                          asChild
                        >
                          <Link href={`/quiz/${quiz.id}`} className="w-full">
                            {t('common.startQuiz')}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </StickerCard>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </section>

        <section id="features" className="mb-24">
          <BlurFade delay={0.6} inView>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 dark:text-stone-100 mb-12 text-center flex items-center justify-center gap-4">
              <span className="w-2 h-12 bg-orange-500 rounded-full"></span>
              {t('sections.features')}
              <span className="w-2 h-12 bg-orange-500 rounded-full"></span>
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <BlurFade key={feature.key} delay={0.7 + index * 0.1} inView>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <StickerCard delay={0.7 + index * 0.1}>
                    <Card className="border-0 bg-transparent h-full">
                      <CardHeader className="pb-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 border-2 border-stone-900 dark:border-stone-600 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)]`}>
                          <div className="text-white">
                            {feature.icon}
                          </div>
                        </div>
                        <CardTitle className="text-lg font-black text-stone-900 dark:text-stone-100">
                          {t(`features.${feature.key}.title`)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                          {t(`features.${feature.key}.description`)}
                        </p>
                      </CardContent>
                    </Card>
                  </StickerCard>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <BlurFade delay={0.8} inView>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 dark:text-stone-100 mb-12 text-center flex items-center justify-center gap-4">
              <span className="w-2 h-12 bg-orange-500 rounded-full"></span>
              {t('sections.testimonials')}
              <span className="w-2 h-12 bg-orange-500 rounded-full"></span>
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <BlurFade key={testimonial.key} delay={0.9 + index * 0.1} inView>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <StickerCard delay={0.9 + index * 0.1}>
                    <Card className="border-0 bg-transparent h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <Quote className="w-10 h-10 text-orange-500/30" />
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${i < testimonial.rating ? 'text-orange-500 fill-orange-500' : 'text-stone-300 dark:text-stone-600'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-6 italic font-medium">
                          "{t(`testimonials.${testimonial.key}.content`)}"
                        </p>
                      </CardContent>
                      <CardFooter className="border-t border-stone-200 dark:border-stone-700 pt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-black border-2 border-stone-900 dark:border-stone-600 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
                            {t(`testimonials.${testimonial.key}.name`).charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-stone-900 dark:text-stone-100">
                              {t(`testimonials.${testimonial.key}.name`)}
                            </p>
                            <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">
                              {t(`testimonials.${testimonial.key}.role`)}
                            </p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </StickerCard>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </section>

        <BlurFade delay={1.0} inView>
          <section className="mb-24">
            <StickerCard delay={1.0}>
              <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-red-500/20 p-8 md:p-12">
                <div className="text-center">
                  <h3 className="text-3xl md:text-5xl font-black text-stone-900 dark:text-stone-100 mb-4">
                    {t('cta.title')}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                    {t('cta.description')}
                  </p>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-6 h-auto font-black border-2 border-stone-900 dark:border-stone-600 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(120,113,108,1)] hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    asChild
                  >
                    <a href="#quizzes" className="flex items-center justify-center gap-2">
                      {t('cta.button')}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </StickerCard>
          </section>
        </BlurFade>


      </main>

      <footer className="mt-16 border-t-2 border-stone-900 dark:border-stone-600 bg-white dark:bg-stone-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center border-2 border-stone-900 dark:border-stone-600">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-stone-900 dark:text-stone-100">
                {t('common.appName')}
              </span>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">
              {t('common.footer')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
