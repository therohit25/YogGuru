import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
};

const FetchUsers = createAsyncThunk(
  "/RegisteredUsers/RegisteredUsers",
  async () => {
    try {
      const result = await axios.get("http://localhost:3004/admin/getAllusers");

      return result.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// const FetchOtherProducts = createAsyncThunk(
//   "/FetchOtherProducts/FetchOtherProducts",
//   async () => {
//     try {
//       const result = await axios.get("http://localhost:3004/products");
//       return result.data;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// );

const TableSlice = createSlice({
  name: "tables",
  initialState: initialState,
  reducers: {
    TableData: (state, action) => (state.products = action.payload),
  },
  extraReducers: {
    [FetchUsers.pending]: (state) => {
      state.loading = true;
    },
    [FetchUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },
    [FetchUsers.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { TableData } = TableSlice.actions;
export { FetchUsers };
export default TableSlice.reducer;
