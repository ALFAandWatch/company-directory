import { CompanyType } from './CompanyType';
import { Country } from './Country';

export type Company = {
   id: string;
   name: string;
   countries: Country[];
   website: string | null;
   careers?: string | null;
   category: CompanyType;
   created_at: string;
};
