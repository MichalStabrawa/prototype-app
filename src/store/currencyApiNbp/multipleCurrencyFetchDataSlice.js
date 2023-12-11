import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const urlUSA = "https://api.nbp.pl/api/exchangerates/rates/c/usd/last/10";
const initialState = {
  data: [{ name: "", value: "", code: "" }],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const multipleCurrencyFetchData = createAsyncThunk(
  "fetchMultipleCurrency",
  async () => {
    try {
      // Promise.all() lets us coalesce multiple promises into a single super-promise
      let res = await Promise.all([
        fetch(urlUSA).then((response) => response.json()), // parse each response as json
        fetch("https://api.nbp.pl/api/exchangerates/rates/c/eur/last/10").then(
          (response) => response.json()
        ),
        fetch("https://api.nbp.pl/api/exchangerates/rates/c/gbp/last/10").then(
          (response) => response.json()
        ),
        fetch("https://api.nbp.pl/api/exchangerates/rates/c/chf/last/10").then(
          (response) => response.json()
        ),
      ]);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const multipleCurrencyFetchDataSlice = createSlice({
  name: "multiple",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(multipleCurrencyFetchData.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(multipleCurrencyFetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(multipleCurrencyFetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "error";
    });
  },
});

export const multipleCurrencyDataLastActions =
  multipleCurrencyFetchDataSlice.actions;
export default multipleCurrencyFetchDataSlice.reducer;
