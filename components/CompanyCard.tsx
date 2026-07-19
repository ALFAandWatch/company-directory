import { Company } from '@/types/Company';
import { useEffect, useState } from 'react';

type Props = {
   company: Company;
   isFavorite: boolean;
   onToggleFavorite: (id: string) => void;
   dictionary: any;
};

export default function CompanyCard({
   company,
   isFavorite,
   onToggleFavorite,
   dictionary,
}: Props) {
   return (
      <div className="p-5 border border-gray-600 hover:border-sky-600 rounded-2xl bg-linear-to-b from-slate-950/50 to-slate-600/30 backdrop-blur-lg shadow-md hover:brightness-125 transition-all duration-700 flex flex-col justify-between">
         {/* TOP */}
         <div>
            {/* NAME */}
            <h2 className="text-2xl font-semibold text-gray-100">
               {company.name}
            </h2>
            <p className="inline-block text-gray-400 bg-mist-800 text-sm my-1 p-1 px-3 rounded-sm">
               {company.category.charAt(0).toUpperCase() +
                  company.category.slice(1)}
            </p>

            {/* COUNTRY */}
            {company.countries.length > 0 && (
               <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {company.countries.map((c) => (
                     <img
                        key={c.code}
                        src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                        alt={c.name}
                        title={c.name}
                        className="rounded-sm"
                     />
                  ))}
               </div>
            )}
         </div>

         {/* BOTTOM */}
         <div className="mt-4 flex justify-between items-center">
            {/* WEBSITE */}
            {company.website ? (
               <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-sky-600 hover:underline"
               >
                  {dictionary.companies.visit} →
               </a>
            ) : (
               <span className="text-sm text-zinc-400">No website</span>
            )}

            {company.careers && (
               <a
                  href={company.careers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-sky-600 hover:underline"
               >
                  View Careers →
               </a>
            )}

            {/* FUTURE: FAVORITE */}
            <button
               onClick={() => onToggleFavorite(company.id)}
               className={`transition hover:cursor-pointer hover:brightness-125 ${
                  isFavorite ? 'text-yellow-500' : 'text-zinc-400'
               }`}
            >
               ★
            </button>
         </div>
      </div>
   );
}
