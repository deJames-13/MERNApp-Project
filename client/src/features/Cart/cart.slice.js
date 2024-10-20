import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subTotal: 0,
};

const calculateSubTotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      state.subTotal = calculateSubTotal(state.items);
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.subTotal = calculateSubTotal(state.items);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.subTotal = calculateSubTotal(state.items);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.subTotal = calculateSubTotal(state.items);
    },
  },
});

export const { setItems, addItem, updateItem, removeItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
