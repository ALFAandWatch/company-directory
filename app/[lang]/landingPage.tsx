'use client';

import { getDictionary } from '@/lib/getDictionary';
import { Dictionary, Lang } from '@/types/i18b';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type LandingPageProps = {
   lang: string;
};

export default function LandingPage({ lang }: LandingPageProps) {
   const [dict, setDict] = useState<Dictionary>();

   useEffect(() => {
      const loadDict = async () => {
         const data = await getDictionary(lang as Lang);
         setDict(data);
      };
      loadDict();
   }, []);

   return (
      <main className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-16 flex flex-col items-center bg-linear-to-t from-cyan-700/30 to-black/1 to-8%">
         <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl text-center flex flex-col gap-20"
         >
            {/* 🟣 HERO */}
            <section className="min-h-160 flex flex-col justify-center items-center gap-8 lg:gap-6 px-6 relative bg-radial-[at_60%_35%] from-indigo-700/50 to-black to-80%">
               <h1 className="text-2xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight text-balance">
                  {dict?.landing.hero.title}
               </h1>

               <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl border border-white/10 p-8 max-w-xl">
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-8 text-balance">
                     {dict?.landing.hero.description}
                  </p>
               </div>

               <Link href={`/${lang}/companies`}>
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.97 }}
                     className="mt-4 px-8 py-3 text-base font-medium bg-black text-white dark:bg-white dark:text-black rounded-xl shadow-md hover:cursor-pointer"
                  >
                     {dict?.landing.hero.button}
                  </motion.button>
               </Link>
            </section>

            {/* 🔵 FEATURES */}
            <section className="flex flex-col gap-8 text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl bg-gray-800/30 backdrop-blur-lg rounded-xl border border-white/10 p-8 mx-auto bg-radial-[at_100%_100%] from-cyan-700/45 to-black to-80%">
               <div className="flex flex-col items-start text-start text-balance max-w-3xl mx-auto font-light">
                  <ul>
                     {dict?.landing.features.items.map((item, k) => {
                        return (
                           <li
                              key={k}
                              className="flex flex-col items-center mb-6 text-balance"
                           >
                              <div className="flex">
                                 <Image
                                    height={25}
                                    width={25}
                                    src="/icons/check.svg"
                                    alt="Check"
                                 />
                                 <p className="text-zinc-200">{item.title}</p>
                              </div>
                              <p className="text-zinc-400 text-center">
                                 {item.description}
                              </p>
                           </li>
                        );
                     })}
                  </ul>
               </div>
               <hr className="border border-gray-300/10" />
               <div>
                  <p className="text-lg md:text-xl text-zinc-800 dark:text-zinc-200 max-w-lg mx-auto text-center font-light">
                     {dict?.landing.features.intro}
                  </p>

                  <p className="text-lg text-zinc-600 dark:text-zinc-400">
                     {dict?.landing.features.outro}
                  </p>
               </div>
            </section>

            {/* 🟢 COMMUNITY CTA */}
            <section className="min-h-160 flex flex-col justify-center items-center lg:px-6">
               <div className="flex flex-col lg:flex-row justify-around items-center gap-4 p-15 lg:p-0 text-center w-full max-w-5xl min-h-60 bg-radial-[at_70%_100%] from-cyan-700/60 to-black to-100% rounded-2xl hover:brightness-155 transition-brightness duration-800">
                  <div className="flex flex-col gap-10 lg:gap-0">
                     <p className="text-2xl font-semibold text-zinc-900 dark:text-white lg:text-start">
                        {dict?.landing.community.title}
                     </p>

                     <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md lg:text-start text-balance lg:text-nowrap">
                        {dict?.landing.community.description}
                     </p>
                  </div>
                  <Link href={`/${lang}/suggest`}>
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-5 lg:mt-0 px-8 py-3 text-base font-medium bg-black text-white dark:bg-white dark:text-black rounded-full shadow-md hover:cursor-pointer"
                     >
                        {dict?.landing.community.button}
                     </motion.button>
                  </Link>
               </div>
            </section>

            {/* 👤 ABOUT */}
            <section className=" border-t border-zinc-200 dark:border-zinc-800 mb-10 pt-10">
               <div className="bg-white/10 backdrop-blur-xl rounded-2xl flex flex-col items-center gap-4 py-8 px-10 max-w-md mx-auto z-20">
                  <div className="relative w-30 h-30 rounded-full bg-zinc-300 dark:bg-zinc-700 overflow-hidden">
                     <Image
                        src="/profile-pic.png"
                        width={1023}
                        height={1537}
                        alt="Photo"
                        className="absolute -bottom-12"
                     ></Image>
                  </div>
                  {/* 👉 reemplazar por tu imagen real */}

                  <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
                     {dict?.landing.about.title}
                  </p>

                  <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md text-center">
                     {dict?.landing.about.description}
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                     {dict?.landing.about.note}
                  </p>
               </div>
            </section>
         </motion.div>
      </main>
   );
}
