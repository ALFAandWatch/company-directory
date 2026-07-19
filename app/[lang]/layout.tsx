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
      <main
         data-lang={lang}
         className="relative min-h-screen flex flex-col bg-radial-[at_60%_35%] from-cyan-700/45 to-black to-80%"
      >
         <Navbar dictionary={dict} lang={safeLang} />
         <div className="flex-1">{children}</div>
      </main>
   );
}
