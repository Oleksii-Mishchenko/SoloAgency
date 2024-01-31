import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Review } from '../types/Review';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { loadApprovedReviews } from '../api/reviews';
import { parseErrors } from '../helpers/parseErrors';

export type ReviewsState = {
  reviews: Review[];
  isLoading: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  errors: null,
};

export const init = createAsyncThunk('fetch/reviews', async () => {
  const response = await loadApprovedReviews();

  return response;
});

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = parseErrors(action.error.message);
    });
  },
});

export default reviewsSlice.reducer;
