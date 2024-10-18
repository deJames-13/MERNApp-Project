import * as yup from 'yup';

export const courierValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .required('*Required'),
  contactNumber: yup
    .string()
    .max(11, 'Contact number must contain 11-digit number')
    .required('*Required'),
  serviceArea: yup
    .string()
    .min(3, 'Service Area must be at least 3 characters long')
    .required('*Required'),
});