import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const fetchBidAskSingleDate = createAsyncThunk(
  "fetchBidAskSingleDate",
  async ({code,date}) => {
    try {
      const response = await fetch(
        `http://api.nbp.pl/api/exchangerates/rates/c/${code}/${date}/`
      );

      if (!response.ok) {
        throw new Error("Somthing went wrong with fetch fetchBidAskSingleDate");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const fetchBidAskSingleDateSlice = createSlice({
  name: "bidAskSingleDate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBidAskSingleDate.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(fetchBidAskSingleDate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
      state.error = null;
    });
    builder.addCase(fetchBidAskSingleDate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "rejected";
    });
  },
});

export const fetchBidAskSingleDateActions= fetchBidAskSingleDateSlice.actions;
export default fetchBidAskSingleDateSlice.reducer;
