import { supabaseServer } from '@/lib/supabaseServer';
import { getDictionary } from '@/lib/getDictionary';
import { Lang } from '@/types/i18b';
import SuggestionPage from './suggest';
import { div } from 'framer-motion/client';

export default async function Page({
   params,
}: {
   params: Promise<{ lang: string }>;
}) {
   const { lang } = await params;
   const safeLang = lang as Lang;

   const dict = await getDictionary(safeLang);

   const { data: countries, error } = await supabaseServer
      .from('countries')
      .select('id, name, code');

   if (error) {
      console.error(error);
   }

   return (
      <div className="min-h-screen">
         <SuggestionPage
            countries={countries || []}
            dictionary={dict}
            lang={safeLang}
         />
      </div>
   );
}
