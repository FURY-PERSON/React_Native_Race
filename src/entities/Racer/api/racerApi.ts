import {rtkApi} from '@/shared/api/rtkApi';
import {Racer} from '../types/racer';

interface GetRacersArgs {
  page: number;
  limit: number;
}

interface GetRacersResponse {
  racers: Racer[];
  total: number;
  totalPages: number;
}

interface GetRacersResponseFromServer {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    DriverTable: {
      Drivers: Array<Racer>;
    };
  };
}

interface GetRacerInfoArgs {
  racerId: string;
}

interface GetRacerInfoResponseFromServer {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    DriverTable: {
      Drivers: [Racer];
    };
  };
}

const racerApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getRacers: build.query<GetRacersResponse, GetRacersArgs>({
      providesTags: ['racers'],
      query: ({page, limit}) => ({
        url: 'drivers.json',
        method: 'GET',
        params: {
          offset: page,
          limit: limit,
        },
      }),
      transformResponse: (response: GetRacersResponseFromServer) => {
        const {MRData} = response;
        const {total, limit, DriverTable} = MRData;

        return {
          total: Number(total),
          totalPages: Math.floor(Number(total) / Number(limit)),
          racers: DriverTable.Drivers,
        };
      },
    }),
    getRacerInfo: build.query<Racer, GetRacerInfoArgs>({
      providesTags: ['racerInfo'],
      query: ({racerId}) => ({
        method: 'GET',
        url: `drivers/${racerId}.json`,
      }),
      transformResponse: (response: GetRacerInfoResponseFromServer) => {
        const {MRData} = response;
        const {DriverTable} = MRData;

        return DriverTable.Drivers[0];
      },
    }),
  }),
  overrideExisting: false,
});

export const useGetRacers = racerApi.useGetRacersQuery;
export const getRacersEndpoint = racerApi.endpoints.getRacers;

export const useGetRacerInfo = racerApi.useGetRacerInfoQuery;

export const refetchRacerInfo = racerApi.util.invalidateTags([
  'racerInfo',
  'racers',
]);
