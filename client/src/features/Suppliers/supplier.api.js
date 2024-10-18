import { apiSlice } from '@app/config';

const resource = 'suppliers';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const supplierApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSuppliers: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    getSupplier: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    deleteSupplier: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createSupplier: build.mutation({
      query: (supplier) => ({
        url: apiUrl,
        method: 'POST',
        body: supplier,
        headers,
      }),
    }),
    updateSupplier: build.mutation({
      query: ({ id, supplier }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: supplier,
        headers,
      }),
    }),
  }),
});

export { supplierApi };
