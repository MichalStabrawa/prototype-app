import {configureStore} from '@reduxjs/toolkit';

import authSlice from './auth';
import fetchGoldReducer from './fetchGoldSlice'

 const store = configureStore({
reducer: {authentication:authSlice,content:fetchGoldReducer}
})

export default store