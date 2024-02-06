import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { Event, PreparedEventRequestData } from '../types/Event';
import { parseErrors } from '../helpers/parseErrors';
import { addEventRequest } from '../api/events';

export type EventsState = {
  event: Event | null;
  isEventRequestInProgress: boolean;
  eventRequestErrors: ServerErrorResponse | null;
};

const initialState: EventsState = {
  event: null,
  isEventRequestInProgress: false,
  eventRequestErrors: null,
};

export const add = createAsyncThunk(
  'events/add',
  async (eventRequest: {
    preparedData: PreparedEventRequestData;
    token: string;
  }) => {
    const response = await addEventRequest(eventRequest);

    return response;
  },
);

export const eventsState = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventRequestData: state => {
      state.event = null;
      state.eventRequestErrors = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(add.pending, state => {
      state.isEventRequestInProgress = true;
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.isEventRequestInProgress = false;
      state.event = action.payload;
    });

    builder.addCase(add.rejected, (state, action) => {
      state.isEventRequestInProgress = false;
      state.eventRequestErrors = parseErrors(action.error.message);
    });
  },
});

export const { clearEventRequestData } = eventsState.actions;
export default eventsState.reducer;
