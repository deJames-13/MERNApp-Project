import { createSlice } from '@reduxjs/toolkit';
const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
    activeRequests: 0,
    silentLoading: false,
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
    setSilentLoading: (state, action) => {
      state.silentLoading = action.payload;
    }
  },
});

export const { startLoading, stopLoading,setSilentLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;