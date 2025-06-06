// 제거 예정으로 네이밍 X
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import darkmodeSlice from "./darkmodeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    darkmodeSlice: darkmodeSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
