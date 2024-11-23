import { OrderModel, ProductModel } from '#features';
import { Service } from '#lib';
import ReviewModel from './review.model.js';

class ReviewService extends Service {
  model = ReviewModel;
  setUserId(userId) {
    this.forceFilter = { user: userId };
  }

  async addReviewToProducts(orderId, reviewId) {
    const order = await OrderModel.findById(orderId);
    if (!order) return;
    const products = await ProductModel.find({ _id: { $in: order.products.map(p=>p.product) } });
    products.forEach((product) => {
      if (!product.reviews.includes(reviewId)) {
        product.reviews.push(reviewId);
        product.save();
      }
    });
  }


  async reviewExistInOrder(orderId, userId) {
    this._checkModel();
    const review = await this.model.findOne({ order: orderId, user: userId });
    return review;
  }

  async update(id, body) {
    this._checkModel();
    const data = Array.isArray(body)
      ? body.map((item) => this.model.filterFillables(item))
      : this.model.filterFillables(body);

    const exists = await this.reviewExistInOrder(data.order, data.user);
    if (exists) {
      id = exists._id;27017
    }
    let review;
    if (id) {
      review = await this.model.findByIdAndUpdate(id, data, { new: true });
    } else{
      review = await this.model.create(data);
    }
    if (data.order) {
      this.addReviewToProducts(data.order, review._id);
    }
    return review;
    

  }


}

export default new ReviewService();
