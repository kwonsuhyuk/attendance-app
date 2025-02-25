// 제거 예정으로 네이밍 X
import { createSlice } from "@reduxjs/toolkit";

const darkmodeSlice = createSlice({
  name: "darkmodeSlice",
  initialState: { darkMode: false },
  reducers: {
    toggleMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleMode } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;
