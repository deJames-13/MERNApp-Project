import { Resource } from '#lib';
export default class SupplierResource extends Resource {
  transform(supplier) {
    const { _id, ...rest } = supplier;
    return {
      id: _id,
      ...rest,
    };
  }
}
