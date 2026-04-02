import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Features/Auth/Slices/auth.slice'
import postSlice from '../Features/Home/Slices/home.slice'
export const store = configureStore({
    reducer: {
        auth: authSlice,
        post:postSlice
    }
})

