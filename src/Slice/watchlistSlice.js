import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      return state.filter(
        (product) => product.product_id !== action.payload.product_id
      );
    },
    setWatchlist: (state, action) => {
      return action.payload;
    },
  },
});

export const { addProduct, removeProduct, setWatchlist } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
