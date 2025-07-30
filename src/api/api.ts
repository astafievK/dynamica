import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = "https://newportal/api";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    tagTypes: [
        'Post',
        'Department',
        'Employee',
        'Permission',
        'DocumentsTabs', 'Documents', 'Document'
    ],
    keepUnusedDataFor: 120,
    refetchOnReconnect: true,
    endpoints: () => ({})
});