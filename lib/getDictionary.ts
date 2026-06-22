import { Dictionary, Lang } from '@/types/i18b';

const dictionaries = {
   es: () => import('@/dictionaries/es.json').then((module) => module.default),
   en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (lang: Lang): Promise<Dictionary> => {
   return dictionaries[lang]();
};
