// 제거 예정으로 네이밍 X
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { currentUser: null, isLoading: true, userType: null },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    clearUser: state => {
      state.currentUser = null;
      state.userType = null;
      state.isLoading = false;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserType } = userSlice.actions;
export default userSlice.reducer;
