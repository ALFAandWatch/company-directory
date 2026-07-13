'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export function EditButton({ company }: { company: any }) {
   const [open, setOpen] = useState(false);
   const router = useRouter();

   const handleSubmit = async (e: any) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const updated = {
         name: formData.get('name'),
         category: formData.get('category'),
         website: formData.get('website'),
         careers: formData.get('careers'),
      };

      await supabaseClient
         .from('companies')
         .update(updated)
         .eq('id', company.id);

      setOpen(false);
      router.refresh();
   };

   return (
      <>
         <button
            onClick={() => setOpen(true)}
            className="px-2 py-1 text-xs bg-blue-500 rounded hover:cursor-pointer"
         >
            Edit
         </button>

         {open && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
               <form
                  onSubmit={handleSubmit}
                  className="bg-neutral-900 p-6 rounded-lg w-full max-w-md flex flex-col gap-3"
               >
                  <input
                     name="name"
                     defaultValue={company.name}
                     placeholder="Name"
                     className="p-2 bg-neutral-800 rounded"
                  />

                  <input
                     name="category"
                     defaultValue={company.category}
                     placeholder="Category"
                     className="p-2 bg-neutral-800 rounded"
                  />

                  <input
                     name="website"
                     defaultValue={company.website}
                     placeholder="Website"
                     className="p-2 bg-neutral-800 rounded"
                  />

                  <input
                     name="careers"
                     defaultValue={company.careers}
                     placeholder="Careers"
                     className="p-2 bg-neutral-800 rounded"
                  />

                  <div className="flex justify-between mt-4">
                     <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="text-gray-400 hover:cursor-pointer"
                     >
                        Cancel
                     </button>

                     <button
                        type="submit"
                        className="bg-white text-black px-4 py-2 rounded hover:cursor-pointer"
                     >
                        Save
                     </button>
                  </div>
               </form>
            </div>
         )}
      </>
   );
}
