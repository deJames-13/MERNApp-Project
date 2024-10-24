import { Controller } from '#lib';
import { Errors, getBearerToken, tokenExists } from '#utils';
import UserResource from './user.resource.js';
import UserService from './user.service.js';
import * as rules from './user.validation.js';

class UserController extends Controller {
  service = UserService;
  resource = UserResource;
  rules = {
    create: rules.userCreateRules,
    update: rules.userUpdateRules,
    createInfo: rules.userInfoCreateRules,
    updateInfo: rules.userInfoUpdateRules,
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

  update = async (req, res) => {
    let id = req.params.id || req.params.id || req.user._id;
    let validData = await this.validator(req, res, this.rules.update);
    const user = await this.service.updateUser(id, validData);
    if (!user) throw new Errors.BadRequest('Invalid user data!');

    let userInfo;
    if (req.body?.info && !user?.info?._id) {
      validData = await this.validator(req, res, this.rules.createInfo);
      userInfo = await this.service.createUserInfo(user, validData.info);
    } else if (req.body?.info && user?.info?._id) {
      validData = await this.validator(req, res, this.rules.updateInfo);
      userInfo = await this.service.updateUserInfo(user, validData.info);
    }

    let resource = await this.resource.make(user);
    this.success({
      res,
      message: 'User profile updated!',
      user: resource,
      token: getBearerToken(req),
    });
  };

  forgotPassword = async (req, res) => {
    await this.service.forgotPassword(req.body);

    this.success({
      res,
      message: 'Password reset sent!',
    });
  };

  resetPassword = async (req, res) => {
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

  sendVerifyEmail = async (req, res) => {
    const { redirectUrl } = req.params;
    const { email } = req.user;
    await this.service.sendVerifyEmail(email, redirectUrl);
    this.success({ res, message: 'Verification email sent!' });
  };

  verifyEmail = async (req, res) => {
    const { verifyToken } = req.params;
    const { OTP } = req.body;
    const { email } = req.user;
    let result;
    if (verifyToken) result = await this.service.verifyToken(verifyToken);
    else if (email && OTP) result = await this.service.verifyOTP(email, OTP);
    else throw new Errors.BadRequest('Invalid data!');
    if (!result) throw new Errors.BadRequest('Invalid token!');
    const { user, token } = result;
    this.success({
      res,
      message: 'Verified!',
      user: await this.resource.make(user),
      token: token,
    });
  };

  testEmail = async (req, res) => {
    await this.service.testEmail(req.body);
    this.success({ res, message: 'Email sent!' });
  };
}
export default new UserController();
