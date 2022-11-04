import { configureStore } from '@reduxjs/toolkit';
import Auth from "./AuthSlice"

export const store = configureStore({
  reducer: {
    Auth,
  },
})