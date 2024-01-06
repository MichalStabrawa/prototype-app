import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const goldFetchFromToDate = createAsyncThunk(
  "goldFetchFromDateToDate",
  async ({ fromDate, toDate }) => {
    try {
      const res = await fetch(
        `http://api.nbp.pl/api/cenyzlota/${fromDate}/${toDate}`
      );

      if (!res.ok) {
        throw new Error(
          `Somthing went wrong request with ${fromDate}/${toDate}`
        );
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const goldFetchFromToDateSlice = createSlice({
  name: "goldFetchFromToDate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(goldFetchFromToDate.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(goldFetchFromToDate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.action = action.payload;
      state.status = "success";
    });
    builder.addCase(goldFetchFromToDate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "rejected";
    });
  },
});

export const goldFetchFromToDateActions = goldFetchFromToDateSlice.actions;
export default goldFetchFromToDateSlice.reducer;
