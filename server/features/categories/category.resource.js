import { Resource } from '#lib';
export default class CategoryResource extends Resource {
  async transform(category) {
    const { _id, ...rest } = category;
    return {
      id: _id,
      ...rest,
    };
  }
}

