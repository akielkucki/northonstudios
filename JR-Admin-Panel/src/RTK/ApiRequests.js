import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const Api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        prepareHeaders: (headers, { pageParam }) => {
            if (pageParam) {
              headers.set('page', String(pageParam));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // Get Requests
        getFormsDetails: builder.query({ query: (data) => `admin/getContactFormsDetails?page=${data.page}` }),
        getSingleFormDetails: builder.query({ query: (data) => `admin/getSingleFormDetails?form_Id=${data.form_Id}` }),


    })
})

export const { useGetFormsDetailsQuery, useGetSingleFormDetailsQuery } = Api;