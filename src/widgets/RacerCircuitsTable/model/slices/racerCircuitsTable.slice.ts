import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RacerCircuitsTableSchema} from '../types/racerCircuitsTableSchema';
import {getCircuitsByRacerEndpoint} from '@/entities/Circuit';

const initialState: RacerCircuitsTableSchema = {
  page: 0,
  limit: 10,

  total: 0,
  totalPages: 0,
};

const racerCircuitsTableSlice = createSlice({
  name: 'racerCircuitsTableSlice',
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
    builder.addMatcher(
      getCircuitsByRacerEndpoint.matchFulfilled,
      (state, {payload}) => {
        state.total = payload.total;
        state.totalPages = payload.totalPages;
      },
    );
  },
});

export const {
  actions: racerCircuitsTableActions,
  reducer: racerCircuitsTableReducer,
} = racerCircuitsTableSlice;
