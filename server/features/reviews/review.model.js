import { Schema } from '#lib';
import { ImageSchema } from '#utils';
import customBadWords from './customBadWords.js';
import { Filter } from 'bad-words';

const filter = new Filter();
filter.addWords(...customBadWords);

const reviewSchema = new Schema({
  name: 'Review',
  schema: [
    {
      // order: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'Order',
      //   required: true
      // },
      ratings: {
        type: Number,
        required: [true, 'Please provide a rating'],
        min: 1,
        max: 5,
        validate: {
          validator: Number.isInteger,
          message: 'Rating must be an interger between 1 and 5'
        }
      },
      description: {
        type: String,
        required: [true, 'Please provide a review'],
        validate: {
          validator: (value) => !filter.isProfane(value),
          message: 'Review contains bad words'
        }
      },
      suggestion: {
        type: String,
        required: false,
        validate: {
          validator: (value) => !filter.isProfane(value),
          message: 'Suggestion contains bad words'
        }
      },
      isAnonymous: {
        type: Boolean,
        default: false
      },
    images: [ImageSchema]
    },
    { timestamps: true }
  ],
});

export default reviewSchema.makeModel();
