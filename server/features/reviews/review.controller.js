import { Controller } from '#lib';
import ReviewResource from './review.resource.js';
import ReviewService from './review.service.js';
// import { reviewCreateRules, reviewUpdateRules } from './review.validation.js';

class ReviewController extends Controller {
  service = ReviewService;
  resource = ReviewResource;

  //   rules = {
  //   create: reviewCreateRules,
  //   update: reviewUpdateRules,
  // };

  getBySlug = async (req, res) => {
    const { slug } = req.params;
    const data = await this.service.getBySlug(slug);

    if (!data?._id) {
      return this.error({ res, message: 'Review not found!' });
    }

    const resource = this.resource?.make(data) || data;
    return this.success({ res, message: 'Review fetched successfully!', resource });
  };

  create = async (req, res) => {
    try {
      const { order, ratings, description, suggestion, isAnonymous, images } = req.body;

      const newReview = await this.service.create({
        order,
        ratings,
        description,
        suggestion,
        isAnonymous,
        images,
      });

      if (!newReview) {
        return this.error({ res, message: 'Unable to create review!' });
      }

      const resource = this.resource?.make(newReview) || newReview;
      return this.success({ res, message: 'Review created successfully!', resource });
    } catch (error) {
      return this.error({ res, message: error.message });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;

    try {
      const { ratings, description, suggestion, isAnonymous, images } = req.body;

      const updatedReview = await this.service.update(id, {
        ratings,
        description,
        suggestion,
        isAnonymous,
        images,
      });

      if (!updatedReview) {
        return this.error({ res, message: 'Review not found or unable to update!' });
      }

      const resource = this.resource?.make(updatedReview) || updatedReview;
      return this.success({ res, message: 'Review updated successfully!', resource });
    } catch (error) {
      return this.error({ res, message: error.message });
    }
  };

  /**
   * Delete a review by ID
   */
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedReview = await this.service.delete(id);

      if (!deletedReview) {
        return this.error({ res, message: 'Review not found or unable to delete!' });
      }

      return this.success({ res, message: 'Review deleted successfully!' });
    } catch (error) {
      return this.error({ res, message: error.message });
    }
  };

  getByOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
      const reviews = await this.service.find({ order: orderId });

      if (!reviews || reviews.length === 0) {
        return this.error({ res, message: 'No reviews found for this order!' });
      }

      const resources = reviews.map((review) => this.resource?.make(review) || review);
      return this.success({ res, message: 'Reviews fetched successfully!', resources });
    } catch (error) {
      return this.error({ res, message: error.message });
    }
  };
}

export default new ReviewController();
