'use client';

import { useRouter, usePathname } from 'next/navigation';
import { supabaseClient } from '@/lib/supabaseClient';

export default function Sidebar() {
   const router = useRouter();
   const pathname = usePathname();

   // 🔹 logout handler
   const handleLogout = async () => {
      await supabaseClient.auth.signOut();

      // 🔹 MUY IMPORTANTE: limpiar estado server
      router.push('/admin-login');
      router.refresh();
   };

   // 🔹 helper para estilos activos
   const linkClass = (path: string) =>
      `px-3 py-2 rounded-md text-sm hover:cursor-pointer ${
         pathname === path
            ? 'bg-white text-black'
            : 'text-gray-300 hover:bg-neutral-800'
      }`;

   return (
      <aside className="w-64 h-screen bg-neutral-900 border-r border-neutral-800 p-4 flex flex-col justify-between">
         {/* TOP */}
         <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold mb-4">Admin</h2>

            <button
               onClick={() => router.push('/admin/companies')}
               className={linkClass('/admin/companies')}
            >
               Companies
            </button>

            <button
               onClick={() => router.push('/admin/suggestions')}
               className={linkClass('/admin/suggestions')}
            >
               Suggestions
            </button>
         </div>

         {/* BOTTOM */}
         <button
            onClick={handleLogout}
            className="mt-6 px-3 py-2 rounded-md text-sm bg-red-500 text-white hover:bg-red-600 transition hover:cursor-pointer"
         >
            Logout
         </button>
      </aside>
   );
}
