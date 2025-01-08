import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminlogin: (state, action) => {
      state.value = action.payload;
    },
    adminlogout: (state) => {
      state.value = null;
    },
  },
});

export const { adminlogin, adminlogout } = adminSlice.actions;
export default adminSlice.reducer;
