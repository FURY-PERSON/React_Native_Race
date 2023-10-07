import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RacersTableSchema} from '../types/racersTableSchema';
import {getRacersEndpoint} from '@/entities/Racer';

const initialState: RacersTableSchema = {
  page: 0,
  limit: 10,

  total: 0,
  totalPages: 0,
};

const racersTableSlice = createSlice({
  name: 'racersTableSlice',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    increasePage(state) {
      state.page = state.page + 1;
    },
    decreasePage(state) {
      state.page = state.page - 1;
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(getRacersEndpoint.matchFulfilled, (state, {payload}) => {
      state.total = payload.total;
      state.totalPages = payload.totalPages;
    });
  },
});

export const {actions: racersTableActions, reducer: racersTableReducer} =
  racersTableSlice;
