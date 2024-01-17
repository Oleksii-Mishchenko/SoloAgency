import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Advices, NewAdvice } from '../types/Advice';
import { addAdvice, removeAdvice, loadAdvices } from '../api/advices';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';

export type AdvicesState = {
  advices: Advices;
  isLoadingAdvices: boolean;
  isUploadingAdvice: boolean;
  deletingAdviceId: number | null;
  errors: ServerErrorResponse | null;
};

const initialState: AdvicesState = {
  advices: {
    num_pages: 0,
    current_page: 1,
    next_page: null,
    previous_page: null,
    results: [],
  },
  isLoadingAdvices: false,
  isUploadingAdvice: false,
  deletingAdviceId: null,
  errors: null,
};

export const init = createAsyncThunk('fetch/advices', async (page: string) => {
  const response = await loadAdvices(page);

  return response;
});

export const add = createAsyncThunk(
  'post/advice',
  async (newAdvice: NewAdvice) => {
    const response = await addAdvice(newAdvice);

    return response;
  },
);

export const remove = createAsyncThunk('delete/advice', async (id: number) => {
  await removeAdvice(id);

  return id;
});

export const advicesSlice = createSlice({
  name: 'advices',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingAdvices = true;
      state.errors = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.isLoadingAdvices = false;
      state.advices = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingAdvices = false;
      state.errors = parseErrors(action.error.message);
    });

    builder.addCase(add.pending, state => {
      state.isUploadingAdvice = true;
      state.errors = null;
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.isUploadingAdvice = false;
      state.advices.push(action.payload);
    });

    builder.addCase(add.rejected, (state, action) => {
      state.isUploadingAdvice = false;
      state.errors = parseErrors(action.error.message);
    });

    builder.addCase(remove.pending, (state, action) => {
      state.deletingAdviceId = action.meta.arg;
      state.errors = null;
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      state.deletingAdviceId = null;
      state.advices = state.advices.filter(
        advice => advice.id !== action.payload,
      );
    });

    builder.addCase(remove.rejected, (state, action) => {
      state.deletingAdviceId = null;
      state.errors = parseErrors(action.error.message);
    });
  },
});

export default advicesSlice.reducer;
