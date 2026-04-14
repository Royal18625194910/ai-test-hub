import Link from 'next/link';
import { quizzes } from '@/data/quizzes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import { ChevronRight, Brain, Sparkles } from 'lucide-react';

export default function Home() {
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
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              发现真实的自己
            </div>
          </BlurFade>
          
          <BlurFade delay={0.2} inView>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              探索你的
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                独特性格
              </span>
            </h1>
          </BlurFade>
          
          <BlurFade delay={0.3} inView>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              通过精心设计的心理测试，深入了解你的性格特质、行为模式和潜在优势。
              开始你的自我探索之旅吧！
            </p>
          </BlurFade>
        </section>

        <section>
          <BlurFade delay={0.4} inView>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              热门测试
            </h2>
          </BlurFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <BlurFade key={quiz.id} delay={0.5 + index * 0.1} inView>
                <Card 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden h-full flex flex-col"
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
              </BlurFade>
            ))}
          </div>
        </section>

        <BlurFade delay={0.8} inView>
          <section className="mt-20 text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-3xl p-8 md:p-12 border border-purple-200 dark:border-purple-800">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                更多测试即将上线
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
                我们正在持续开发更多有趣的心理测试，包括情商测试、职业倾向测试、
                人际关系测试等。敬请期待！
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
