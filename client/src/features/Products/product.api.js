import { apiSlice } from '@app/config';

const resource = 'products';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.mutation({
      query: (qStr) => {
        return {
          url: `${apiUrl}${qStr ? `?${qStr}` : ''}`,
          method: 'GET',
          headers,
        };
      },
    }),
    getProduct: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createProduct: build.mutation({
      query: (product) => ({
        url: apiUrl,
        method: 'POST',
        body: product,
        headers,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, product }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: product,
        headers,
      }),
    }),
  }),
});

export { productApi };
