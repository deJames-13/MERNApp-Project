import { ROLES } from '#constants';
import { Schema } from '#lib';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const User = new Schema({
  name: 'User',
  schema: [
    {
      username: {
        type: String,
        required: [true, 'Username is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
      },
      role: {
        type: String,
        enum: ROLES,
        default: ROLES.CUSTOMER,
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
    },
    { timestamps: true },
  ],
});

User.statics.fillables = ['username', 'email', 'password'];
User.statics.hidden = ['password'];

User.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

User.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

User.pre('save', async function (next) {
  if (this.isModified('password')) this.password = await this.hashPassword(this.password);
  next();
});
export default User.makeModel();
