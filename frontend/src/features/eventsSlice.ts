import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { Event, PreparedEventRequestData } from '../types/Event';
import { parseErrors } from '../helpers/parseErrors';
import { addEventRequest, getEvents } from '../api/events';

export type EventsState = {
  event: Event | null;
  isEventRequestInProgress: boolean;
  eventRequestErrors: ServerErrorResponse | null;
  events: Event[] | null;
  areEventsLoading: boolean;
  eventsErrors: ServerErrorResponse | null;
};

const initialState: EventsState = {
  event: null,
  isEventRequestInProgress: false,
  eventRequestErrors: null,
  events: null,
  areEventsLoading: false,
  eventsErrors: null,
};

export const add = createAsyncThunk(
  'add/events',
  async (data: PreparedEventRequestData) => {
    const response = await addEventRequest(data);

    return response;
  },
);

export const init = createAsyncThunk('fetch/callRequests', async () => {
  const response = await getEvents();

  return response;
});

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
