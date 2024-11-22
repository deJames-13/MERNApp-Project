import { apiSlice } from '@app/config';

const resource = 'reviews';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    getReview: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    deleteReview: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createReview: build.mutation({
      query: (review) => ({
        url: apiUrl,
        method: 'POST',
        body: review,
        headers,
      }),
    }),
    updateReview: build.mutation({
      query: ({ id, review }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: review,
        headers,
      }),
    }),
  }),
});

export { reviewApi };
