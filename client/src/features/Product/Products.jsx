import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  products: getItem("products") || null,
  otherproducts: null,
  loading: false,
};
function setItem(key, value) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 60 * 60 * 1000, // Convert minutes to milliseconds
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Get an item from localStorage and check if it has expired
function getItem(key) {
  const item = JSON.parse(localStorage.getItem(key));
  if (!item) {
    return null; // Item doesn't exist
  }
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key); // Remove the item if it has expired
    return null;
  }
  return item.value;
}

const FetchProductDet = createAsyncThunk(
  "/FetchProduct/FetchProduct",
  async () => {
    try {
      let products = getItem("products");
      if (!products) {
        const result = await axios.get("http://localhost:3004/products");
        setItem("products", result.data);
        return result.data;
      }

      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    ProductDet: (state, action) => (state.products = action.payload),
  },
  extraReducers: {
    [FetchProductDet.pending]: (state) => {
      state.loading = true;
    },
    [FetchProductDet.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
    },
    [FetchProductDet.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { ProductDet } = productSlice.actions;
export { FetchProductDet };
export default productSlice.reducer;
