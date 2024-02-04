import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "companySlice",
  initialState: { currentCompany: null },
  reducers: {
    setCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
    clearCompany: (state) => {
      state.currentCompany = null;
    },
  },
});

export const { setCompany, clearCompany } = companySlice.actions;
export default companySlice.reducer;
