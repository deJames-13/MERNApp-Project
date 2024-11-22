import { ActionButtons, Table } from '@common';
import { confirmDelete } from '@custom';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reviewApi } from '../review.api';
import ReviewWrapper from './ReviewWrapper';

const allowedColumns = () => [
  { key: 'name', label: 'Name' },
  { key: 'actions', label: '' },
  // More columns can be added here
];

const ReviewTable = () => {
  const navigate = useNavigate();
  const { useGetReviewsMutation, useDeleteReviewMutation } = reviewApi;
  const [reviews, setReviews] = useState([]);
  const [getReviews, { isLoading, isError }] = useGetReviewsMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const handleDelete = async (id) => {
    try {
      confirmDelete(async () => {
        await deleteReview(id).unwrap();
        setReviews(reviews.filter((review) => review.id !== id));
        toast.success('Review deleted successfully');
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await getReviews().unwrap();
      setReviews(res.resource || []);
    };

    return () => {
      try {
        fetchReviews();
      } catch (error) {
        toast.error(error.message);
      }
    };
  }, [getReviews]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading reviews</div>;
  if (!reviews.length)
    return (
      <div className="flex items-center justify-center space-x-2 font-bold text-center">
        <span>No data found! Create one. </span>
        <Button
          color="primary"
          className="my-4"
          onClick={() => navigate('/dashboard/reviews/create')}
        >
          <FaPlus />
        </Button>
      </div>
    );
  return (
    <>
      <ReviewWrapper title="Reviews Table">
        <Table
          data={reviews.map((review) => ({
            ...review,
            actions: (
              <ActionButtons
                key={'action_' + review.slug}
                className="flex justify-end"
                isLoading={isDeleting}
                onDelete={() => handleDelete(review.id)}
                onEdit={() => navigate(`/dashboard/reviews/${review.slug}/edit`)}
                onView={() => navigate(`/dashboard/reviews/${review.slug}/view`)}
              />
            ),
          }))}
          columns={allowedColumns()}
        />
      </ReviewWrapper>
    </>
  );
};

export default ReviewTable;
