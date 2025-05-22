import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'https://newportal/api';

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
    keepUnusedDataFor: 10,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: () => ({})
});