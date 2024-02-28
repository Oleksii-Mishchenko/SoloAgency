import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addEventType, loadEventTypes } from '../api/eventTypes';
import { EventTypes } from '../types/EventType';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';

export type EventTypesState = {
  eventTypes: EventTypes;
  isLoadingEventTypes: boolean;
  errors: ServerErrorResponse | null;
  isAdding: boolean;
  isAddSuccess: boolean;
  errorsAdding: ServerErrorResponse | null;
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
  isAdding: false,
  isAddSuccess: false,
  errorsAdding: null,
};

export const init = createAsyncThunk(
  'fetch/eventTypes',
  async (page: string) => {
    const response = await loadEventTypes(page);

    return response;
  },
);

export const add = createAsyncThunk('add/service', async (data: FormData) => {
  const response = await addEventType(data);

  return response;
});

export const eventTypesSlice = createSlice({
  name: 'eventTypes',
  initialState,
  reducers: {
    clearAddData: state => {
      state.errorsAdding = null;
      state.isAddSuccess = false;
    },
  },

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

    builder.addCase(add.pending, state => {
      state.isAdding = true;
      state.errorsAdding = null;
    });

    builder.addCase(add.fulfilled, state => {
      state.isAdding = false;
      state.isAddSuccess = true;
    });

    builder.addCase(add.rejected, (state, action) => {
      state.isAdding = false;
      state.errorsAdding = parseErrors(action.error.message);
    });
  },
});

export const { clearAddData } = eventTypesSlice.actions;
export default eventTypesSlice.reducer;
