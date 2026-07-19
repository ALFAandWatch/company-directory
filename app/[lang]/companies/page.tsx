import { supabaseServer } from '@/lib/supabaseServer';
import { getDictionary } from '@/lib/getDictionary';
import { Lang } from '@/types/i18b';
import CompaniesPage from './companies';
import { div } from 'framer-motion/client';

export default async function Page({
   params,
}: {
   params: Promise<{ lang: string }>;
}) {
   const { lang } = await params;
   const safeLang = lang as Lang;

   const dict = await getDictionary(safeLang);

   // 🔥 fetch empresas
   const {
      data: companies,
      count,
      error,
   } = await supabaseServer
      .from('companies')
      .select(
         `
      *,
      company_countries (
         countries (
            id,
            name,
            code
         )
      )
   `,
         { count: 'exact' }
      )
      .order('created_at', { ascending: false });

   // 🔥 fetch countries (para el filtro)
   const { data: countries } = await supabaseServer
      .from('countries')
      .select('id, name, code');

   if (error) {
      console.error(error);
   }

   const formattedCompanies = (companies || []).map((company) => ({
      ...company,
      countries: company.company_countries.map((cc: any) => cc.countries),
   }));

   return (
      <div className="min-h-screen">
         <CompaniesPage
            companies={formattedCompanies}
            countries={countries || []}
            dictionary={dict}
            count={count || 0}
            lang={safeLang}
         />
      </div>
   );
}
