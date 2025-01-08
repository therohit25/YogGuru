import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setUserRole: (state, { payload }) => {
      state.value = payload;
    },
    filterRole: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { login, logout } = roleSlice.actions;
export default roleSlice.reducer;
