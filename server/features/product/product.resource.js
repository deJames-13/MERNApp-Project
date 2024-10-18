import { Resource } from '#lib';
export default class ProductResource extends Resource {
  transform(product) {
    const { _id, ...rest } = product;
    return {
      id: _id,
      ...rest,
    };
  }
}
