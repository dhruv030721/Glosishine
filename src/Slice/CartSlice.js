import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.product_id
      );
      if (existingItem) {
        existingItem.quantity = Math.min(
          10,
          existingItem.quantity + (action.payload.quantity || 1)
        );
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.product_id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity(state, action) {
      const { id, delta } = action.payload;
      const item = state.items.find((item) => item.product_id === id);
      if (item) {
        const newQuantity = Math.max(
          1,
          Math.min(10, (item.quantity || 1) + delta)
        );
        item.quantity = newQuantity;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
