import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Product = new Schema({
  name: 'Product',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Product name must be unique!'],
        required: [true, 'Product name is required!'],
      },
      description: {
        type: String,
      },
      slug: {
        type: String,
      },
      price: {
        type: Number,
        required: [true, 'Product price is required!'],
      },
      stock: {
        type: Number,
        required: [true, 'Product price is required!'],
      },

      images: [ImageSchema],
    },
    { timestamps: true },
  ],
});

Product.statics.fillables = [];
Product.statics.hidden = [];

export default Product.makeModel();
