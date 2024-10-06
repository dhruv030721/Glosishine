import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: [],
  reducers: {
    setWatchlist: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      return state.filter((product) => product.product_id !== action.payload);
    },
  },
});

export const { setWatchlist, addProduct, removeFromWatchlist } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
