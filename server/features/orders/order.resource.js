import { Resource } from '#lib';
export default class OrderResource extends Resource {
  transform(order) {
    const { _id, ...rest } = order;
    return {
      id: _id,
      ...rest,
    };
  }
}
