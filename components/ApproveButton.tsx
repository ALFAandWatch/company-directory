'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { approveSchema } from '@/validations/approveSchema';

type Country = {
   id: string;
   name: string;
   code: string;
};

export default function ApproveButton({ suggestion }: { suggestion: any }) {
   const [open, setOpen] = useState(false);
   const [selectedCountries, setSelectedCountries] = useState<Country[]>(
      suggestion.suggestion_countries?.map((sc: any) => sc.countries) || []
   );
   const [allCountries, setAllCountries] = useState<Country[]>([]);

   const router = useRouter();

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
            className="px-2 py-1 text-xs bg-green-500 rounded hover:cursor-pointer"
         >
            Approve
         </button>

         {open && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
               <Formik
                  initialValues={{
                     name: suggestion.name || '',
                     category: validCategories.includes(suggestion.category)
                        ? suggestion.category
                        : '',
                     website: suggestion.website || '',
                     careers: suggestion.careers || '',
                  }}
                  validationSchema={approveSchema}
                  onSubmit={async (values) => {
                     // obtener la company creada
                     const { data: company, error: insertError } =
                        await supabaseClient
                           .from('companies')
                           .insert(values)
                           .select()
                           .single();

                     if (insertError) {
                        console.error(insertError);
                        return;
                     }

                     // insertar countries
                     if (selectedCountries.length > 0) {
                        const relations = selectedCountries.map((c) => ({
                           company_id: company.id,
                           country_id: c.id,
                        }));

                        const { error: countriesError } = await supabaseClient
                           .from('company_countries')
                           .insert(relations);

                        if (countriesError) {
                           console.error(countriesError);
                           return;
                        }
                     }

                     await supabaseClient
                        .from('suggestions')
                        .delete()
                        .eq('id', suggestion.id);

                     setOpen(false);
                     router.refresh();
                  }}
               >
                  {() => (
                     <Form className="bg-neutral-900 p-6 rounded-lg w-full max-w-md flex flex-col gap-3">
                        <Field
                           name="name"
                           placeholder="Name"
                           className="p-2 bg-neutral-800 rounded"
                        />
                        <ErrorMessage
                           name="name"
                           component="span"
                           className="text-red-500 text-sm"
                        />

                        <Field
                           as="select"
                           name="category"
                           className="p-2 bg-neutral-800 rounded"
                        >
                           <option value="">Select category</option>
                           <option value="product">Product</option>
                           <option value="agency">Agency</option>
                           <option value="consulting">Consulting</option>
                           <option value="startup">Startup</option>
                           <option value="other">Other</option>
                        </Field>

                        <ErrorMessage
                           name="category"
                           component="span"
                           className="text-red-500 text-sm"
                        />

                        <Field
                           name="website"
                           placeholder="Website"
                           className="p-2 bg-neutral-800 rounded"
                        />
                        <ErrorMessage
                           name="website"
                           component="span"
                           className="text-red-500 text-sm"
                        />

                        <Field
                           name="careers"
                           placeholder="Careers"
                           className="p-2 bg-neutral-800 rounded"
                        />
                        <ErrorMessage
                           name="careers"
                           component="span"
                           className="text-red-500 text-sm"
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
                                          prev.filter(
                                             (c) => c.id !== country.id
                                          )
                                       )
                                    }
                                 >
                                    ✕
                                 </button>
                              </span>
                           ))}
                        </div>

                        <select
                           onChange={(e) => {
                              const countryId = e.target.value;
                              const country = allCountries.find(
                                 (c) => c.id === countryId
                              );

                              if (!country) return;

                              setSelectedCountries((prev) => {
                                 if (prev.some((c) => c.id === country.id))
                                    return prev;
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
                              Create Company
                           </button>
                        </div>
                     </Form>
                  )}
               </Formik>
            </div>
         )}
      </>
   );
}
