import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const singleFetchDataFromDateTo = createAsyncThunk(
  "FetchSingleCurrencyDataFromDataTo",
  async ({ code, date, lastDate }) => {
    try {
      const response = await fetch(
        `http://api.nbp.pl/api/exchangerates/rates/c/${code}/${date}/${lastDate}/`
      );

      if (!response.ok) {
        throw new Error(
          `Somthing went wrong with http://api.nbp.pl/api/exchangerates/rates/c/${code}/${date}/${lastDate}/ response.status: ${response.status}`
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

const singleCurrencyFetchDateFromDateToSlice = createSlice({
  name: "singleCurrencyDateFromTo",
  initialState: initialState,
  reducers: {
    deleteData(state) {
      state.data = [{ currency: "", code: "", mid: "" }];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(singleFetchDataFromDateTo.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(singleFetchDataFromDateTo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(singleFetchDataFromDateTo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "error";
    });
  },
});

export const singleCurrencyDateFromDateToActions =
  singleCurrencyFetchDateFromDateToSlice.actions;
export default singleCurrencyFetchDateFromDateToSlice.reducer;
