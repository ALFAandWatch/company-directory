import Navbar from '@/components/Navbar';
import { getDictionary } from '@/lib/getDictionary';
import { Lang } from '@/types/i18b';
import { redirect } from 'next/navigation';

export default async function PageLayout({
   children,
   params,
}: Readonly<{
   children: React.ReactNode;
   params: Promise<{ lang: string }>;
}>) {
   const { lang } = await params;
   const safeLang = lang as Lang;

   const dict = await getDictionary(safeLang);

   const isValidLang = safeLang === 'es' || safeLang === 'en';

   if (!isValidLang) {
      redirect('/es');
   }

   return (
      <main data-lang={lang}>
         <Navbar dictionary={dict} lang={safeLang} />
         {children}
      </main>
   );
}
