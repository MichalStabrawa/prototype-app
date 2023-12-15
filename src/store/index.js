import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./auth";
import fetchGoldReducer from "./fetchGoldSlice";
import currencyNbpReducer from "./currencyApiNbp/currencyNbpSlice";
import kindOfTableSliceReducer from "./currencyApiNbp/kindOfTableSlice";
import singleCurrencySliceReducer from "./currencyApiNbp/singleCurrencyFetchDateSlice";
import multipleCurrencyFetchDataSliceReducer from "./currencyApiNbp/multipleCurrencyFetchDataSlice";
import singleCurrencyFetchDateFromDateToReducer from "./currencyApiNbp/singleCurrencyFetchDataFromDateToSlice";

const store = configureStore({
  reducer: {
    content: fetchGoldReducer,
    auth: authSliceReducer,
    currency: currencyNbpReducer,
    table: kindOfTableSliceReducer,
    singleCurrency: singleCurrencySliceReducer,
    multiple: multipleCurrencyFetchDataSliceReducer,
    singleCurrencyDateFromTo: singleCurrencyFetchDateFromDateToReducer,
  },
});

export default store;
