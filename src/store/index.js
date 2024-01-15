import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./auth";
import fetchGoldReducer from "./fetchGoldSlice";
import currencyNbpReducer from "./currencyApiNbp/currencyNbpSlice";
import kindOfTableSliceReducer from "./currencyApiNbp/kindOfTableSlice";
import singleCurrencySliceReducer from "./currencyApiNbp/singleCurrencyFetchDateSlice";
import multipleCurrencyFetchDataSliceReducer from "./currencyApiNbp/multipleCurrencyFetchDataSlice";
import singleCurrencyFetchDateFromDateToReducer from "./currencyApiNbp/singleCurrencyFetchDataFromDateToSlice";
import singleCurrencyLastFewTimesReducer from "./currencyApiNbp/singleCurrencyLastFewTimes";
import fetchNbpTableCReducer from "./currencyApiNbp/currencyFetchTableC";
import goldFetchApiSlice from "./goldApiNbp/goldFetchApiSlice";
import goldFetchApiReducer from "./goldApiNbp/goldFetchTopLastCount";
import goldFetchDateReducer from "./goldApiNbp/goldFetchDateSlice";
import goldFetchFromToDateReducer from "./goldApiNbp/goldFetchFromToDateSlice";

import singleCurrBidLastTopCountReducer from "./currencyApiNbp/singleCurrencyBidLastTopCountSlice";
import exchangeFetchMidForToDateSlice from "./currencyApiNbp/exchangeFetchMidForToDateSlice";
import fetchBidAskSingleDateSliceReducer from "./currencyApiNbp/bidAskFetchSingleDate";
import fetchBidAskSingleFromToDateReducer from "./currencyApiNbp/bidAskFetchSingleFromToDate";
import fetchUserSalaryReducer from "./fetchUserData/fetchUserSalary";
const store = configureStore({
  reducer: {
    content: fetchGoldReducer,
    auth: authSliceReducer,
    currency: currencyNbpReducer,
    table: kindOfTableSliceReducer,
    singleCurrency: singleCurrencySliceReducer,
    multiple: multipleCurrencyFetchDataSliceReducer,
    singleCurrencyDateFromTo: singleCurrencyFetchDateFromDateToReducer,
    singleCurrencyLastFewTimes: singleCurrencyLastFewTimesReducer,
    singleCurrBidTopLastCount: singleCurrBidLastTopCountReducer,
    exchangeMidFetchStartEndDate: exchangeFetchMidForToDateSlice,
    tableC: fetchNbpTableCReducer,
    goldFetch: goldFetchApiSlice,
    goldFetchTopLast: goldFetchApiReducer,
    goldFetchDate: goldFetchDateReducer,
    goldFetchFromToDate: goldFetchFromToDateReducer,
    bidAskSingleDate: fetchBidAskSingleDateSliceReducer,
    fetchBidAskSingleFromToDate: fetchBidAskSingleFromToDateReducer,
    fetchUserSalary: fetchUserSalaryReducer,
  },
});

export default store;
