'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { editCompanySchema } from '@/validations/editCompanySchema';

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

   const validCategories = [
      'product',
      'agency',
      'consulting',
      'startup',
      'other',
   ];

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
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
               <Formik
                  initialValues={{
                     name: company.name || '',
                     category: validCategories.includes(company.category)
                        ? company.category
                        : '',
                     website: company.website || '',
                     careers: company.careers || '',
                  }}
                  validationSchema={editCompanySchema}
                  onSubmit={async (values) => {
                     // 1. update company
                     const { error } = await supabaseClient
                        .from('companies')
                        .update(values)
                        .eq('id', company.id);

                     if (error) {
                        console.error(error);
                        return;
                     }

                     // 2. borrar relaciones actuales
                     const { error: deleteError } = await supabaseClient
                        .from('company_countries')
                        .delete()
                        .eq('company_id', company.id);

                     if (deleteError) {
                        console.error(deleteError);
                        return;
                     }

                     // 3. insertar nuevas
                     if (selectedCountries.length > 0) {
                        const relations = selectedCountries.map((c) => ({
                           company_id: company.id,
                           country_id: c.id,
                        }));

                        const { error: insertError } = await supabaseClient
                           .from('company_countries')
                           .insert(relations);

                        if (insertError) {
                           console.error(insertError);
                           return;
                        }
                     }

                     setOpen(false);
                     router.refresh();
                  }}
               >
                  <Form className="bg-neutral-900 p-6 rounded-lg w-full max-w-md flex flex-col gap-3">
                     <Field
                        name="name"
                        placeholder="Name"
                        className="p-2 bg-neutral-800 rounded"
                     />
                     <ErrorMessage
                        name="name"
                        component="p"
                        className="text-red-500 text-xs"
                     />

                     <Field
                        as="select"
                        name="category"
                        className="p-2 bg-neutral-800 rounded"
                     >
                        <option value="product">Product</option>
                        <option value="agency">Agency</option>
                        <option value="consulting">Consulting</option>
                        <option value="startup">Startup</option>
                        <option value="other">Other</option>
                     </Field>
                     <ErrorMessage
                        name="category"
                        component="p"
                        className="text-red-500 text-xs"
                     />

                     <Field
                        name="website"
                        placeholder="Website"
                        className="p-2 bg-neutral-800 rounded"
                     />
                     <ErrorMessage
                        name="website"
                        component="p"
                        className="text-red-500 text-xs"
                     />

                     <Field
                        name="careers"
                        placeholder="Careers"
                        className="p-2 bg-neutral-800 rounded"
                     />
                     <ErrorMessage
                        name="careers"
                        component="p"
                        className="text-red-500 text-xs"
                     />

                     {/* Countries */}
                     <div className="flex flex-wrap gap-2">
                        {selectedCountries.map((country) => (
                           <span
                              key={country.id}
                              className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2 text-gray-800"
                           >
                              {country.name}
                              <button
                                 type="button"
                                 onClick={() =>
                                    setSelectedCountries((prev) =>
                                       prev.filter((c) => c.id !== country.id)
                                    )
                                 }
                              >
                                 ✕
                              </button>
                           </span>
                        ))}
                     </div>

                     <select
                        className="p-2 bg-neutral-800 rounded"
                        onChange={(e) => {
                           const countryId = e.target.value;

                           // 🔹 1. encontrar el país
                           const country = allCountries.find(
                              (c) => c.id === countryId
                           );

                           if (!country) return;

                           // 🔹 2. evitar duplicados
                           setSelectedCountries((prev) => {
                              if (prev.some((c) => c.id === country.id))
                                 return prev;

                              // 🔹 3. agregar
                              return [...prev, country];
                           });
                        }}
                     >
                        <option value="">Agregar país</option>

                        {allCountries.map((c) => (
                           <option key={c.id} value={c.id}>
                              {c.name}
                           </option>
                        ))}
                     </select>

                     <div className="flex justify-between mt-4">
                        <button
                           type="button"
                           onClick={() => setOpen(false)}
                           className="text-gray-400 hover:cursor-pointer hover:underline"
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
                  </Form>
               </Formik>
            </div>
         )}
      </>
   );
}
