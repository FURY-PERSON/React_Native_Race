import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from './constants';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Connection: 'keep-alive',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  }),
  tagTypes: ['racerInfo', 'racers', 'racerCircuits'],
  endpoints: builder => ({}),
});
