import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tokenReducer from './modules/tokenSlice';
import userReducer from './modules/userSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = { user: userReducer, token: tokenReducer };

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
AppState,
unknown,
Action<string>
>;

export default store;
