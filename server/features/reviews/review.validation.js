import { check } from 'express-validator';
import { unique } from '#utils';
import ReviewModel from './review.model.js';

const commonRules = {
  name: () =>
    check('description')
      .notEmpty()
      .withMessage('Description is required!')
};

const reviewCreateRules = () => [
  check('ratings')
    .isInt({ min: 1, max: 5 })
    .withMessage('Ratings must be an integer between 1 and 5'),
  check('description')
    .notEmpty()
    .withMessage('Description is required!')
    .isLength({ min: 5 })
    .withMessage('Description must be at least 5 characters long'),
  check('description')
    .custom((value) => !filter.isProfane(value))
    .withMessage('Description contains bad words'),
];

const reviewUpdateRules = () => [
  ...reviewCreateRules(),
  check('name').optional(),
];

export { reviewCreateRules, reviewUpdateRules };
