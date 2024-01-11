import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadEventTypes } from '../api/eventTypes';
import { EventType } from '../types/EventType';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';

export type EventTypesState = {
  eventTypes: EventType[];
  isLoadingEventTypes: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: EventTypesState = {
  eventTypes: [],
  isLoadingEventTypes: false,
  errors: null,
};

export const init = createAsyncThunk('fetch/eventTypes', async () => {
  const response = await loadEventTypes();

  return response;
});

export const eventTypesSlice = createSlice({
  name: 'eventTypes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingEventTypes = true;
      state.eventTypes = [];
      state.errors = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.eventTypes = action.payload;
      state.isLoadingEventTypes = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingEventTypes = false;
      state.eventTypes = [];
      state.errors = parseErrors(action.error.message);
    });
  },
});

export default eventTypesSlice.reducer;
