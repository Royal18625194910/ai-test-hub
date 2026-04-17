import { redirect } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { cookies } from 'next/headers';

export default async function RootPage() {
  const cookieStore = await cookies();
  const storedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  
  if (storedLocale && routing.locales.includes(storedLocale as any)) {
    redirect(`/${storedLocale}`);
  }
  
  const acceptLanguage = cookieStore.get('Accept-Language')?.value || '';
  const browserLocale = acceptLanguage.split(',')[0]?.toLowerCase();
  
  if (browserLocale) {
    if (browserLocale.startsWith('zh-tw') || browserLocale.startsWith('zh-hk')) {
      redirect('/zh-TW');
    }
    if (browserLocale.startsWith('zh')) {
      redirect('/zh-CN');
    }
    if (browserLocale.startsWith('en')) {
      redirect('/en');
    }
  }
  
  redirect(`/${routing.defaultLocale}`);
}
