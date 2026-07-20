'use client';

import { useState } from 'react';
import CompanyForm from './CompanyForm';
import { supabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Country } from '@/types/Country';
import { CompanyType } from '@/types/CompanyType';

export default function CreateCompanyButton() {
   const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
   const [open, setOpen] = useState(false);
   const router = useRouter();

   const initialValues: {
      name: string;
      category: CompanyType | '';
      website: string;
      careers: string;
   } = {
      name: '',
      category: '',
      website: '',
      careers: '',
   };

   return (
      <>
         <button
            onClick={() => {
               setSelectedCountries([]);
               setOpen(true);
            }}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:cursor-pointer"
         >
            + Add Company
         </button>

         {open && (
            <div
               className="fixed inset-0 bg-black/70 flex items-center justify-center"
               onClick={() => setOpen(false)}
            >
               <div
                  className="w-full max-w-md"
                  onClick={(e) => e.stopPropagation()}
               >
                  <CompanyForm
                     initialValues={initialValues}
                     selectedCountries={selectedCountries}
                     onCountriesChange={setSelectedCountries}
                     onSubmit={async (values) => {
                        const { data: company, error } = await supabaseClient
                           .from('companies')
                           .insert(values)
                           .select()
                           .single();

                        if (error) {
                           console.error(error);
                           return;
                        }

                        if (selectedCountries.length > 0) {
                           await supabaseClient
                              .from('company_countries')
                              .insert(
                                 selectedCountries.map((c) => ({
                                    company_id: company.id,
                                    country_id: c.id,
                                 }))
                              );
                        }

                        setOpen(false);
                        setSelectedCountries([]);
                        router.refresh();
                     }}
                     onCancel={() => {
                        setOpen(false);
                        setSelectedCountries([]);
                     }}
                  />
               </div>
            </div>
         )}
      </>
   );
}
