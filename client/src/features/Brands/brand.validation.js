import * as yup from 'yup';

export const brandValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .required('*Required'),
  decription: yup
    .string()
    .max(100, 'Description cannot exceed 100 characters!')
    .required('*Required'),
});
