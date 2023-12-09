import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  table: "A",
};

const kindOfTableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    changeToTableA(state) {
      state.table = "A";
    },
    changeToTableB(state) {
      state.table = "B";
    },
  },
});

export const kindOfTableActions = kindOfTableSlice.actions;

export default kindOfTableSlice.reducer;
