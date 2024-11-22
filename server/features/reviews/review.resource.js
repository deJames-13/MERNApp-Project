import { Resource } from '#lib';
export default class ReviewResource extends Resource {
  transform(review) {
    const { _id, ...rest } = review;
    return {
      id: _id,
      ...rest,
    };
  }
}
