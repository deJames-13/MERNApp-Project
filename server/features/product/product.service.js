import { BrandModel, CategoryModel, SupplierModel } from '#features';
import { Service } from '#lib';
import ProductModel from './product.model.js';

class ProductService extends Service {
  model = ProductModel;
  fieldToSlugify = 'name';


  async filterProducts(filter, meta) {
    this._checkModel();
    const { filters, ...rest } = filter;
    console.log('\n'.repeat(100))
    console.log('Filtering products: ', filter)

    const priceQuery = filters.price.map(p=>({price: rest.priceRanges[p]}));

    const query = {
      $or: [
        { ratings: { $gte: filters.rating } },
        ...priceQuery,
        { price: filter.range },
        { name: { $in: filters.categories } },
      ],
      name: { $regex: filter.categorySearch, $options: 'i' },
    };
    console.log('\n'.repeat(5))
    console.log('Constructed query: ', JSON.stringify(query, null, 2));


    this.query = this.model.find(query);;
    return this.paginate(meta).exec();
    
  }


  async getCategoryId(name) {
    const category = await CategoryModel.findOne({ name });
    if (!category) throw new Error('Category not found');
    return category._id;
  }

  async getBrandId(name) {
    const brand = await BrandModel.findOne({ name });
    if (!brand) throw new Error('Brand not found');
    return brand._id;
  }

  async getSupplierId(name) {
    const supplier = await SupplierModel.findOne({ name });
    if (!supplier) throw new Error('Supplier not found');
    return supplier._id;
  }

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }
}

export default new ProductService();
