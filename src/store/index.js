import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import companySlice from "./companySlice";
import darkmodeSlice from "./darkmodeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companySlice,
    darkmodeSlice: darkmodeSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
