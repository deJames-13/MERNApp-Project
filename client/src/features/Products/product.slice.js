import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queries: {
    q: '',
    page: 1,
    order: 'desc',
    sortBy: 'created_at',
    limit: 6,
  },
  filters: {
    price: [],
    categories: [],
    rating: null,
  },
  priceRanges: {
    // min: [0, 5000], // <=5000
    // mid: [5000, 10000], // 5000 - 10000
    // high: [10000, 20000], // 10000 - 20000
    // max: [20000, null], // >=20000

    // equivalent mongoose query using regex: gt|gte|lt|lte
    min: { gt: 0, lte: 5000 }, // <=5000
    mid: { gt: 5000, lte: 10000 }, // 5000 - 10000
    high: { gt: 10000, lte: 20000 }, // 10000 - 20000
    max: { gt: 20000 }, // >=20000
  },
  minRangeInput: '',
  maxRangeInput: '',
  categorySearch: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setQueries: (state, action) => {
      state.queries = { ...state.queries, ...action.payload };
    },
    setPriceFilter: (state, action) => {
      state.filters.price = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.categories = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.filters.rating = action.payload;
    },
    setMinRangeInput: (state, action) => {
      state.minRangeInput = action.payload;
    },
    setMaxRangeInput: (state, action) => {
      state.maxRangeInput = action.payload;
    },
    setCategorySearch: (state, action) => {
      state.categorySearch = action.payload;
    },
  },
});

export const {
  setQueries,
  setPriceFilter,
  setCategoryFilter,
  setRatingFilter,
  setMinRangeInput,
  setMaxRangeInput,
  setCategorySearch,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
export default productSlice.reducer;