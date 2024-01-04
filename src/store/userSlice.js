import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { currentUser: null, isLoading: true },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
