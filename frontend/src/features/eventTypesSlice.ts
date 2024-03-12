import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addEventType,
  editEventType,
  loadEventTypes,
  removeEventType,
} from '../api/eventTypes';
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
  deletingEventTypeId: number | null;
  deletedEventTypeId: number | null;
  errorsDeleteEventType: ServerErrorResponse | null;
  isPatchingEventType: boolean;
  isPatchedEventType: boolean;
  errorsPatch: ServerErrorResponse | null;
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
  deletingEventTypeId: null,
  deletedEventTypeId: null,
  errorsDeleteEventType: null,
  isPatchingEventType: false,
  isPatchedEventType: false,
  errorsPatch: null,
};

export const init = createAsyncThunk(
  'fetch/eventTypes',
  async (page: string) => {
    const response = await loadEventTypes(page);

    return response;
  },
);

export const add = createAsyncThunk(
  'add/eventTypes',
  async (data: FormData) => {
    const response = await addEventType(data);

    return response;
  },
);

export const remove = createAsyncThunk(
  'delete/eventTypes',
  async (id: number) => {
    await removeEventType(id);

    return id;
  },
);

export const edit = createAsyncThunk(
  'patch/eventTypes',
  async (eventType: { formData: FormData; id: number }) => {
    const response = await editEventType(eventType);

    return response;
  },
);

export const eventTypesSlice = createSlice({
  name: 'eventTypes',
  initialState,
  reducers: {
    clearAddData: state => {
      state.errorsAdding = null;
      state.isAddSuccess = false;
    },

    clearDeletedId: state => {
      state.deletedEventTypeId = null;
    },

    clearErrorsDelete: state => {
      state.errorsDeleteEventType = null;
    },

    clearIsPatched: state => {
      state.isPatchedEventType = false;
    },

    clearErrorsPatch: state => {
      state.errorsPatch = null;
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

    builder.addCase(remove.pending, (state, action) => {
      state.deletingEventTypeId = action.meta.arg;
      state.errorsDeleteEventType = null;
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      state.deletingEventTypeId = null;
      state.eventTypes.results = state.eventTypes.results.filter(
        eventType => eventType.id !== action.payload,
      );
      state.deletedEventTypeId = action.payload;
    });

    builder.addCase(remove.rejected, (state, action) => {
      state.deletingEventTypeId = null;
      state.errorsDeleteEventType = parseErrors(action.error.message);
    });

    builder.addCase(edit.pending, state => {
      state.isPatchingEventType = true;
      state.errorsPatch = null;
    });

    builder.addCase(edit.fulfilled, (state, action) => {
      state.isPatchingEventType = false;
      state.eventTypes.results = state.eventTypes.results.map(eventType => {
        return eventType.id === action.payload.id ? action.payload : eventType;
      });
      state.isPatchedEventType = true;
    });

    builder.addCase(edit.rejected, (state, action) => {
      state.isPatchingEventType = false;
      state.errorsPatch = parseErrors(action.error.message);
    });
  },
});

export const {
  clearAddData,
  clearDeletedId,
  clearErrorsDelete,
  clearErrorsPatch,
  clearIsPatched,
} = eventTypesSlice.actions;
export default eventTypesSlice.reducer;
