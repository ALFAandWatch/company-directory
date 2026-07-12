import * as Yup from 'yup';

export const suggestionSchema = Yup.object({
   name: Yup.string().min(2, 'Too short').required('Company name is required'),

   website: Yup.string().url('Invalid URL').required('Website is required'),

   countryIds: Yup.array().min(1, 'Select at least one country'),
});
