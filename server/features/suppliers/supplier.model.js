import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Supplier = new Schema({
  name: 'Supplier',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Supplier name must be unique'],
        required: [true, 'Supplier name is required'],
      },
      slug: {
        type: String,
      },
      emailAddress: {
        type: String,
        required: [true, 'Please enter supplier email address'],
        maxLength: [20, 'Courier service area cannot exceed 20 characters'],
      },
      contactNumber: {
        type: String,
        required: [true, 'Please enter supplier contact number'],
        // maxLength: [11, 'Courier contact number cannot exceed 11 characters']
      },
      images: [ImageSchema],
    },
    { timestamps: true },
  ],
});

Supplier.statics.fillables = [];
Supplier.statics.hidden = [];

export default Supplier.makeModel();

