import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadEventTypes } from '../api/eventTypes';
import { EventTypes } from '../types/EventType';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';

export type EventTypesState = {
  eventTypes: EventTypes;
  isLoadingEventTypes: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: EventTypesState = {
  eventTypes: {
    num_pages: 0,
    current_page: 1,
    next_page: null,
    previous_page: null,
    results: [],
  },
  isLoadingEventTypes: false,
  errors: null,
};

export const init = createAsyncThunk(
  'fetch/eventTypes',
  async (page: string) => {
    const response = await loadEventTypes(page);

    return response;
  },
);

export const eventTypesSlice = createSlice({
  name: 'eventTypes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingEventTypes = true;
      state.errors = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.eventTypes = action.payload;
      state.isLoadingEventTypes = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingEventTypes = false;
      state.errors = parseErrors(action.error.message);
    });
  },
});

export default eventTypesSlice.reducer;
