import { Schema } from '#lib';
import { imageSchema } from '#utils';

const Brand = new Schema({
  name: 'Brand',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Brand name must be unique'],
        required: [true, 'Brand name is required'],
      },
      slug: {
        type: String,
      },
      description: {
        type: String,
        required: [true, 'Brand description is required'],
      },
      image: [{ imageSchema }],
    },
    { timestamps: true },
  ],
});

Brand.statics.fillables = [];
Brand.statics.hidden = [];

export default Brand.makeModel();
