import { logout, setCredentials } from '@features';
import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Global loading slice
const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
    activeRequests: 0,
  },
  reducers: {
    startLoading: (state) => {
      state.activeRequests++;
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.activeRequests--;
      if (state.activeRequests === 0) {
        state.isLoading = false;
      }
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  api.dispatch(startLoading());
  // delay to show spinner
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    let result = await baseQuery(args, api, extraOptions);
    if (![401, 403].includes(result.error?.status)) {
      return result;
    }
    const refreshResult = await baseQuery('/users/refresh', api, extraOptions);
    if (refreshResult?.data?.token) {
      const userInfo = api.getState().auth.userInfo;
      const token = refreshResult.data.token;
      api.dispatch(setCredentials({ userInfo, token }));
      return await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  } finally {
    api.dispatch(stopLoading());
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});

export const loadingReducer = loadingSlice.reducer;
