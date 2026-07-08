'use client';

import CompanyCard from '@/components/CompanyCard';
import { Company } from '@/types/Company';
import { Dictionary, Lang } from '@/types/i18b';
import { useEffect, useState } from 'react';
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
   const [showFavorites, setShowFavorites] = useState(false);

   const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

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

      const matchesFavorites =
         !showFavorites || favoriteIds.includes(company.id);

      return (
         matchesSearch && matchesCategory && matchesCountry && matchesFavorites
      );
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

   const toggleFavorite = (companyId: string) => {
      setFavoriteIds((prev) => {
         let updated;

         if (prev.includes(companyId)) {
            updated = prev.filter((id) => id !== companyId);
         } else {
            updated = [...prev, companyId];
         }

         localStorage.setItem('favorites', JSON.stringify(updated));

         return updated;
      });
   };

   useEffect(() => {
      const stored = localStorage.getItem('favorites');

      if (stored) {
         setFavoriteIds(JSON.parse(stored));
      }
   }, []);

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
            <button
               onClick={() => setShowFavorites((prev) => !prev)}
               className={`px-3 py-2 rounded-lg border border-gray-700 hover:border-gray-400 hover:cursor-pointer transition ${
                  showFavorites ? 'bg-mist-700 text-gray-200' : 'text-gray-400'
               }`}
            >
               ⭐ Favorites
            </button>
         </div>

         <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayedCompanies.map((company) => (
               <CompanyCard
                  key={company.id}
                  company={company}
                  isFavorite={favoriteIds.includes(company.id)}
                  onToggleFavorite={toggleFavorite}
               />
            ))}
         </div>
      </main>
   );
}
