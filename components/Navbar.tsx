'use client';

import Link from 'next/link';
import { Dictionary, Lang } from '@/types/i18b';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type NavbarProps = {
   dictionary: Dictionary;
   lang: Lang;
};

export default function Navbar({ dictionary, lang }: NavbarProps) {
   const [isOpen, setIsOpen] = useState(false);
   const pathname = usePathname();

   const getSwitchLangPath = (newLang: Lang) => {
      if (!pathname) return `/${newLang}`;

      const segments = pathname.split('/');

      // ['', 'es', 'companies']
      segments[1] = newLang;

      return segments.join('/');
   };

   return (
      <>
         <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
            {/* LOGO */}
            <Link href={`/${lang}`} className="font-bold text-xl">
               CompanyHub
            </Link>

            {/* LINKS */}
            <div className="hidden md:flex gap-6">
               <Link href={`/${lang}`}>{dictionary.navbar.home}</Link>

               <Link href={`/${lang}/companies`}>
                  {dictionary.navbar.companies}
               </Link>

               <Link href={`/${lang}/suggest`}>
                  {dictionary.navbar.suggest}
               </Link>
            </div>

            {/* LANGUAGE SWITCHER */}
            <div className="hidden md:flex">
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

            {/* HAMBURGER BUTTON */}
            <button
               onClick={() => setIsOpen(true)}
               className="md:hidden flex flex-col gap-1"
            >
               <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
               <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
               <span className="w-6 h-0.5 bg-black dark:bg-white"></span>
            </button>
         </nav>
         {isOpen && (
            <div
               onClick={() => setIsOpen(false)}
               className="fixed inset-0 bg-black/50 z-40"
            />
         )}
         {/* OFFCANVAS */}
         <div
            className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-black z-50 transform transition-transform duration-300 ${
               isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
         >
            <div className="p-6 flex flex-col gap-6">
               {/* CLOSE BUTTON */}
               <button
                  onClick={() => setIsOpen(false)}
                  className="self-end text-xl"
               >
                  ✕
               </button>

               {/* LINKS */}
               <Link href={`/${lang}`} onClick={() => setIsOpen(false)}>
                  {dictionary.navbar.home}
               </Link>

               <Link
                  href={`/${lang}/companies`}
                  onClick={() => setIsOpen(false)}
               >
                  {dictionary.navbar.companies}
               </Link>

               <Link href={`/${lang}/suggest`} onClick={() => setIsOpen(false)}>
                  {dictionary.navbar.suggest}
               </Link>

               {/* LANG SWITCH */}
               <div className="flex gap-2 mt-4">
                  <Link href={getSwitchLangPath('es')}>
                     <button className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700">
                        ES
                     </button>
                  </Link>

                  <Link href={getSwitchLangPath('en')}>
                     <button className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700">
                        EN
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
}
