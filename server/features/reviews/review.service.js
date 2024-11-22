// import { Service } from '#lib';
// import ReviewModel from './review.model.js';

// class ReviewService extends Service {
//   model = ReviewModel;
//   fieldToSlugify = 'name';

//   async getBySlug(slug) {
//     this._checkModel();
//     return this.model.findOne({ slug });
//   }
// }

// export default new ReviewService();


import { Service } from '#lib';
import ReviewModel from './review.model.js';

class ReviewService extends Service {
  model = ReviewModel;
  fieldToSlugify = 'name';

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }

  // async getById(id) {
  //   this._checkModel();
  //   return this.model.findById(id);
  // }

  // async create(data) {
  //   this._checkModel();
  //   const review = new this.model(data);
  //   return review.save();
  // }

  // async update(id, data) {
  //   this._checkModel();
  //   return this.model.findByIdAndUpdate(id, data, { new: true });
  // }

  // async delete(id) {
  //   this._checkModel();
  //   return this.model.findByIdAndDelete(id);
  // }
}

export default new ReviewService();
