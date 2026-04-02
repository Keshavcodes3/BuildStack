import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Features/Auth/Slices/auth.slice'
export const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

