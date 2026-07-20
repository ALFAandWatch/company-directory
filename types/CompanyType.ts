export const COMPANY_TYPES = [
   'software',
   'agency',
   'consulting',
   'marketplace',
   'ecommerce',
   'fintech',
   'healthtech',
   'other',
] as const;

export type CompanyType = (typeof COMPANY_TYPES)[number];
