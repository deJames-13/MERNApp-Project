import * as yup from 'yup';

export const productValidation = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters long').required('*Required'),
  price: yup.number().positive().min(1, 'Price must be at least 1').required('*Required number input'),
  stock: yup.number().positive().min(1, 'Stock must be at least 1').required('*Required number input'),
  description: yup.string(),
  // image: yup.array().min(1, 'Image is required').required('*Required'),
});
