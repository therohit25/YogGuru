import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  value: 0,
  cart: [],
  TotalPrice: 0,
  loading: false,
};

export const getCart = createAsyncThunk("/Cart/getCart", async () => {
  try {
    const result = await axios.get("http://localhost:3004/user/carts/");

    return result.data.Productdata[0].Products;
  } catch (err) {
    throw new Error("Error in Fetching Cart");
  }
});
export const emptyCart = createAsyncThunk("/Cart/emptyCart", async () => {
  try {
    await axios.delete("http://localhost:3004/user/emptycart");
    return [];
  } catch (err) {
    throw new Error("Error in EmptyingCart");
  }
});

export const addToCart = createAsyncThunk(
  "/Cart/addToCart",
  async (product) => {
    try {
      const result = await axios.post(
        `http://localhost:3004/user/insertcart/`,
        product
      );
      if (result.status === 200) {
        return { ProductDet: product };
      }
    } catch (err) {
      throw new Error("Error while Adding to Cart", err.message);
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "/Cart/removeFromCart",
  async (ProductId) => {
    try {
      const result = await axios.delete(
        "http://localhost:3004/user/removeproduct",
        {
          data: { ProductId: ProductId },
        }
      );
      if (result.status === 200) {
        return ProductId;
      }
    } catch (err) {
      throw new Error("Error while Removing from Cart", err.message);
    }
  }
);
export const updateFromCart = createAsyncThunk(
  "/Cart/updateFromCart",
  async ({ ProductId, Quantity }) => {
    try {
      await axios.put("http://localhost:3004/user/updatecart", {
        ProductId: ProductId,
        Quantity: Quantity,
      });

      return { ProductId, Quantity };
    } catch (err) {
      throw new Error("Error while Updating from Cart", err.message);
    }
  }
);

const getFinalPrice = (cart) => {
  let result = 0;
  if (cart?.length > 0) {
    result = cart?.reduce((total, item) => {
      const productPrice = item?.ProductDet?.ProductPrice;
      const quantity = item?.Quantity;
      return total + productPrice * quantity;
    }, 0);
  }
  return result;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CartCount: (state, action) => void (state.value = action.payload),
    Increment: (state) => void (state.value += 1),
    FinalPrice: (state) => void (state.TotalPrice = getFinalPrice(state.cart)),
  },
  extraReducers: {
    [getCart.pending]: (state) => {
      state.loading = true;
    },
    [getCart.fulfilled]: (state, { payload }) => {
      state.cart = payload;
      state.loading = false;
    },
    [getCart.rejected]: (state) => {
      state.loading = false;
    },
    [addToCart.pending]: (state) => {
      state.loading = true;
    },
    [addToCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      let count = 0;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].ProductDet._id === payload.ProductDet._id) {
          count = 1;
        }
      }
      if (count === 0) {
        state.cart.push(payload);
      }
    },
    [addToCart.rejected]: (state) => {
      state.loading = false;
    },
    [removeFromCart.pending]: (state) => {
      state.loading = true;
    },
    [removeFromCart.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.cart = state.cart?.filter(
        (product) => product.ProductDet._id !== payload
      );
    },
    [removeFromCart.rejected]: (state) => {
      state.loading = false;
    },
    [updateFromCart.pending]: (state) => {
      state.loading = false;
    },
    [updateFromCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const productToUpdate = state.cart.find(
        (product) => product.ProductDet._id === payload.ProductId._id
      );
      if (productToUpdate) {
        productToUpdate.Quantity = payload.Quantity;
      }
    },
    [updateFromCart.rejected]: (state) => {
      state.loading = false;
    },
    [emptyCart.pending]: (state) => {
      state.loading = true;
    },
    [emptyCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cart = payload;
    },
    [emptyCart.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { Increment, CartCount, FinalPrice } = cartSlice.actions;
export default cartSlice.reducer;
