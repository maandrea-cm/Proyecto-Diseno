import { configureStore } from '@reduxjs/toolkit'
import { datesSlice } from './dates/datesSlice'

export const store = configureStore({
    reducer: {
        dates: datesSlice.reducer,
    },
})