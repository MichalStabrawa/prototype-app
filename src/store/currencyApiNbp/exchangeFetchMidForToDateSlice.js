import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  status: "initialized",
  error: null,
};

export const exchangeFetchMidForToDate = createAsyncThunk(
  "exchangeFetchToForDate",
  async ({ table, code, startDate, endDate }) => {
    try {
      const response = await fetch(
        `http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${startDate}/${endDate}/`
      );

      if (!response.ok) {
        throw new Error(
          `Somthing went wrong with fetch API: http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${startDate}/${endDate}/`
        );
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const exchangeFetchMidForToDateSlice = createSlice({
  name: "exchangeMidFetchStartEndDate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(exchangeFetchMidForToDate.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(exchangeFetchMidForToDate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(exchangeFetchMidForToDate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "rejected";
    });
  },
});

export const exchangeFetchMidForToDateActions =
  exchangeFetchMidForToDateSlice.actions;
export default exchangeFetchMidForToDateSlice.reducer;
