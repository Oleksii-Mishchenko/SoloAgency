import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Advice, NewAdvice } from '../types/Advice';
import { addAdvice, deleteAdvice, loadAdvices } from '../api/advices';

export type AdvicesState = {
  advices: Advice[];
  isLoadingAdvices: boolean;
  isUploadingAdvice: boolean;
  deletingAdviceId: number | null;
  error: string;
};

const initialState: AdvicesState = {
  advices: [],
  isLoadingAdvices: false,
  isUploadingAdvice: false,
  deletingAdviceId: null,
  error: '',
};

export const init = createAsyncThunk('fetch/advices', async () => {
  const response = await loadAdvices();

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
  await deleteAdvice(id);

  return id;
});

export const advicesSlice = createSlice({
  name: 'advices',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingAdvices = true;
      state.advices = [];
      state.error = '';
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.isLoadingAdvices = false;
      state.advices = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingAdvices = false;
      state.advices = [];
      state.error = action.error.message || 'Error while loading advices';
    });

    builder.addCase(add.pending, state => {
      state.isUploadingAdvice = true;
      state.error = '';
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.isUploadingAdvice = false;
      state.advices.push(action.payload);
    });

    builder.addCase(add.rejected, (state, action) => {
      state.isUploadingAdvice = false;
      state.error = action.error.message || 'Error while adding the advice';
    });

    builder.addCase(remove.pending, (state, action) => {
      state.deletingAdviceId = action.meta.arg;
      state.error = '';
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      state.deletingAdviceId = null;
      state.advices = state.advices.filter(
        advice => advice.id !== action.payload,
      );
    });

    builder.addCase(remove.rejected, (state, action) => {
      state.deletingAdviceId = null;
      state.error = action.error.message || 'Error while deleting the advice';
    });
  },
});

export default advicesSlice.reducer;
