import {configureStore} from '@reduxjs/toolkit';

import authReducer from './auth'

 const store = configureStore({
reducer: {isAuthenticated:authReducer}
})

export default store