import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CallRequestData } from '../types/CallRequestData';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { addCallRequest } from '../api/callRequest';
import { parseErrors } from '../helpers/parseErrors';

export type CallRequestState = {
  callRequest: CallRequestData | null;
  isUploading: boolean;
  callRequestErrors: ServerErrorResponse | null;
};

const initialState: CallRequestState = {
  callRequest: null,
  isUploading: false,
  callRequestErrors: null,
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
  },
});

export default callRequestSlice.reducer;
export const { clearCallRequest, clearCallRequestErrors } =
  callRequestSlice.actions;
