import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [{name:'',value:'',code:''}],
  isLoading: false,
  error: null,
  status: 'initialized'
};

const header = new Headers({ "Access-Control-Allow-Origin": "*" });

export const singleCurrencyDateFetch = createAsyncThunk(
  "fetchSingleCurrency",
  async ({ table, code, date }) => {
    console.log(`CODE ASYNC !!!! ${code} table: ${table}  !!!`);
    try {
      const response = await fetch(
        `http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${date}/`
      );
      if (!response.ok) {
        throw new Error(`Somthing went wrong with ${table} ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error,'Error w catch!!!!!!!!');
    }
  }
);

const singleCurrencyDateFetchSlice = createSlice({
  name: "singleCurrency",
  initialState,
  reducers: {
    deleteData(state){
      state.data = [{name:'',value:'',code:''}];
      state.status = 'initialized'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(singleCurrencyDateFetch.pending, (state) => {
      state.isLoading = true;
      state.status = 'pending'
    });
    builder.addCase(singleCurrencyDateFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = 'success'
    });
    builder.addCase(singleCurrencyDateFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = 'error';
   
    });
  },
});
export const singleCurrencyDateActions = singleCurrencyDateFetchSlice.actions;

export default singleCurrencyDateFetchSlice.reducer;
