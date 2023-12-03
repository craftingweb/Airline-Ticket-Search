import { configureStore } from '@reduxjs/toolkit';
import { ticketApi } from '../services/ticketApi';

export const store = configureStore({
  reducer: {
    [ticketApi.reducerPath]: ticketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ticketApi.middleware),
});
