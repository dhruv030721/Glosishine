/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getCartProduct,
} from "../Services/Operations/ProductServices";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// Load cart items from local storage
const loadCartItems = () => {
  try {
    const serializedCart = localStorage.getItem("cartItems");
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Error loading cart items from localStorage:", err);
    return [];
  }
};

export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchItems",
  async (email, { rejectWithValue }) => {
    try {
      const response = await getCartProduct(email);
      return response.data || [];
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Treat 404 as empty cart
        return [];
      }
      return rejectWithValue(error.message);
    }
  }
);

export const addItemAsync = createAsyncThunk(
  "cart/addItem",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await addToCart(productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add item to cart"
      );
    }
  }
);

export const removeItemAsync = createAsyncThunk(
  "cart/removeItem",
  async ({ email, product_id }, thunkAPI) => {
    try {
      const response = await removeFromCart(email, product_id);
      return { product_id }; // Return the product_id for the reducer to use
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ email, id, delta }, { getState }) => {
    if (delta > 0) {
      await increaseQuantity(email, id);
    } else {
      await decreaseQuantity(email, id);
    }
    return { id, delta };
  }
);

const MAX_QUANTITY = 10; // Make sure this matches the value in CartPage.jsx

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.product_id !== action.payload
        );
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const { id, delta } = action.payload;
        const item = state.items.find((item) => item.product_id === id);
        if (item) {
          item.quantity += delta;
          // Normalize the quantity if it's within range
          if (item.quantity >= 1 && item.quantity <= MAX_QUANTITY) {
            item.quantity = Math.max(1, Math.min(MAX_QUANTITY, item.quantity));
          }
        }
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
