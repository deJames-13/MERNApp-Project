import { Controller } from '#lib';
import ProductResource from './product.resource.js';
import ProductService from './product.service.js';
import { productCreateRules, productUpdateRules } from './product.validation.js';

class ProductController extends Controller {
  service = ProductService;
  resource = ProductResource;
  rules = {
    create: productCreateRules,
    update: productUpdateRules,
  };

  getBySlug = async (req, res) => {
    const { slug } = req.params;
    const data = await this.service.getBySlug(slug);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    const resource = (await this.resource?.make(data)) || data;
    this.success({ res, message: 'Data fetched!', resource });
  };
}
export default new ProductController();
