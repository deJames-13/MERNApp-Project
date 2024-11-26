import { BrandModel, CategoryModel, ReviewModel, SupplierModel } from '#features';
import { Service } from '#lib';
import OrderModel from '../orders/order.model.js';
import ProductModel from './product.model.js';

class ProductService extends Service {
  model = ProductModel;
  fieldToSlugify = 'name';

  async getProductStocks() {
    const data = await this.model.find({}).select('name stock'); 
    if (!data || !data.length) {
       throw new Error('No data found');
    }

    const totalStocks = data.reduce((acc, item) => acc + item.stock, 0);

    const totalPercentage = data.map((item) => ({
      name: item.name,
      stock: item.stock, 
      percent: totalStocks
        ? ((item.stock / totalStocks) * 100).toFixed(2)
        : 0,
    }));
    return { totalPercentage, stocks: data, totalStocks };

  }

  async getReviewDetails(productId) {
    const product = await this.model.findById(productId).select('reviews');
    const reviews = await ReviewModel.find({ _id: { $in: product.reviews } });
    return reviews;
  }

  // async filterProducts(filter, meta) {
  //   this._checkModel();
  //   const { filters, ...rest } = filter;

  //   const categoryIds = filters.categories?.length
  //     ? await CategoryModel.find({ name: { $in: filters.categories } }).select('_id')
  //     : [];
  //   const categoryIdList = categoryIds.map((cat) => cat._id);

  //   const priceQuery = filters.price.map((p) => ({ price: rest.priceRanges[p] }));
  //   const query = {
  //     ...(filters.price ? { $or: priceQuery } : {}),
  //     ...(filters.categories ? { category: { $in: categoryIdList } } : {}),
  //     ...(filters.rating ? { averageRating: { $gte: filters.rating } } : {}),
  //     ...(filter.categorySearch ? { name: { $regex: filter.categorySearch, $options: 'i' } } : {}),
  //   };
  
  //   console.log('Final Query:', query);
  
  //   this.query = this.model.find(query);
  //   return this.paginate(meta).exec();
  // }
  

  async filterProducts(filter, meta) {
    this._checkModel();
    const { filters, ...rest } = filter;

    const priceQuery = filters.price.map(p=>({price: rest.priceRanges[p]}));

    const query = {
      $or: [
        ...priceQuery,
        { price: filter.range },
        { name: { $in: filters.categories } },
        { averageRating: { $gte: filters.rating } },
      ],
      name: { $regex: filter.categorySearch, $options: 'i' },
    };


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
