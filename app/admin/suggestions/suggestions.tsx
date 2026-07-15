import SuggestionsTable from '@/components/SuggestionsTable';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function SuggestionsPage() {
   const supabase = await createServerSupabaseClient();

   const { data: suggestions, error } = await supabase
      .from('suggestions')
      .select(
         `
            *,
            suggestion_countries (
               countries (
                  id,
                  name,
                  code
               )
            )
         `
      )
      .order('created_at', { ascending: false });

   if (error) {
      console.error(error);
      return <div>Error cargando suggestions</div>;
   }

   console.log('Seggestions!!', suggestions);

   return (
      <div>
         <h1 className="text-xl font-semibold mb-6">Suggestions</h1>

         <SuggestionsTable suggestions={suggestions} />
      </div>
   );
}
