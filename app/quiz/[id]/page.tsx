import { redirect } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { cookies } from 'next/headers';

interface QuizPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const storedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  
  if (storedLocale && routing.locales.includes(storedLocale as any)) {
    redirect(`/${storedLocale}/quiz/${id}`);
  }
  
  const acceptLanguage = cookieStore.get('Accept-Language')?.value || '';
  const browserLocale = acceptLanguage.split(',')[0]?.toLowerCase();
  
  if (browserLocale) {
    if (browserLocale.startsWith('zh-tw') || browserLocale.startsWith('zh-hk')) {
      redirect(`/zh-TW/quiz/${id}`);
    }
    if (browserLocale.startsWith('zh')) {
      redirect(`/zh-CN/quiz/${id}`);
    }
    if (browserLocale.startsWith('en')) {
      redirect(`/en/quiz/${id}`);
    }
  }
  
  redirect(`/${routing.defaultLocale}/quiz/${id}`);
}
