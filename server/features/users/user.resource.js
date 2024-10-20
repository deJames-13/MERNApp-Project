import { Resource } from '#lib';
export default class UserResource extends Resource {
  async transform(user) {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: this.formatDate(user.createdAt),
    };
  }
}
