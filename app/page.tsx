'use client';

import { quizzes } from '@/data/quizzes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import { ChevronRight, Brain, Sparkles, Shield, Lock, Lightbulb, Gift, Quote, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Home() {

  const features = [
    { icon: <Shield className="w-6 h-6" />, key: 'accuracy', color: 'from-blue-500 to-cyan-500', title: '科学准确', description: '基于心理学研究的测试设计，确保结果的可靠性和有效性。' },
    { icon: <Lock className="w-6 h-6" />, key: 'privacy', color: 'from-green-500 to-emerald-500', title: '隐私保护', description: '所有测试数据严格保密，你的隐私是我们最关心的。' },
    { icon: <Lightbulb className="w-6 h-6" />, key: 'insights', color: 'from-amber-500 to-orange-500', title: '深度洞察', description: '获得详细的性格分析报告，了解自己的优势和成长空间。' },
    { icon: <Gift className="w-6 h-6" />, key: 'free', color: 'from-pink-500 to-rose-500', title: '完全免费', description: '所有测试完全免费，无需付费即可获得完整报告。' },
  ];

  const testimonials = [
    { key: 'user1', rating: 5, name: '李明', role: '产品经理', content: '这个测试让我对自己有了全新的认识，结果非常准确！推荐给所有想要了解自己的朋友。' },
    { key: 'user2', rating: 5, name: '王芳', role: '设计师', content: '界面设计很精美，测试过程也很有趣。结果分析让我看到了自己的优势和需要改进的地方。' },
    { key: 'user3', rating: 4, name: '张伟', role: '工程师', content: '作为一个理性的人，我对心理测试持怀疑态度，但这个测试的结果真的让我很惊讶，太准确了！' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              测试题集合 Hub
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              精选测试
            </Badge>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="font-medium">登录</span>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500',
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="text-center mb-20">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              发现真实的自己
            </div>
          </BlurFade>
          
          <BlurFade delay={0.2} inView>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              探索你的
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent block mt-2">
                独特性格
              </span>
            </h1>
          </BlurFade>
          
          <BlurFade delay={0.3} inView>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
              通过精心设计的心理测试，深入了解你的性格特质、行为模式和潜在优势。开始你的自我探索之旅吧！
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white text-lg px-8 py-6 h-auto"
                asChild
              >
                <Link href="#quizzes" className="gap-2">
                  开始测试
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </BlurFade>
        </section>

        <section id="quizzes" className="mb-20">
          <BlurFade delay={0.4} inView>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="w-1.5 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              热门测试
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
                    className="group hover:shadow-2xl transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden h-full flex flex-col"
                  >
                    <div className={`h-2 bg-gradient-to-r ${quiz.color}`}></div>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-4xl">{quiz.icon}</div>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${quiz.difficulty === 'easy' ? 'border-green-500 text-green-600 dark:text-green-400' : ''}
                            ${quiz.difficulty === 'medium' ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400' : ''}
                            ${quiz.difficulty === 'hard' ? 'border-red-500 text-red-600 dark:text-red-400' : ''}
                          `}
                        >
                          {quiz.difficulty === 'easy' ? '简单' : quiz.difficulty === 'medium' ? '中等' : '困难'}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {quiz.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                        {quiz.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                        <Badge variant="secondary" className="font-normal">
                          {quiz.category}
                        </Badge>
                        <span>{quiz.questions.length} 道题目</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/quiz/${quiz.id}`} className="w-full">
                        <Button 
                          className={`w-full bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white border-0`}
                        >
                          开始测试
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
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center flex items-center justify-center gap-3">
              <span className="w-1.5 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              为什么选择我们
              <span className="w-1.5 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <BlurFade key={feature.key} delay={0.7 + index * 0.1} inView>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg text-slate-900 dark:text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
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
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center flex items-center justify-center gap-3">
              <span className="w-1.5 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              用户评价
              <span className="w-1.5 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <BlurFade key={testimonial.key} delay={0.9 + index * 0.1} inView>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <Quote className="w-8 h-8 text-purple-500/30" />
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                    <CardFooter className="border-t border-slate-100 dark:border-slate-800 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-500">
                            {testimonial.role}
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
            <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-orange-500/20 rounded-3xl p-8 md:p-12 border border-purple-200 dark:border-purple-800">
              <div className="text-center">
                <h3 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  准备好了解真实的自己了吗？
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                  立即开始你的第一个心理测试，发现隐藏在内心深处的独特性格。
                </p>
                <Button 
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white text-lg px-10 py-6 h-auto"
                  asChild
                >
                  <Link href="#quizzes" className="gap-2">
                    立即开始测试
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </BlurFade>

        <BlurFade delay={1.1} inView>
          <section className="text-center">
            <div className="bg-gradient-to-r from-slate-100/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                更多测试即将上线
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
                我们正在持续开发更多有趣的心理测试，包括情商测试、职业倾向测试、人际关系测试等。敬请期待！
              </p>
              <Button variant="outline" className="gap-2">
                <Sparkles className="w-4 h-4" />
                订阅更新
              </Button>
            </div>
          </section>
        </BlurFade>
      </main>

      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">
                测试题集合 Hub
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              © 2024 测试题集合 Hub. 仅供娱乐参考。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
