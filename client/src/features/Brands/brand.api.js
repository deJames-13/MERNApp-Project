import { apiSlice } from '@app/config';

const resource = 'brands';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const brandApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    getBrand: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    deleteBrand: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createBrand: build.mutation({
      query: (brand) => ({
        url: apiUrl,
        method: 'POST',
        body: brand,
        headers,
      }),
    }),
    updateBrand: build.mutation({
      query: ({ id, brand }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: brand,
        headers,
      }),
    }),
  }),
});

export { brandApi };
