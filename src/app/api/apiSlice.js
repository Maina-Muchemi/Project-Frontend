// Importing necessary functions from the '@reduxjs/toolkit/query/react' package and the 'authSlice' from the 'auth' feature.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

// Creating the base query configuration with some options.
const baseQuery = fetchBaseQuery({
  // Including credentials in the request (e.g., cookies) to support authentication.
  credentials: 'include',
  // The base URL used for all API requests.
  baseUrl: 'https://dtdobie-api.onrender.com',
  // This function prepares headers for the API request. It adds an authorization header if a token is available in the Redux store (auth.token).
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

// This function extends the baseQuery by adding reauthentication logic for handling 403 status codes.
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Call the original baseQuery function with the provided arguments.
  let result = await baseQuery(args, api, extraOptions)

  // Handling other status codes - specifically, if the response returns a 403 (Forbidden) error.
  if (result?.error?.status === 403) {
    console.log('send the refresh token')

    // Sending a new refresh token to get a new access token.
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult?.data) {
      // If the refresh token call is successful, store the new token in the Redux store.
      api.dispatch(setCredentials({ ...refreshResult.data }))
      // Retry the original query with the new access token after the successful refresh.
      result = await baseQuery(args, api, extraOptions)
    } else {
      // If the refresh token call also results in a 403 error, set a custom error message in the error data.
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired."
      }
      return refreshResult
    }
  }

  // Return the result of the query, which could be the original data or an error response.
  return result
}

// Creating the API slice using createApi function from Redux Toolkit.
export const apiSlice = createApi({
  // Using the custom baseQueryWithReauth function as the base query for all endpoints.
  baseQuery: baseQueryWithReauth,
  // Defining tag types for endpoints (e.g., 'Detail', 'User'). Tag types are used for automatic caching and invalidation.
  tagTypes: ['Detail', 'User'],
  // Defining the endpoints for the API. In this case, an empty object is provided, but you can define endpoints using the 'builder' function if needed.
  endpoints: builder => ({})
})
