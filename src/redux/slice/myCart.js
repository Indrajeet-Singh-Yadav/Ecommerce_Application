// In myCart.js
import { createSlice } from "@reduxjs/toolkit";

const cartItems = createSlice({
  name: 'cartItems',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const exists = state.cartItems.some(item => item.id === newItem.id);
      if (!exists) {
        state.cartItems.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity } = cartItems.actions;
export default cartItems.reducer;
