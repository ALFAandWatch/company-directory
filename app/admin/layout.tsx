import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import Sidebar from '@/components/Sidebar';

export default async function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const supabase = await createServerSupabaseClient();

   const {
      data: { user },
   } = await supabase.auth.getUser();

   if (!user || user.email !== 'alfonso.gonzalezwebdev@gmail.com') {
      redirect('/admin-login');
   }

   return (
      <div className="flex min-h-screen bg-black text-gray-100">
         <Sidebar />
         <main className="flex-1 p-6">{children}</main>
      </div>
   );
}
