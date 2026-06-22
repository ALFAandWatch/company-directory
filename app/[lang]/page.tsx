import { getDictionary } from '@/lib/getDictionary';
import { Lang } from '@/types/i18b';
import LandingPage from './landingPage';

export default async function Page({
   params,
}: {
   params: Promise<{ lang: string }>;
}) {
   const { lang } = await params;
   const safeLang = lang as Lang;

   const dict = await getDictionary(safeLang);

   return <LandingPage dictionary={dict} lang={safeLang} />;
}
