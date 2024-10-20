import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Order = new Schema({
  name: 'Order',
  schema: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, default: 'pending' },
      total: { type: Number, default: 0 },
      note: { type: String, default: '' },

      products: [
        {
          product: { type: Schema.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number, default: 1 },
        },
      ],
      payment: {
        method: { type: String, default: 'cash' },
        status: { type: String, default: 'pending' },
      },
      delivery: {
        address: { type: String, default: '' },
        date: { type: Date, default: Date.now },
      },
      // images: [ImageSchema], // ?? think about it
    },
    { timestamps: true },
  ],
});

Order.statics.fillables = [];
Order.statics.hidden = [];

export default Order.makeModel();
