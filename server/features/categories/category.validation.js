import { unique } from '#utils';
import { check } from 'express-validator';
import CategoryModel from './category.model.js';

const commonRules = () => {
  return [
    check('name')
      .notEmpty()
      .withMessage('Name is required!')
      .matches(/^[a-zA-Z0-9 ]+$/)
      .withMessage('Name must be alphanumeric!'),
  ];
};

const categoryCreateRules = () => {
  // METHOD CHAINING
  return [
    ...commonRules(),
    check('name')
      .custom((value) => unique(CategoryModel, 'name', value))
      .withMessage('Name must be unique!'),
  ];
};

const categoryUpdateRules = () => {
  return [
    ...commonRules(),
    check('name')
      .custom((value, { req }) =>
        unique(CategoryModel, 'name', value, req?.params?.id, { slug: { $ne: req?.params?.slug } })
      )
      .withMessage('Name must be unique!'),
  ];
};
export { categoryCreateRules, categoryUpdateRules };

// // USING SCHEMA: BUT i don't like it
// return checkSchema({
//   name: {
//     notEmpty: { errorMessage: 'Name is required!' },
//   },
// });
