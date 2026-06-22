'use client';

import Link from 'next/link';
import { Dictionary, Lang } from '@/types/i18b';

type NavbarProps = {
   dictionary: Dictionary;
   lang: Lang;
};

export default function Navbar({ dictionary, lang }: NavbarProps) {
   // 🔹 helper para cambiar idioma
   const getSwitchLangPath = (newLang: Lang) => {
      return `/${newLang}`;
   };

   return (
      <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
         {/* LOGO */}
         <Link href={`/${lang}`} className="font-bold text-xl">
            CompanyHub
         </Link>

         {/* LINKS */}
         <div className="flex gap-6">
            <Link href={`/${lang}`}>{dictionary.navbar.home}</Link>

            <Link href={`/${lang}/companies`}>
               {dictionary.navbar.companies}
            </Link>

            <Link href={`/${lang}/favorites`}>
               {dictionary.navbar.favorites}
            </Link>

            <Link href={`/${lang}/suggest`}>{dictionary.navbar.suggest}</Link>
         </div>

         {/* LANGUAGE SWITCHER */}
         <div className="flex">
            <Link href={getSwitchLangPath('es')}>
               <button
                  className={`px-3 py-1 rounded-l hover:cursor-pointer hover:brightness-125 ${
                     lang === 'es'
                        ? 'bg-black text-white'
                        : 'bg-zinc-200 dark:bg-zinc-700'
                  }`}
               >
                  ES
               </button>
            </Link>

            <Link href={getSwitchLangPath('en')}>
               <button
                  className={`px-3 py-1 rounded-r hover:cursor-pointer hover:brightness-125 ${
                     lang === 'en'
                        ? 'bg-black text-white'
                        : 'bg-zinc-200 dark:bg-zinc-700'
                  }`}
               >
                  EN
               </button>
            </Link>
         </div>
      </nav>
   );
}
