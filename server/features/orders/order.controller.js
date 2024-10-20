import { Controller } from '#lib';
import OrderResource from './order.resource.js';
import OrderService from './order.service.js';
import { orderCreateRules, orderUpdateRules } from './order.validation.js';

class OrderController extends Controller {
  service = OrderService;
  resource = OrderResource;
  rules = {
    create: orderCreateRules,
    update: orderUpdateRules,
  };
}
export default new OrderController();
