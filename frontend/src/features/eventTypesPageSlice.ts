import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadEventTypes } from '../api/eventTypesPage';
import { EventTypesPage } from '../types/EventType';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';

export type EventTypesState = {
  eventTypesPage: EventTypesPage;
  isLoadingEventTypes: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: EventTypesState = {
  eventTypesPage: {
    num_pages: 0,
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  isLoadingEventTypes: false,
  errors: null,
};

export const init = createAsyncThunk('fetch/eventTypes', async () => {
  const response = await loadEventTypes();

  return response;
});

export const eventTypesPageSlice = createSlice({
  name: 'eventTypes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingEventTypes = true;
      state.errors = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.eventTypesPage = action.payload;
      state.isLoadingEventTypes = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingEventTypes = false;
      state.errors = parseErrors(action.error.message);
    });
  },
});

export default eventTypesPageSlice.reducer;
