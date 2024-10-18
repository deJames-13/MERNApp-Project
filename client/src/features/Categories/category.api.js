import { apiSlice } from '@app/config';

const resource = 'categories';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    getCategory: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createCategory: build.mutation({
      query: (category) => ({
        url: apiUrl,
        method: 'POST',
        body: category,
        headers,
      }),
    }),
    updateCategory: build.mutation({
      query: ({ id, category }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: category,
        headers,
      }),
    }),
  }),
});

export { categoryApi };
