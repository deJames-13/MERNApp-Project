import * as yup from 'yup';

export const supplierValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .required('*Required'),
  emailAddress: yup
    .string()
    .email('Must be a valid email address')
    .required('*Required'),
  contactNumber: yup
    .string()
    .min(11, 'Contact Number must contain 11-digit number yup')
    .required('*Required'),
});
