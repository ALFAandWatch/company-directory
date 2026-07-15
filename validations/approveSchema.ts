import * as Yup from 'yup';

export const approveSchema = Yup.object({
   name: Yup.string().required('Name is required'),
   category: Yup.string()
      .oneOf(['product', 'agency', 'consulting', 'startup', 'other'])
      .required('Category is required'),
   website: Yup.string().url('Invalid URL').nullable(),
   careers: Yup.string().url('Invalid URL').nullable(),
});
