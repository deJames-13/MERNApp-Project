import { unique } from '#utils';
import { check } from 'express-validator';
import CourierModel from './courier.model.js';

const commonRules = () => {
  return [
    check('name')
      .notEmpty()
      .withMessage('Name is required!')
      .matches(/^[a-zA-Z0-9 ]+$/)
      .withMessage('Name must be alphanumeric!'),
      check('contactNumber')
      .notEmpty()
      .withMessage('Contact number is required!'),
    check('serviceArea')
      .notEmpty()
      .withMessage('Service area is required!')
  ];
};

const courierCreateRules = () => {
  // METHOD CHAINING
  return [
    ...commonRules(),
    check('name')
      .custom((value) => unique(CourierModel, 'name', value))
      .withMessage('Name must be unique!'),
    check('contactNumber')
      .custom((value) => unique(CourierModel, 'contactNumber', value))
      .withMessage('Contact number has already been used!'),
    // check('serviceArea')
    //   .custom((value) => unique(CourierModel, 'contactNumber', value))
    //   .withMessage('Service area has already been used!'),
  ];
};

const courierUpdateRules = () => {
  return [
    ...commonRules(),
    check('name')
      .custom((value, { req }) =>
        unique(CourierModel, 'name', value, req?.params?.id, { slug: { $ne: req?.params?.slug } })
      )
      .withMessage('Name must be unique!'),
    check('contactNumber')
      .custom((value, { req }) =>
        unique(CourierModel, 'contactNumber', value, req?.params?.id)
      )
      .withMessage('Contact number has already been used!'),
  ];
};
export { courierCreateRules, courierUpdateRules };

// // USING SCHEMA: BUT i don't like it
// return checkSchema({
//   name: {
//     notEmpty: { errorMessage: 'Name is required!' },
//   },
// });
