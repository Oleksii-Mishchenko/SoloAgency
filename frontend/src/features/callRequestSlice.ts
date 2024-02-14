import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  CallRequest,
  CallRequestData,
  CallRequests,
} from '../types/CallRequestData';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { addCallRequest, getCallRequests } from '../api/callRequest';
import { parseErrors } from '../helpers/parseErrors';

export type CallRequestState = {
  callRequest: CallRequest | null;
  isUploading: boolean;
  callRequestErrors: ServerErrorResponse | null;
  callRequests: CallRequests;
  areCRLoading: boolean;
  callRequestsErrors: ServerErrorResponse | null;
};

const initialState: CallRequestState = {
  callRequest: null,
  isUploading: false,
  callRequestErrors: null,
  callRequests: {
    num_pages: 0,
    current_page: 0,
    next_page: null,
    previous_page: null,
    results: [],
  },
  areCRLoading: false,
  callRequestsErrors: null,
};

export const add = createAsyncThunk(
  'post/callRequest',
  async (callRequestData: CallRequestData) => {
    const response = await addCallRequest(callRequestData);

    return response;
  },
);

export const init = createAsyncThunk(
  'fetch/callRequests',
  async (page: string) => {
    const response = await getCallRequests(page);

    return response;
  },
);

export const callRequestSlice = createSlice({
  name: 'callRequest',
  initialState,
  reducers: {
    clearCallRequest: state => {
      state.callRequest = null;
    },
    clearCallRequestErrors: state => {
      state.callRequestErrors = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(add.pending, state => {
      state.isUploading = true;
      state.callRequest = null;
      state.callRequestErrors = null;
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.isUploading = false;
      state.callRequest = action.payload;
    });

    builder.addCase(add.rejected, (state, action) => {
      state.isUploading = false;
      state.callRequest = null;
      state.callRequestErrors = parseErrors(action.error.message);
    });

    builder.addCase(init.pending, state => {
      state.areCRLoading = true;
      state.callRequestsErrors = null;
      state.callRequests = initialState.callRequests;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.areCRLoading = false;
      state.callRequests = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.areCRLoading = false;
      state.callRequestsErrors = parseErrors(action.error.message);
    });
  },
});

export default callRequestSlice.reducer;
export const { clearCallRequest, clearCallRequestErrors } =
  callRequestSlice.actions;
