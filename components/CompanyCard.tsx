import { Company } from '@/types/Company';

export default function CompanyCard({ company }: { company: Company }) {
   return (
      <div className="p-5 border rounded-2xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition flex flex-col justify-between">
         {/* TOP */}
         <div>
            {/* NAME */}
            <h2 className="text-lg font-semibold mb-1">{company.name}</h2>

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
                  className="text-sm font-medium text-blue-600 hover:underline"
               >
                  Visit →
               </a>
            ) : (
               <span className="text-sm text-zinc-400">No website</span>
            )}

            {/* FUTURE: FAVORITE */}
            <button className="text-zinc-400 hover:text-yellow-500 transition">
               ★
            </button>
         </div>
      </div>
   );
}
