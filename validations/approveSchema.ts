import { COMPANY_TYPES } from '@/types/CompanyType';
import * as Yup from 'yup';

export const approveSchema = Yup.object({
   name: Yup.string().required('Name is required'),
   category: Yup.string().oneOf(COMPANY_TYPES).required('Category is required'),
   website: Yup.string().url('Invalid URL').nullable(),
   careers: Yup.string().url('Invalid URL').nullable(),
});
