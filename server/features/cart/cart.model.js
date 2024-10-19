import { Schema } from '#lib';
import { ImageSchema } from '#utils';
import mongoose from 'mongoose';

const Cart = new Schema({
  name: 'Cart',
  schema: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true },
  ],
});

Cart.statics.fillables = [];
Cart.statics.hidden = [];

export default Cart.makeModel();
