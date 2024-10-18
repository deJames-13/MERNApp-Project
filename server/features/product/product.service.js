import { Service } from '#lib';
import ProductModel from './product.model.js';

class ProductService extends Service {
  model = ProductModel;
  fieldToSlugify = 'name';

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }
}

export default new ProductService();
