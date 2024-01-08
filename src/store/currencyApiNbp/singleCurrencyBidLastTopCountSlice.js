import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  status: "initialized",
  error: null,
};

export const singleCurrBidLastTopCountFetch = createAsyncThunk(
  "fetchSingleCurrBidLastNumbers",
  async ({ table, code, topCount }) => {
    try {
      const response = await fetch(
        `http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/last/${topCount}/`
      );

      if (!response.ok) {
        throw new Error(
          `Somthing went wrong with ${table} ${code} ${topCount}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const singleCurrBidLastTopCountSlice = createSlice({
  name: "singleCurrBidTopLastCount",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(singleCurrBidLastTopCountFetch.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(
      singleCurrBidLastTopCountFetch.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(
      singleCurrBidLastTopCountFetch.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.status = "recjected";
      }
    );
  },
});

export const singleCurrBidLastTopCountActions =
  singleCurrBidLastTopCountSlice.actions;
export default singleCurrBidLastTopCountSlice.reducer;
