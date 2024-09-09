import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import watchlistReducer from "./watchlistSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    watchlist: watchlistReducer,
  },
});

export default store;
