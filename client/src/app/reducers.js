import { apiSlice } from '@app/config';
import { authReducer, cartReducer } from '@features';
import { combineReducers } from '@reduxjs/toolkit';
import { loadingReducer } from './config/api';

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  cart: cartReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
