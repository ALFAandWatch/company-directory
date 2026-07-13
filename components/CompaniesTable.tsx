'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';
import { EditButton } from './EditButton';

export default function CompaniesTable({ companies }: { companies: any[] }) {
   const router = useRouter();

   const [deleteId, setDeleteId] = useState<string | null>(null);
   const [countdown, setCountdown] = useState(5);
   const [isDeleting, setIsDeleting] = useState(false);

   // 🔴 DELETE
   const handleDelete = async (id: string) => {
      setIsDeleting(true);
      const { error } = await supabaseClient
         .from('companies')
         .delete()
         .eq('id', id);

      if (error) {
         console.error('Error deleting company:', error);
         setIsDeleting(false);
         return;
      }

      router.refresh();
      setIsDeleting(false);
   };

   // ⏳ iniciar confirmación con delay
   const startDelete = (id: string) => {
      setDeleteId(id);
      setCountdown(5);

      let counter = 5;

      const interval = setInterval(() => {
         counter--;
         setCountdown(counter);

         if (counter === 0) {
            clearInterval(interval);
         }
      }, 1000);
   };

   return (
      <>
         <div className="overflow-x-auto">
            <table className="w-full text-sm">
               <thead>
                  <tr className="text-left text-gray-400 border-b border-neutral-800">
                     <th>Name</th>
                     <th>Category</th>
                     <th>Website</th>
                     <th>Careers</th>
                     <th>Created</th>
                     <th>Actions</th>
                  </tr>
               </thead>

               <tbody>
                  {companies.map((company) => (
                     <tr
                        key={company.id}
                        className="border-b border-neutral-800"
                     >
                        <td>{company.name}</td>
                        <td>{company.category}</td>
                        <td>{company.website}</td>
                        <td>{company.careers}</td>
                        <td>{formatDate(company.created_at)}</td>

                        {/* ACTIONS */}
                        <td className="flex gap-2 py-2">
                           {/* EDIT */}
                           <EditButton company={company} />

                           {/* DELETE */}
                           {deleteId === company.id ? (
                              <button
                                 disabled={countdown > 0}
                                 onClick={() => handleDelete(company.id)}
                                 className="px-2 py-1 text-xs bg-red-500 text-white rounded disabled:opacity-50 hover:cursor-pointer"
                              >
                                 {countdown > 0
                                    ? `Esperar ${countdown}s`
                                    : 'Confirmar'}
                              </button>
                           ) : (
                              <button
                                 disabled={isDeleting}
                                 onClick={() => startDelete(company.id)}
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
      </>
   );
}
