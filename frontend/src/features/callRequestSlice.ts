import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CallRequestData } from '../types/CallRequestData';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { addCallRequest } from '../api/callRequest';
import { parseErrors } from '../helpers/parseErrors';

export type CallRequestState = {
  callRequest: CallRequestData | null;
  isUploading: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: CallRequestState = {
  callRequest: null,
  isUploading: false,
  errors: null,
};

export const add = createAsyncThunk(
  'post/callRequest',
  async (callRequestData: CallRequestData) => {
    const response = await addCallRequest(callRequestData);

    return response;
  },
);

export const callRequestSlice = createSlice({
  name: 'callRequest',
  initialState,
  reducers: {
    clear: state => {
      state.callRequest = null;
      state.errors = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(add.pending, state => {
      state.isUploading = true;
      state.callRequest = null;
      state.errors = null;
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.isUploading = false;
      state.callRequest = action.payload;
    });

    builder.addCase(add.rejected, (state, action) => {
      state.isUploading = false;
      state.callRequest = null;
      state.errors = parseErrors(action.error.message);
    });
  },
});

export default callRequestSlice.reducer;
export const { clear } = callRequestSlice.actions;
