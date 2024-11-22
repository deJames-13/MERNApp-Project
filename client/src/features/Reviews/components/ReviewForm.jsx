import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import { useSlug } from '@common';
import { FormikForm } from '@common/components';
import { confirmSave, requestError, toFormData } from '@custom';
import { CarouselComponent } from '@custom/components'; // CAROUSEL
import { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reviewApi } from '../review.api';
import { getAltFields, getFields } from '../review.fields';
import { reviewValidation } from '../review.validation';
import ReviewWrapper from './ReviewWrapper';

const ReviewForm = ({ title = 'Review Form', action = 'create' }) => {

  /* DECLARATIONS #################################################### */
  const fields = typeof getFields === 'function' ? getFields() : getFields || [];
  const altFields = typeof getAltFields === 'function' ? getAltFields() : getAltFields || [];
  const images = [
    {
      src: "https://placehold.co/600",
      alt: "n/a",
    },
  ]

  /* DECLARATIONS #################################################### */
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [reviewSchema, setReviewSchema] = useState(fields);
  const [createReview, { isLoading: isCreating }] = reviewApi.useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = reviewApi.useUpdateReviewMutation();
  const [getReview, { isLoading: isFetching }] = reviewApi.useGetReviewMutation();
  const { slug, setSlug } = useSlug();
  /* END DECLARATIONS ################################################ */

  const initialValues = useMemo(
    () =>
      reviewSchema.reduce((acc, field) => {
        acc[field.name] = action === 'create' ? '' : review?.[field.name] ?? '';
        return acc;
      }, {}),
    [review, reviewSchema, action]
  );

  const handleCreate = async (values) => {
    await createReview(values).unwrap();
    navigate('/dashboard/reviews/table');
    toast.success('Create successful!');
  };

  const handleUpdate = async (values) => {
    const res = await updateReview({ id: review.id, review: values }).unwrap();
    const updatedReview = res?.resource || { ...review, ...values };
    setSlug(updatedReview.slug);
    toast.success('Update successful!');
  };

  const onSubmit = async (values) => {
    confirmSave(async () => handleSubmit(values));
  };

  const handleSubmit = async (values) => {
    try {
      values = toFormData(values);
      if (action === 'create') await handleCreate(values);
      else await handleUpdate(values);
    } catch (error) {
      requestError(error);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      getReview(slug).then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
          navigate('/dashboard/reviews/table');
        } else if (res.data) setReview(res.data.resource);
      });
    };

    if (slug) fetchReview();
    else setReviewSchema(action === 'create' ? fields : altFields);
  }, [action, slug, getReview, navigate]);

  return (
    <ReviewWrapper
      title={title}
      prevUrl="/dashboard/reviews/table"
    >

      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">

        {/* CAROUSEL */}
        <div className="container lg:w-1/3 w-96">
          <CarouselComponent images={
            review?.images?.length ?
              review?.images.map((image) => ({ src: image.url, alt: image.alt }))
              : images} />
        </div>

        <div className="container w-2/3">
          <FormikForm
            formSchema={reviewSchema}
            formikProps={{
              initialValues,
              validationSchema: reviewValidation,
              onSubmit: onSubmit,
              enableReinitialize: true,
            }}
            className="flex flex-wrap gap-8"
            element={({ isSubmitting, values }) => {
              const isFormChanged = !isEqual(initialValues, values);
              const isProcessing = isSubmitting || isCreating || isUpdating;
              const isButtonDisabled = isProcessing || isFetching || !isFormChanged;

              return (
                <div className="flex w-full">
                  <Button
                    variant="outline"
                    type="submit"
                    color="primary"
                    className="max-w-md"
                    disabled={isButtonDisabled}
                  >
                    {isProcessing && <span className="loading loading-spinner"></span>}
                    {action === 'create' ? 'Create Review' : 'Update Review'}
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </div>
    </ReviewWrapper>
  );
};

ReviewForm.propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'view']),
  title: PropTypes.string,
};

export default ReviewForm;
