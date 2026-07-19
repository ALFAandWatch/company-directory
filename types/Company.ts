import { Country } from './Country';

export type Company = {
   id: string;
   name: string;
   countries: Country[];
   website: string | null;
   careers?: string | null;
   category: 'product' | 'agency' | 'consulting' | 'startup' | 'other';
   created_at: string;
};
