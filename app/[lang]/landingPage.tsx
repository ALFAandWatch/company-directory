'use client';

import { Dictionary, Lang } from '@/types/i18b';
import { motion } from 'framer-motion';
import Link from 'next/link';

type LandingPageProps = {
   dictionary: Dictionary;
   lang: Lang;
};

export default function LandingPage({ dictionary, lang }: LandingPageProps) {
   return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-6">
         <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl"
         >
            {/* TITLE */}
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
               CompanyHub
            </h1>

            {/* DESCRIPTION */}
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
               {dictionary.landing.description}
            </p>

            {/* CTA */}
            <Link href={`/${lang}/companies`}>
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 text-lg font-medium bg-black text-white dark:bg-white dark:text-black rounded-xl shadow-md hover:cursor-pointer"
               >
                  {dictionary.landing.cta}
               </motion.button>
            </Link>
         </motion.div>
      </main>
   );
}
