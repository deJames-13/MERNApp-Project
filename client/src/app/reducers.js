import { apiSlice } from '@app/config';
import { authReducer, cartReducer, orderReducer, productReducer } from '@features';
import { combineReducers } from '@reduxjs/toolkit';
import { loadingReducer, notifReducer, themeReducer } from './slices';

const rootReducer = combineReducers({
  notifications: notifReducer,
  loading: loadingReducer,
  theme: themeReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  product: productReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
