import { Service } from '#lib';
import { destroyToken, Errors, generateToken } from '#utils';
import UserModel from './user.model.js';

class UserService extends Service {
  model = UserModel;
  authToken = 'jwt';

  async getAuthenticatedUser(userId) {
    const token = generateToken(userId, this.authToken);
    const user = await this.model?.findById(token.id);
    if (!user) throw new Errors.Unauthorized('User not found!');
    return user;
  }

  async refreshToken(userId) {
    const token = generateToken(userId, this.authToken);
    return token;
  }

  async registerUser(body) {
    const userExists = await this.checkIfExists({ email: body.email });
    if (userExists) throw new Errors.BadRequest('User with that email already exists!');

    const user = await this.create(body);
    const token = generateToken(user._id, this.authToken);
    return { user, token };
  }

  async authenticate(email, password) {
    let user = await this.model?.findOne({ email });
    if (!user || !(user && (await user.matchPassword(password)))) user = null;
    const token = user && generateToken(user._id, this.authToken);

    return { user, token };
  }

  async logout() {
    return destroyToken(this.authToken);
  }

  async updateUser(id, body) {
    const userExists = await this.checkIfExists({
      email: body.email,
      _id: { $ne: id },
    });
    if (userExists) throw new Errors.BadRequest('User with that email already exists!');

    const data = this.model?.filterFillables(body);
    if (data.password) data.password = await this.model?.hashPassword(data.password);
    const user = await this.model?.findByIdAndUpdate(id, data, { new: true });
    return user;
  }

  async forgotPassword(email) {
    const user = await this.model?.findOne({ email: email });
    if (!user) throw new Errors.NotFound('User not found!');

    const resetToken = await this.model.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    return { user, resetToken };
  }

  async resetPassword(token, password) {
    const resetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await this.model.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!resetPasswordToken) throw new Errors.BadRequest('Invalid reset token!');

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    const generatedToken = generateToken(user._id, this.authToken);
    return { user, token: generatedToken };
  }
}

export default new UserService();
