import { Schema } from '#lib';
import { ImageSchema } from '#utils';

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
      image: [{ ImageSchema }],
    },
    { timestamps: true },
  ],
});

Brand.statics.fillables = [];
Brand.statics.hidden = [];

export default Brand.makeModel();

