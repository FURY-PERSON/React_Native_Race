import {RootState} from '@/app/providers/store';

export const getPage = (state: RootState) => state.racersTable.page;

export const getLimit = (state: RootState) => state.racersTable.limit;

export const getTotalItems = (state: RootState) => state.racersTable.total;

export const getTotalPages = (state: RootState) => state.racersTable.totalPages;
