import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = import.meta.env.VITE_API_URL;

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Cache-Control', 'no-cache');
            return headers;
        },
    }),
    tagTypes: ['Post', 'Department', 'Employee'],
    keepUnusedDataFor: 6000,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    endpoints: () => ({})
});