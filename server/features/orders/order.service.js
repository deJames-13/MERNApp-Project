import { CartModel, ProductModel, UserModel } from '#features';

import { Service } from '#lib';
import OrderModel from './order.model.js';

class OrderService extends Service {
  model = OrderModel;
  setUserId(userId) {
    this.forceFilter = { user: userId };
  }

  validate(data) {}
  checkout() {}
  update() {}
}

export default new OrderService();
