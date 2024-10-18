import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Courier = new Schema({
  name: 'Courier',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Courier name must be unique'],
        // required: [true, 'Courier name is required'],
      },
      slug: {
        type: String,
      },
      contactNumber: {
        type: Number,
        // required: [true, 'Please enter courier contact number'],
        maxLength: [11, 'Courier contact number cannot exceed 11 characters'],
      },
      serviceArea: {
        type: String,
        // required: [true, 'Please enter courier service area'],
        maxLength: [20, 'Courier service area cannot exceed 20 characters'],
      },
      image: [{ ImageSchema }],
    },
    { timestamps: true },
  ],
});

Courier.statics.fillables = [];
Courier.statics.hidden = [];

export default Courier.makeModel();

