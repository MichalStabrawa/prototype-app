import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const singleCurrencyLastFewTimes = createAsyncThunk(
  "FetchSingleCurrencyLastFewTimes",
  async ({ code, number }) => {
    try {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/c/${code}/last/${number}`
      );
      if (!response.ok) {
        throw new Error(
          `Somthing went wrong with https://api.nbp.pl/api/exchangerates/rates/c/${code}/last/${number}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      initialState.status = "error";
      console.log(error);
    }
  }
);

const singleCurrencyLastFewTimesSlice= createSlice({
    name:'singleCurrencyLastFewTimes',
    initialState,
    reducers:[],
    extraReducers:(builder)=> {
        builder.addCase(singleCurrencyLastFewTimes.pending,(state)=> {
            state.isLoading = true;
            state.status="pending"
        });
        builder.addCase(singleCurrencyLastFewTimes.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.data = action.payload;
            state.status = "success";
            state.error= null
        });
        builder.addCase(singleCurrencyLastFewTimes.rejected,(state,action)=> {
            state.isLoading = false;
            state.error = action.error.message;
            state.error = 'error'

        })
    }
})

export const singleCurrencyFetchDateFromDateToActions = singleCurrencyLastFewTimesSlice.actions;

export default singleCurrencyLastFewTimesSlice.reducer;
