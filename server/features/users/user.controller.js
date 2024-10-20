import { Controller } from '#lib';
import { Errors, getBearerToken, sendEmail, tokenExists } from '#utils';
import UserResource from './user.resource.js';
import UserService from './user.service.js';
import { userCreateRules, userUpdateRules } from './user.validation.js';

class UserController extends Controller {
  service = UserService;
  resource = UserResource;
  rules = {
    create: userCreateRules,
    update: userUpdateRules,
  };

  refresh = async (req, res) => {
    if (!req.user?._id) throw new Errors.Unauthorized('Invalid credentials!');
    const token = await this.service.refreshToken(req.user._id);
    res.cookie(...token);
    this.success({
      res,
      message: 'Token refreshed!',
      user: await this.resource.make(req.user),
      token: token[1],
    });
  };

  register = async (req, res) => {
    if (tokenExists(req, this.service.authToken)) return this.error({ res, message: 'Already authenticated!' });

    const validData = await this.validator(req, res, this.rules.create);
    const { user, token } = await this.service.registerUser(validData);
    if (!user._id) throw new Errors.BadRequest('Invalid user data!');

    res.cookie(...token);
    this.success({
      res,
      message: 'Registered!',
      user: await this.resource.make(user),
      token: token[1],
    });
  };

  authenticate = async (req, res) => {
    if (tokenExists(req, this.service.authToken)) throw new Errors.BadRequest('Already authenticated!');

    const { email, password } = req.body;
    const { user, token } = await this.service.authenticate(email, password);
    if (!user?._id) throw new Errors.BadRequest('Invalid credentials!');

    res.cookie(...token);
    this.success({
      res,
      message: 'Authenticated!',
      user: await this.resource.make(user),
      token: token[1],
    });
  };

  logout = async (req, res) => {
    const token = await this.service.logout();
    res.cookie(...token);
    this.success({ res, message: 'Logged out!' });
  };

  getProfile = async (req, res) => {
    const user = req.user;

    if (!user?._id) throw new Errors.BadRequest('Invalid user data!');

    this.success({
      res,
      message: 'Profile fetch successfully!',
      user: await this.resource.make(user),
      token: getBearerToken(req),
    });
  };

  updateProfile = async (req, res) => {
    const validData = await this.validator(req, res, this.rules.update);
    const user = await this.service.updateUser(req.user._id, validData);
    if (!user) throw new Errors.BadRequest('Invalid user data!');
    this.success({
      res,
      message: 'Profile updated!',
      user: await this.resource.make(user),
      token: getBearerToken(req),
    });
  };

  forgotPassword = async (req, res) => {
    const { email } = req.body;
    const { user, token } = await this.service.forgotPassword(email);
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${token}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Recovery',
        message,
      });
      this.success({ res, message: `Email sent to: ${user.email}` });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Errors.InternalServerError(error.message);
    }
  };

  resetPassword = async (req, res) => {
    const validData = await this.validator(req, res, this.rules.update);
    const { password } = req.body;
    const token = req.params.token;
    const { user, token: newToken } = await this.service.resetPassword(token, password);
    res.cookie(...newToken);
    this.success({
      res,
      message: 'Password reset!',
      user: await this.resource.make(user),
      token: newToken[1],
    });
  };
}
export default new UserController();
