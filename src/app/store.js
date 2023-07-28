// Importing necessary functions from Redux Toolkit and other modules.
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'
import { apiSlice } from './api/apiSlice'
// Configuring the Redux store.
export const store = configureStore({
    // Defining the root reducer, combining the reducers for the API slice and the 'auth' feature.
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,// Adding the API slice reducer under a specific key in the root state
        auth: authReducer,// Adding the 'auth' reducer under the 'auth' key in the root state.
    },
        // Configuring middleware for the store.
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
        // Enabling the Redux DevTools extension for debugging and development purposes.
        devTools: false 
    
})

setupListeners(store.dispatch)