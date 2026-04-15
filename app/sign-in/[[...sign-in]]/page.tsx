import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🧠</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            登录测试题集合 Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            输入邮箱地址，我们将发送验证码给您
          </p>
        </div>
        <SignIn 
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl',
              headerTitle: 'text-slate-900 dark:text-white',
              headerSubtitle: 'text-slate-600 dark:text-slate-400',
              socialButtonsBlockButton: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700',
              formButtonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white',
              formFieldLabel: 'text-slate-700 dark:text-slate-300',
              formFieldInput: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white',
              footerActionLink: 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300',
            },
          }}
        />
      </div>
    </div>
  );
}
