import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    value: null
}


const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        Appointments: (state, { payload }) => {
            state.value = payload;
        },
        FilteredAppointments: (state, { payload }) => {
            const newFilteredAppointments = state.value?.map(appoint => {
                return appoint.Attendance = payload
            })
          
            state.value = newFilteredAppointments;
        }
    }
})

export const { Appointments, FilteredAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;



