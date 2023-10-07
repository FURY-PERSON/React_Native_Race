import {rtkApi} from '@/shared/api/rtkApi';
import {Circuit} from '../types/circuit';

interface GetCircuitsByRacerArgs {
  racerId: string;
  page: number;
  limit: number;
}

interface GetCircuitsByRacerResponse {
  circuits: Circuit[];
  total: number;
  totalPages: number;
}

interface GetCircuitsByRacerFromServer {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable: {
      driverId: string;
      Races: Array<Circuit>;
    };
  };
}

const circuitApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getCircuitsByRacer: build.query<
      GetCircuitsByRacerResponse,
      GetCircuitsByRacerArgs
    >({
      providesTags: ['racerCircuits'],
      query: ({racerId, limit, page}) => {
        return {
          url: `drivers/${racerId}/races.json`,
          params: {
            offset: page,
            limit: limit,
          },
        };
      },
      transformResponse: (response: GetCircuitsByRacerFromServer) => {
        const {MRData} = response;
        const {total, limit, RaceTable} = MRData;

        return {
          total: Number(total),
          totalPages: Math.floor(Number(total) / Number(limit)),
          circuits: RaceTable.Races,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const useGetCircuitsByRacer = circuitApi.useGetCircuitsByRacerQuery;
export const getCircuitsByRacerEndpoint =
  circuitApi.endpoints.getCircuitsByRacer;

export const refetchCircuits = circuitApi.util.invalidateTags([
  'racerCircuits',
]);
