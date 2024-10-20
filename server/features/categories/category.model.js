import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Category = new Schema({
  name: 'Category',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Category name must be unique'],
        required: [true, 'Category name is required'],
      },
      slug: {
        type: String,
      },
      images: [ImageSchema],
    },
    { timestamps: true },
  ],
});

Category.statics.fillables = [];
Category.statics.hidden = [];

export default Category.makeModel();

