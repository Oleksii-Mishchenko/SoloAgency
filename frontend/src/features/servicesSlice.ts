import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';
import { Service } from '../types/Service';
import { loadServices } from '../api/services';

export type ServicesState = {
  services: Service[] | null;
  isLoadingServices: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: ServicesState = {
  services: null,
  isLoadingServices: false,
  errors: null,
};

export const init = createAsyncThunk('fetch/services', async () => {
  const response = await loadServices();

  return response;
});

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingServices = true;
      state.errors = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.isLoadingServices = false;
      state.services = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingServices = false;
      state.errors = parseErrors(action.error.message);
    });
  },
});

export default servicesSlice.reducer;
