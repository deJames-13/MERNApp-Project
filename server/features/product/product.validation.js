import { unique } from '#utils';
import { check } from 'express-validator';
import ProductModel from './product.model.js';

const commonRules = () => {
  return [
    check('name')
      .notEmpty()
      .withMessage('Name is required!')
      .isString()
      .matches(/^[a-zA-Z0-9 ]+$/)
      .withMessage('Name must be alphanumeric!'),
    check('price').notEmpty().withMessage('Price is required!').isNumeric().withMessage('Price must be a number!'),
    check('stock').notEmpty().withMessage('Stock is required!').isNumeric().withMessage('Stock must be a number!'),
    check('description')
      .isString()
      .matches(/^[a-zA-Z0-9\-_ ]+$/),
  ];
};

const productCreateRules = () => {
  // METHOD CHAINING
  return [
    ...commonRules(),
    check('name')
      .custom((value) => unique(ProductModel, 'name', value))
      .withMessage('Name must be unique!'),
  ];
};

const productUpdateRules = () => {
  return [
    ...commonRules(),
    check('name')
      .custom((value, { req }) =>
        unique(ProductModel, 'name', value, req?.params?.id, { slug: { $ne: req?.params?.slug } })
      )
      .withMessage('Name must be unique!'),
  ];
};
export { productCreateRules, productUpdateRules };

// // USING SCHEMA: BUT i don't like it
// return checkSchema({
//   name: {
//     notEmpty: { errorMessage: 'Name is required!' },
//   },
// });
