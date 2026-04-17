import { redirect } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { cookies } from 'next/headers';

interface ResultPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ResultPage({ params, searchParams }: ResultPageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const cookieStore = await cookies();
  const storedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  
  const queryParams = new URLSearchParams();
  if (sp.result) {
    queryParams.set('result', Array.isArray(sp.result) ? sp.result[0] : sp.result);
  }
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  
  if (storedLocale && routing.locales.includes(storedLocale as any)) {
    redirect(`/${storedLocale}/quiz/${id}/result${queryString}`);
  }
  
  const acceptLanguage = cookieStore.get('Accept-Language')?.value || '';
  const browserLocale = acceptLanguage.split(',')[0]?.toLowerCase();
  
  if (browserLocale) {
    if (browserLocale.startsWith('zh-tw') || browserLocale.startsWith('zh-hk')) {
      redirect(`/zh-TW/quiz/${id}/result${queryString}`);
    }
    if (browserLocale.startsWith('zh')) {
      redirect(`/zh-CN/quiz/${id}/result${queryString}`);
    }
    if (browserLocale.startsWith('en')) {
      redirect(`/en/quiz/${id}/result${queryString}`);
    }
  }
  
  redirect(`/${routing.defaultLocale}/quiz/${id}/result${queryString}`);
}
