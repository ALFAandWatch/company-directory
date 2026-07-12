import type { Config } from 'tailwindcss';

const config: Config = {
   theme: {
      extend: {
         fontFamily: {
            dm: ['var(--font-dm-sans)'],
         },
      },
   },
};

export default config;
