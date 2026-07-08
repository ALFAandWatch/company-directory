import { supabase } from '@/lib/supabaseServer';
import { getDictionary } from '@/lib/getDictionary';
import { Lang } from '@/types/i18b';
import CompaniesPage from './companies';

export default async function Page({
   params,
}: {
   params: Promise<{ lang: string }>;
}) {
   const { lang } = await params;
   const safeLang = lang as Lang;

   const dict = await getDictionary(safeLang);

   // 🔥 fetch empresas
   const { data: companies, error } = await supabase.from('companies').select(`
      *,
      company_countries (
         countries (
            id,
            name,
            code
         )
      )
   `);

   // 🔥 fetch countries (para el filtro)
   const { data: countries } = await supabase
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
      <CompaniesPage
         companies={formattedCompanies}
         countries={countries || []}
         dictionary={dict}
         lang={safeLang}
      />
   );
}
