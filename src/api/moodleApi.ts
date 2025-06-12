import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moodleBaseUrl = "http://192.168.4.48";

export const moodleApi = createApi({
    reducerPath: 'moodleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: moodleBaseUrl
    }),
    tagTypes: [],
    keepUnusedDataFor: 0,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: () => ({})
});