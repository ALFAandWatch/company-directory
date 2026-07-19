'use client';

import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { supabaseClient } from '@/lib/supabaseClient';
import { approveSchema } from '@/validations/approveSchema';
import { Country } from '@/types/Country';

type Props = {
   initialValues: {
      name: string;
      category: string;
      website: string;
      careers: string;
   };
   selectedCountries: Country[];
   onCountriesChange: (countries: Country[]) => void;
   onSubmit: (values: any) => Promise<void>;
   onCancel: () => void;
};

export default function CompanyForm({
   initialValues,
   selectedCountries,
   onCountriesChange,
   onSubmit,
   onCancel,
}: Props) {
   const [allCountries, setAllCountries] = useState<Country[]>([]);

   useEffect(() => {
      const fetchCountries = async () => {
         const { data } = await supabaseClient
            .from('countries')
            .select('*')
            .order('name', { ascending: true });

         setAllCountries(data ?? []);
      };

      fetchCountries();
   }, []);

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={approveSchema}
         onSubmit={onSubmit}
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

               <Field
                  name="website"
                  placeholder="Website"
                  className="p-2 bg-neutral-800 rounded"
               />
               <Field
                  name="careers"
                  placeholder="Careers"
                  className="p-2 bg-neutral-800 rounded"
               />

               {/* Countries */}
               <div className="flex flex-wrap gap-2">
                  {selectedCountries.map((country) => (
                     <span
                        key={country.id}
                        className="bg-gray-200 px-2 py-1 rounded text-gray-800"
                     >
                        {country.name}
                        <button
                           type="button"
                           onClick={() =>
                              onCountriesChange(
                                 selectedCountries.filter(
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
                     const country = allCountries.find(
                        (c) => c.id === e.target.value
                     );
                     if (!country) return;

                     if (selectedCountries.some((c) => c.id === country.id))
                        return;

                     onCountriesChange([...selectedCountries, country]);
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
                     onClick={onCancel}
                     className="text-gray-400 hover:underline hover:cursor-pointer"
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
         )}
      </Formik>
   );
}
