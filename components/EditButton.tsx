'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import CompanyForm from './CompanyForm';
import { COMPANY_TYPES, CompanyType } from '@/types/CompanyType';

type Country = {
   id: string;
   name: string;
   code: string;
};

export function EditButton({ company }: { company: any }) {
   const [open, setOpen] = useState(false);
   const router = useRouter();

   const [selectedCountries, setSelectedCountries] = useState<Country[]>(
      company.company_countries?.map((cc: any) => cc.countries) || []
   );
   const [allCountries, setAllCountries] = useState<Country[]>([]);

   useEffect(() => {
      const fetchCountries = async () => {
         const { data, error } = await supabaseClient
            .from('countries')
            .select('*')
            .order('name', { ascending: true });

         if (error) {
            console.error(error);
            return;
         }

         setAllCountries(data ?? []);
      };

      fetchCountries();
   }, []);

   return (
      <>
         <button
            onClick={() => setOpen(true)}
            className="px-2 py-1 text-xs bg-blue-500 rounded hover:cursor-pointer"
         >
            Edit
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
                     initialValues={{
                        name: company.name || '',
                        category: COMPANY_TYPES.includes(
                           company.category as CompanyType
                        )
                           ? company.category
                           : '',
                        website: company.website || '',
                        careers: company.careers || '',
                     }}
                     selectedCountries={selectedCountries}
                     onCountriesChange={setSelectedCountries}
                     onSubmit={async (values) => {
                        // misma lógica que ya tenés
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
