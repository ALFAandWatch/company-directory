'use client';

import { useFormik } from 'formik';
import { supabaseClient } from '@/lib/supabaseClient';
import { Country } from '@/types/Country';
import getFlagEmoji from '@/utils/getFlagEmoji';
import { suggestionSchema } from '@/validations/suggestionSchema';
import FilterDropdown from '@/components/FilterDropdown';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
   countries: Country[];
   dictionary: any;
   lang: string;
};

export default function SuggestionPage({ countries, dictionary }: Props) {
   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
   const [successMessage, setSuccessMessage] = useState(false);

   const formik = useFormik({
      initialValues: {
         name: '',
         website: '',
         countryIds: [] as string[],
      },

      validationSchema: suggestionSchema,

      onSubmit: async (values, { setSubmitting }) => {
         try {
            const { error } = await supabaseClient.rpc(
               'insert_suggestion_with_countries',
               {
                  suggestion_name: values.name,
                  suggestion_website: values.website,
                  country_ids: values.countryIds,
               }
            );

            if (error) throw error;

            setSuccessMessage(true);

            toast.success(dictionary.suggest.success, {
               id: 'suggestion-success',
            });
            formik.resetForm();
         } catch (err: any) {
            console.error(err.message);

            toast.error(dictionary.suggest.error);
         } finally {
            setSubmitting(false);
         }
      },
   });

   const sortedCountries = [...countries].sort((a, b) =>
      a.name.localeCompare(b.name)
   );

   const countryOptions = sortedCountries.map((c) => ({
      value: c.id,
      label: `${getFlagEmoji(c.code)} ${c.name}`,
   }));

   return (
      <main className="p-6 py-10 max-w-xl mx-auto">
         <h1 className="text-2xl font-bold mb-6">{dictionary.suggest.title}</h1>

         <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* NAME */}
            <div className="mb-2 text-sm">
               <label htmlFor="name">{dictionary.suggest.name}*</label>
            </div>
            <input
               name="name"
               id="name"
               value={formik.values.name}
               onChange={formik.handleChange}
               data-testid="suggestion-name"
               className="w-full px-4 py-2 border bg-black/40 border-gray-700 hover:border-gray-400 focus:border-gray-400 focus:outline-none rounded-lg"
            />
            {(formik.touched.name || formik.submitCount > 0) &&
               formik.errors.name && (
                  <p className="text-red-400 text-sm">{formik.errors.name}</p>
               )}

            {/* WEBSITE */}
            <div className="mb-2 text-sm">
               <label htmlFor="website">{dictionary.suggest.website}*</label>
            </div>
            <input
               name="website"
               id="website"
               value={formik.values.website}
               onChange={formik.handleChange}
               data-testid="suggestion-website"
               className="w-full px-4 py-2 border bg-black/40 border-gray-700 hover:border-gray-400 focus:border-gray-400 focus:outline-none rounded-lg"
            />
            {(formik.touched.website || formik.submitCount > 0) &&
               formik.errors.website && (
                  <p className="text-red-400 text-sm">
                     {formik.errors.website}
                  </p>
               )}

            {/* COUNTRIES (dropdown + chips) */}
            <div>
               <p className="mb-2 text-sm">Countries*</p>

               {/* CHIPS */}
               <div className="flex flex-wrap gap-2 mb-2">
                  {formik.values.countryIds.map((id) => {
                     const country = countries.find((c) => c.id === id);

                     if (!country) return null;

                     return (
                        <span
                           key={id}
                           className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                           {getFlagEmoji(country.code)}
                           {country.name}
                           <button
                              type="button"
                              onClick={() => {
                                 formik.setFieldValue(
                                    'countryIds',
                                    formik.values.countryIds.filter(
                                       (cId) => cId !== id
                                    )
                                 );
                              }}
                              className="text-white font-bold"
                           >
                              ×
                           </button>
                        </span>
                     );
                  })}
               </div>

               {/* SELECT */}
               <FilterDropdown
                  id="country"
                  isOpen={openDropdown === 'country'}
                  onToggle={() =>
                     setOpenDropdown(
                        openDropdown === 'country' ? null : 'country'
                     )
                  }
                  selected={formik.values.countryIds}
                  onChange={(value) => {
                     formik.setFieldValue('countryIds', value, true);
                     formik.setFieldTouched('countryIds', true, false);
                  }}
                  options={countryOptions}
                  dictionary={dictionary}
                  testId="suggestion-country"
               />

               {/* ERROR */}
               {formik.touched.countryIds && formik.errors.countryIds && (
                  <p className="text-red-400 text-sm mt-1">
                     {formik.errors.countryIds as string}
                  </p>
               )}
            </div>

            {/* SUBMIT */}
            <button
               type="submit"
               data-testid="submit-button"
               disabled={formik.isSubmitting}
               className="w-full py-2 mt-3 bg-gray-100 hover:bg-gray-200 text-black font-semibold rounded-lg hover:cursor-pointer"
            >
               {formik.isSubmitting
                  ? dictionary.suggest.sending
                  : dictionary.suggest.submit}
            </button>
         </form>
      </main>
   );
}
