import * as Yup from 'yup';

export const editCompanySchema = Yup.object({
   name: Yup.string().required('Required'),

   category: Yup.string()
      .oneOf(['product', 'agency', 'consulting', 'startup', 'other'])
      .required('Required'),

   website: Yup.string().url('Invalid URL').nullable(),

   careers: Yup.string().url('Invalid URL').nullable(),
});
