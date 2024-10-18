import { apiSlice } from '@app/config';

const resource = 'couriers';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const courierApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCouriers: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    getCourier: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    deleteCourier: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createCourier: build.mutation({
      query: (courier) => ({
        url: apiUrl,
        method: 'POST',
        body: courier,
        headers,
      }),
    }),
    updateCourier: build.mutation({
      query: ({ id, courier }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: courier,
        headers,
      }),
    }),
  }),
});

export { courierApi };
