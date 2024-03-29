import authReducer from '../features/authSlice';
import advicesReducer from '../features/advicesSlice';
import articlesReducer from '../features/articlesSlice';
import callRequestReducer from '../features/callRequestSlice';
import reviewsReducer from '../features/reviewsSlice';
import eventTypesReducer from '../features/eventTypesSlice';
import eventsReducer from '../features/eventsSlice';
import portfolioReducer from '../features/portfolioSlice';
import servicesReducer from '../features/servicesSlice';
import userReducer from '../features/userSlice';

import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  advices: advicesReducer,
  articles: articlesReducer,
  callRequest: callRequestReducer,
  events: eventsReducer,
  eventTypes: eventTypesReducer,
  portfolio: portfolioReducer,
  reviews: reviewsReducer,
  services: servicesReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
