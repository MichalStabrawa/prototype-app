import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./auth";
import fetchGoldReducer from "./fetchGoldSlice";
import currencyNbpReducer from "./currencyApiNbp/currencyNbpSlice";
import kindOfTableSliceReducer from "./currencyApiNbp/kindOfTableSlice";

const store = configureStore({
  reducer: {
    content: fetchGoldReducer,
    auth: authSliceReducer,
    currency: currencyNbpReducer,
    table: kindOfTableSliceReducer,
  },
});

export default store;
