'use client';

import CompanyCard from '@/components/CompanyCard';
import { Company } from '@/types/Company';
import { Dictionary, Lang } from '@/types/i18b';
import { useState } from 'react';
import FilterDropdown from '@/components/FilterDropdown';
import { Country } from '@/types/Country';
import getFlagEmoji from '@/utils/getFlagEmoji';

type Props = {
   companies: Company[];
   countries: Country[];
   dictionary: Dictionary;
   lang: Lang;
};

export default function CompaniesPage({
   companies,
   countries,
   dictionary,
   lang,
}: Props) {
   const [search, setSearch] = useState('');

   const [categoryFilter, setCategoryFilter] = useState('all');
   const [countryFilter, setCountryFilter] = useState('all');

   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

   let displayedCompanies = companies;

   displayedCompanies = companies.filter((company) => {
      const matchesSearch = company.name
         .toLowerCase()
         .includes(search.toLowerCase());

      const matchesCategory =
         categoryFilter === 'all' || company.category === categoryFilter;

      const matchesCountry =
         countryFilter === 'all' ||
         company.countries.some((c) => c.id === countryFilter);

      return matchesSearch && matchesCategory && matchesCountry;
   });

   const countryOptions = [
      { label: dictionary.companies.countryFilter, value: 'all' },

      ...countries
         .slice()
         .sort((a, b) => a.name.localeCompare(b.name))
         .map((c) => ({
            label: `${getFlagEmoji(c.code)} ${c.name}`,
            value: c.id,
         })),
   ];

   return (
      <main className="p-6 max-w-4xl mx-auto">
         <h1 className="text-3xl font-bold mb-6">
            {dictionary.companies.title}
         </h1>

         <input
            id="search"
            name="search"
            type="text"
            placeholder={dictionary.companies.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-700 rounded-lg focus:border-gray-400 focus:outline-none"
         />

         <div className="flex flex-wrap gap-3 mb-6">
            <FilterDropdown
               id="category"
               isOpen={openDropdown === 'category'}
               onToggle={() =>
                  setOpenDropdown(
                     openDropdown === 'category' ? null : 'category'
                  )
               }
               selected={categoryFilter}
               onChange={setCategoryFilter}
               options={[
                  { label: dictionary.companies.categoryFilter, value: 'all' },
                  { label: 'Product', value: 'product' },
                  { label: 'Agency', value: 'agency' },
                  { label: 'Consulting', value: 'consulting' },
                  { label: 'Startup', value: 'startup' },
               ]}
            />

            <FilterDropdown
               id="country"
               isOpen={openDropdown === 'country'}
               onToggle={() =>
                  setOpenDropdown(openDropdown === 'country' ? null : 'country')
               }
               selected={countryFilter}
               onChange={setCountryFilter}
               options={countryOptions}
            />
         </div>

         <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayedCompanies.map((company) => (
               <CompanyCard key={company.id} company={company} />
            ))}
         </div>
      </main>
   );
}
