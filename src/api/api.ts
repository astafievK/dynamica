import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'http://192.168.7.74/api';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Cache-Control', 'no-cache');
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Post', 'Department'],
    keepUnusedDataFor: 30,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: () => ({})
});