// // import { Controller } from '#lib';
// // import ProductResource from './product.resource.js';
// // import ProductService from './product.service.js';
// // import { productCreateRules, productUpdateRules } from './product.validation.js';

// // class ProductController extends Controller {
// //   service = ProductService;
// //   resource = ProductResource;
// //   rules = {
// //     create: productCreateRules,
// //     update: productUpdateRules,
// //   };

// //   getBySlug = async (req, res) => {
// //     const { slug } = req.params;
// //     const data = await this.service.getBySlug(slug);
// //     if (!data?._id) return this.error({ res, message: 'Data not found!' });

// //     const resource = (await this.resource?.make(data)) || data;
// //     this.success({ res, message: 'Data fetched!', resource });
// //   };
// // }
// // export default new ProductController();


// import { Controller } from '#lib';
// import ProductResource from './product.resource.js';
// import ProductService from './product.service.js';
// import { productCreateRules, productUpdateRules } from './product.validation.js';

// class ProductController extends Controller {
//   service = ProductService;
//   resource = ProductResource;
//   rules = {
//     create: productCreateRules,
//     update: productUpdateRules,
//   };

//   getBySlug = async (req, res) => {
//     const { slug } = req.params;
//     const data = await this.service.getBySlug(slug);
//     if (!data?._id) return this.error({ res, message: 'Data not found!' });

//     const resource = (await this.resource?.make(data)) || data;
//     this.success({ res, message: 'Data fetched!', resource });
//   };
  
//   store = async (req, res) => {
//     let validData = req.body;
//     if (!this.rules.create.length) validData = await this.validator(req, res, this.rules.create);

//     if (!validData.brand || !validData.supplier) {
//       return this.error({ res, message: 'Brand and Supplier are required!' });
//     }

//     let data = await this.service?.create(validData);
//     if (!data._id) return this.error({ res, message: 'Invalid data!' });

//     if (req.file || req.files || this.service.hasField('images')) {
//       const images = this.addImage(req);
//       data.images = [...(data.images || []), ...images];
//       await data.save();
//     }

//     const resource = (await this.resource?.make(data)) || data;
//     this.success({ res, message: 'Data created!', resource });
//   };

//   update = async (req, res) => {
//     let validData = req.body;
//     if (!this.rules.create.length) validData = await this.validator(req, res, this.rules.update);

//     if (!validData.brand || !validData.supplier) {
//       return this.error({ res, message: 'Brand and Supplier are required!' });
//     }

//     const data = await this.service?.update(req.params.id, validData);
//     if (!data._id) return this.error({ res, message: 'Invalid data!' });

//     if (req.file || req.files || this.service.hasField('images')) {
//       const images = this.addImage(req);
//       const oldImages = new Set((data.images || []).map((image) => image.public_id));
//       const newImages = images.filter((image) => !oldImages.has(image.public_id));
//       data.images = [...(data.images || []), ...newImages];
//       await data.save();
//     }

//     const resource = (await this.resource?.make(data)) || data;
//     this.success({ res, message: 'Data updated!', resource });
//   };
// }

// export default new ProductController();


// import { Controller } from '#lib';
// import ProductResource from './product.resource.js';
// import ProductService from './product.service.js';
// import { productCreateRules, productUpdateRules } from './product.validation.js';

// class ProductController extends Controller {
//   service = ProductService;
//   resource = ProductResource;
//   rules = {
//     create: productCreateRules,
//     update: productUpdateRules,
//   };

//   getBySlug = async (req, res) => {
//     const { slug } = req.params;
//     const data = await this.service.getBySlug(slug);
//     if (!data?._id) return this.error({ res, message: 'Data not found!' });

//     const resource = (await this.resource?.make(data)) || data;
//     this.success({ res, message: 'Data fetched!', resource });
//   };
// }
// export default new ProductController();

import { Controller } from '#lib';
import ProductResource from './product.resource.js';
import ProductService from './product.service.js';
import { productCreateRules, productUpdateRules } from './product.validation.js';
import ProductModel from './product.model.js';  // Ensure you import ProductModel here

class ProductController extends Controller {
  service = ProductService;
  resource = ProductResource;
  rules = {
    create: productCreateRules,
    update: productUpdateRules,
  };

  // Method to get product by slug
  getBySlug = async (req, res) => {
    const { slug } = req.params;
    const data = await this.service.getBySlug(slug);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    const resource = (await this.resource?.make(data)) || data;
    this.success({ res, message: 'Data fetched!', resource });
  };
  
  // Method to store a new product
  store = async (req, res) => {
    let validData = req.body;
    if (!this.rules.create.length) validData = await this.validator(req, res, this.rules.create);

    if (!validData.brand || !validData.supplier) {
      return this.error({ res, message: 'Brand and Supplier are required!' });
    }

    let data = await this.service?.create(validData);
    if (!data._id) return this.error({ res, message: 'Invalid data!' });

    if (req.file || req.files || this.service.hasField('images')) {
      const images = this.addImage(req);
      data.images = [...(data.images || []), ...images];
      await data.save();
    }

    const resource = (await this.resource?.make(data)) || data;
    this.success({ res, message: 'Data created!', resource });
  };

  // Method to update an existing product
  update = async (req, res) => {
    let validData = req.body;
    if (!this.rules.update.length) validData = await this.validator(req, res, this.rules.update);

    if (!validData.brand || !validData.supplier) {
      return this.error({ res, message: 'Brand and Supplier are required!' });
    }

    const data = await this.service?.update(req.params.id, validData);
    if (!data._id) return this.error({ res, message: 'Invalid data!' });

    if (req.file || req.files || this.service.hasField('images')) {
      const images = this.addImage(req);
      const oldImages = new Set((data.images || []).map((image) => image.public_id));
      const newImages = images.filter((image) => !oldImages.has(image.public_id));
      data.images = [...(data.images || []), ...newImages];
      await data.save();
    }

    const resource = (await this.resource?.make(data)) || data;
    this.success({ res, message: 'Data updated!', resource });
  };
}

export default new ProductController();
