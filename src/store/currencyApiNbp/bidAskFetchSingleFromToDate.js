import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const fetchBidAskSingleFromToDate = createAsyncThunk(
  "fetchBidAskSingleFromToDate",
  async ({ code, startDate, endDate }) => {
    try {
      const response = await fetch(
        `http://api.nbp.pl/api/exchangerates/rates/c/${code}/${startDate}/${endDate}`
      );

      if(!response.ok) {
        throw new Error('Somthing went wrong with fetch fetchBidAskSingleFromToDate');
      }

     const data = await response.json();
     return data

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const fetchBidAskSingleFromToDateSlice = createSlice({
    name: 'fetchBidAskSingleFromToDate',
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(fetchBidAskSingleFromToDate.pending, (state) => {
            state.isLoading = true;
            state.status = "pending";
          });
          builder.addCase(fetchBidAskSingleFromToDate.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.status = "success";
            state.error = null;
          });
          builder.addCase(fetchBidAskSingleFromToDate.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.status = "rejected";
          });
    }
})

export const fetchBidAskSingleFromToDateActions = fetchBidAskSingleFromToDateSlice.actions;
export default fetchBidAskSingleFromToDateSlice.reducer;
