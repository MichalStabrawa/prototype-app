import {configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './auth';
import fetchGoldReducer from './fetchGoldSlice';
import currencyNbpReducer from './currencyApiNbp/currencyNbpSlice';



 const store = configureStore({
reducer: {content:fetchGoldReducer,auth:authSliceReducer,currency:currencyNbpReducer}
})

export default store