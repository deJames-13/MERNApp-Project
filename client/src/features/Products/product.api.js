

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
      query: (qStr) => ({
        url: `${apiUrl}${qStr ? `?${qStr}` : ''}`,
        method: 'GET',
        headers,
      }),
    }),
    getFiltered: build.mutation({
      query: (query) => ({
        url: `${apiUrl}/filter`,
        method: 'POST',
        body: query,
        headers,
      }),
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
        formData:true       
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, product }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: product,
        formData:true           
      }),
    }),
    getBrands: build.query({
      query: () => ({
        url: '/brands',
        method: 'GET',
        headers,
      }),
    }),
    getSuppliers: build.query({
      query: () => ({
        url: '/suppliers',
        method: 'GET',
        headers,
      }),
    }),
  }),
});

export { productApi };

