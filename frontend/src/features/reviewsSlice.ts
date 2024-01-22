import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Review } from '../types/Review';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { approveReview, loadAllReviews } from '../api/reviews';
import { parseErrors } from '../helpers/parseErrors';

export type ReviewsState = {
  reviews: Review[];
  isLoading: boolean;
  errors: ServerErrorResponse | null;
  approvingId: number | null;
  approvedReview: Review | null;
  approveErrors: ServerErrorResponse | null;
};

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  errors: null,
  approvingId: null,
  approvedReview: null,
  approveErrors: null,
};

export const init = createAsyncThunk('fetch/reviews', async () => {
  const response = await loadAllReviews();

  return response;
});

export const approve = createAsyncThunk('patch/review', async (id: number) => {
  const response = await approveReview(id);

  return response;
});

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearApproveData: state => {
      state.approveErrors = null;
      state.approvedReview = null;
    },
  },

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

    builder.addCase(approve.pending, (state, action) => {
      state.approvingId = action.meta.arg;
    });

    builder.addCase(approve.fulfilled, (state, action) => {
      state.approvingId = null;
      state.reviews = state.reviews.map(review => {
        return review.id === action.payload.id ? action.payload : review;
      });
      state.approvedReview = action.payload;
    });

    builder.addCase(approve.rejected, (state, action) => {
      state.approvingId = null;
      state.approveErrors = parseErrors(action.error.message);
    });
  },
});

export const { clearApproveData } = reviewsSlice.actions;
export default reviewsSlice.reducer;
