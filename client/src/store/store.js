import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/LoginLogout/LoginLogout';
import adminSlice from '../features/LoginLogout/AdminLoginLogout';
import cartSlice from '../features/Cart/Cart';
import productSlice from '../features/Product/Products';
import tableSlice from '../features/Table/Table';
import orderSlice from '../features/Orders/CurrentOrder';
import appointmentSlice from '../features/YogaAppointment/Appointment';


export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        adminSlice: adminSlice,
        cartSlice: cartSlice,
        productSlice: productSlice,
        tableSlice: tableSlice,
        orderSlice: orderSlice,
        appointmentSlice: appointmentSlice
    },
    devTools: true
})
