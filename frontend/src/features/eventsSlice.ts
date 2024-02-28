import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { Event, Events, PreparedEventRequestData } from '../types/Event';
import { parseErrors } from '../helpers/parseErrors';
import { addEventRequest, getEvents, patchEvent } from '../api/events';

export type EventsState = {
  event: Event | null;
  isEventRequestInProgress: boolean;
  eventRequestErrors: ServerErrorResponse | null;
  events: Events;
  areEventsLoading: boolean;
  eventsErrors: ServerErrorResponse | null;
  changeEventStatusId: number | null;
  changeEventStatusErrors: ServerErrorResponse | null;
  changeEventStatusErrorId: number | null;
};

const initialState: EventsState = {
  event: null,
  isEventRequestInProgress: false,
  eventRequestErrors: null,
  events: {
    num_pages: 0,
    current_page: 0,
    next_page: null,
    previous_page: null,
    results: [],
  },
  areEventsLoading: false,
  eventsErrors: null,
  changeEventStatusId: null,
  changeEventStatusErrors: null,
  changeEventStatusErrorId: null,
};

export const add = createAsyncThunk(
  'add/events',
  async (data: PreparedEventRequestData) => {
    const response = await addEventRequest(data);

    return response;
  },
);

export const init = createAsyncThunk('fetch/events', async (page: string) => {
  const response = await getEvents(page);

  return response;
});

export const changeStatus = createAsyncThunk(
  'patch/event',
  async ({ id, status }: Pick<Event, 'id' | 'status'>) => {
    const response = await patchEvent({ status }, id);

    return response;
  },
);

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventRequestData: state => {
      state.event = null;
      state.eventRequestErrors = null;
    },

    clearChangeStatusErrors: state => {
      state.changeEventStatusErrors = null;
      state.changeEventStatusErrorId = null;
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

    builder.addCase(init.pending, state => {
      state.areEventsLoading = true;
      state.eventsErrors = null;
      state.events = initialState.events;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.areEventsLoading = false;
      state.events = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.areEventsLoading = false;
      state.eventsErrors = parseErrors(action.error.message);
    });

    builder.addCase(changeStatus.pending, (state, action) => {
      state.changeEventStatusId = action.meta.arg.id;
      state.changeEventStatusErrors = null;
    });

    builder.addCase(changeStatus.fulfilled, (state, action) => {
      state.changeEventStatusId = null;
      state.events.results = state.events.results.map(result => {
        return result.id === action.payload.id
          ? { ...result, status: action.payload.status }
          : result;
      });
    });

    builder.addCase(changeStatus.rejected, (state, action) => {
      state.changeEventStatusId = null;
      state.changeEventStatusErrorId = action.meta.arg.id;
      state.changeEventStatusErrors = parseErrors(action.error.message);
    });
  },
});

export const { clearEventRequestData, clearChangeStatusErrors } =
  eventsSlice.actions;
export default eventsSlice.reducer;
