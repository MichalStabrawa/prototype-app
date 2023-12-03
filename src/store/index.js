import {configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './auth';
import fetchGoldReducer from './fetchGoldSlice'

 const store = configureStore({
reducer: {content:fetchGoldReducer,auth:authSliceReducer}
})

export default store