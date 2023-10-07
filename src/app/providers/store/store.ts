import {rtkApi} from '@/shared/api/rtkApi';
import {racerCircuitsTableReducer} from '@/widgets/RacerCircuitsTable/model/slices/racerCircuitsTable.slice';
import {racersTableReducer} from '@/widgets/RacersTable/model/slices/racersTable.slice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  racersTable: racersTableReducer,
  racerCircuitsTable: racerCircuitsTableReducer,
  [rtkApi.reducerPath]: rtkApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware().concat(rtkApi.middleware);

    return middlewares;
  },
  devTools: !!__DEV__,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export interface ThunkExtra {}
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtra;
  state: RootState;
}
