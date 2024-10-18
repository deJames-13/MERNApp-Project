import { Resource } from '#lib';
export default class CourierResource extends Resource {
  transform(courier) {
    const { _id, ...rest } = courier;
    return {
      id: _id,
      ...rest,
    };
  }
}
