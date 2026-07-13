import CompaniesTable from '@/components/CompaniesTable';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function CompaniesPage() {
   const supabase = await createServerSupabaseClient();

   // 🔹 1. Query
   const { data: companies, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });

   // 🔹 2. Error handling
   if (error) {
      console.error(error);
      return <div>Error cargando companies</div>;
   }

   // 🔹 3. Render
   return (
      <div>
         <h1 className="text-xl font-semibold mb-6">Companies</h1>

         <CompaniesTable companies={companies} />
      </div>
   );
}
