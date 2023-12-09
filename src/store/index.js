import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./auth";
import fetchGoldReducer from "./fetchGoldSlice";
import currencyNbpReducer from "./currencyApiNbp/currencyNbpSlice";
import kindOfTableSliceReducer from "./currencyApiNbp/kindOfTableSlice";
import singleCurrencySliceReducer from './currencyApiNbp/singleCurrencyFetchDateSlice'

const store = configureStore({
  reducer: {
    content: fetchGoldReducer,
    auth: authSliceReducer,
    currency: currencyNbpReducer,
    table: kindOfTableSliceReducer,
    singleCurrency:singleCurrencySliceReducer
  },
});

export default store;
