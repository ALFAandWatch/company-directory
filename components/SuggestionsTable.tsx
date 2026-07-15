'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';
import ApproveButton from './ApproveButton';

export default function SuggestionsTable({
   suggestions,
}: {
   suggestions: any[];
}) {
   const router = useRouter();

   const [deleteId, setDeleteId] = useState<string | null>(null);
   const [countdown, setCountdown] = useState(5);

   // 🔴 DELETE
   const handleDelete = async (id: string) => {
      const { error } = await supabaseClient
         .from('suggestions')
         .delete()
         .eq('id', id);

      if (error) {
         console.error(error);
         return;
      }

      router.refresh();
   };

   const startDelete = (id: string) => {
      setDeleteId(id);
      setCountdown(5);

      let counter = 5;

      const interval = setInterval(() => {
         counter--;
         setCountdown(counter);

         if (counter === 0) clearInterval(interval);
      }, 1000);
   };

   return (
      <div className="overflow-x-auto">
         <table className="w-full text-sm">
            <thead>
               <tr className="text-left text-gray-400 border-b border-neutral-800">
                  <th>Name</th>
                  <th>Category</th>
                  <th>Website</th>
                  <th>Careers</th>
                  <th>Countries</th>
                  <th>Created</th>
                  <th>Actions</th>
               </tr>
            </thead>

            <tbody>
               {suggestions.map((s) => (
                  <tr key={s.id} className="border-b border-neutral-800">
                     <td>{s.name}</td>
                     <td>{s.category}</td>
                     <td>{s.website}</td>
                     <td>{s.careers}</td>
                     <td className="max-w-50 truncate">
                        {s.suggestion_countries
                           ?.map((sc: any) => sc.countries?.name)
                           .filter(Boolean)
                           .join(', ') || '—'}
                     </td>
                     <td>{formatDate(s.created_at)}</td>

                     <td className="flex gap-2 py-2">
                        {/* ✅ APPROVE */}
                        <ApproveButton suggestion={s} />

                        {/* ❌ DELETE */}
                        {deleteId === s.id ? (
                           <button
                              disabled={countdown > 0}
                              onClick={() => handleDelete(s.id)}
                              className="px-2 py-1 text-xs bg-red-500 text-white rounded disabled:opacity-50 hover:cursor-pointer"
                           >
                              {countdown > 0
                                 ? `Esperar ${countdown}s`
                                 : 'Confirmar'}
                           </button>
                        ) : (
                           <button
                              onClick={() => startDelete(s.id)}
                              className="px-2 py-1 text-xs bg-red-400 rounded hover:cursor-pointer"
                           >
                              Delete
                           </button>
                        )}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
