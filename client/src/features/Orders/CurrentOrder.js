import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setCurrOrder: (state, action) => {
            state.value = action.payload;
        },
        discardCurrOrder: (state) => {
            state.value = null;
        },
    },
});

export const { setCurrOrder, discardCurrOrder } = orderSlice.actions;
export default orderSlice.reducer;
