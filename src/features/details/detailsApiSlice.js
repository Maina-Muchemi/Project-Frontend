import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const detailsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = detailsAdapter.getInitialState()

export const detailsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDetails: builder.query({
            query: () => '/details',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedDetails = responseData.map(detail => {
                    detail.id = detail._id
                    return detail
                });
                return detailsAdapter.setAll(initialState, loadedDetails)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Detail', id: 'LIST' },
                        ...result.ids.map(id => ({ type: '', id }))
                    ]
                } else return [{ type: 'Detail', id: 'DetailLIST' }]
            }
        }),
        addNewDetail: builder.mutation({
            query: initialDetail => ({
                url: '/details',
                method: 'POST',
                body: {
                    ...initialDetail,
                }
            }),
            invalidatesTags: [
                { type: 'Detail', id: "LIST" }
            ]
        }),
        updateDetail: builder.mutation({
            query: initialDetail => ({
                url: '/details',
                method: 'PATCH',
                body: {
                    ...initialDetail,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Detail', id: arg.id }
            ]
        }),
        deleteDetail: builder.mutation({
            query: ({ id }) => ({
                url: `/details`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Detail', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetDetailsQuery,
    useAddNewDetailMutation,
    useUpdateDetailMutation,
    useDeleteDetailMutation,
} = detailsApiSlice

// returns the query result object
export const selectDetailsResult = detailsApiSlice.endpoints.getDetails.select()

// creates memoized selector
const selectDetailsData = createSelector(
    selectDetailsResult,
    detailsResult => detailsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDetails,
    selectById: selectDetailById,
    selectIds: selectDetailIds
    // Pass in a selector that returns the details slice of state
} = detailsAdapter.getSelectors(state => selectDetailsData(state) ?? initialState)