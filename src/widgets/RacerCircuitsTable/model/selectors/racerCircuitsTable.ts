import {RootState} from '@/app/providers/store';

export const getPage = (state: RootState) => state.racerCircuitsTable.page;

export const getLimit = (state: RootState) => state.racerCircuitsTable.limit;

export const getTotalItems = (state: RootState) =>
  state.racerCircuitsTable.total;

export const getTotalPages = (state: RootState) =>
  state.racerCircuitsTable.totalPages;
