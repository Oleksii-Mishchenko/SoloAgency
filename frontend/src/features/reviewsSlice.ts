import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewReview, Review } from '../types/Review';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import {
  addReview,
  approveReview,
  deleteReview,
  loadAllReviews,
  loadApprovedReviews,
} from '../api/reviews';
import { parseErrors } from '../helpers/parseErrors';

export type ReviewsState = {
  reviews: Review[];
  isLoading: boolean;
  errors: ServerErrorResponse | null;
  approvingId: number | null;
  approvedReview: Review | null;
  approveErrors: ServerErrorResponse | null;
  deletingId: number | null;
  isDeleted: boolean;
  deleteErrors: ServerErrorResponse | null;
  isAddingReview: boolean;
  isAddSuccess: boolean;
  addErrors: ServerErrorResponse | null;
};

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  errors: null,
  approvingId: null,
  approvedReview: null,
  approveErrors: null,
  deletingId: null,
  isDeleted: false,
  deleteErrors: null,
  isAddingReview: false,
  isAddSuccess: false,
  addErrors: null,
};

export const init = createAsyncThunk(
  'fetch/reviews',
  async (isStaff: boolean | undefined) => {
    const response = isStaff
      ? await loadAllReviews()
      : await loadApprovedReviews();

    return response;
  },
);

export const approve = createAsyncThunk('patch/review', async (id: number) => {
  const response = await approveReview(id);

  return response;
});

export const remove = createAsyncThunk('delete/review', async (id: number) => {
  const response = await deleteReview(id);

  return response;
});

export const add = createAsyncThunk('add/review', async (data: NewReview) => {
  const response = await addReview(data);

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

    clearDeleteData: state => {
      state.deleteErrors = null;
      state.isDeleted = false;
    },

    clearAddData: state => {
      state.addErrors = null;
      state.isAddSuccess = false;
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

    builder.addCase(remove.pending, (state, action) => {
      state.deletingId = action.meta.arg;
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      state.deletingId = null;
      state.reviews = state.reviews.filter(
        review => review.id !== action.meta.arg,
      );
      state.isDeleted = true;
    });

    builder.addCase(remove.rejected, (state, action) => {
      state.deletingId = null;
      state.deleteErrors = parseErrors(action.error.message);
    });

    builder.addCase(add.pending, state => {
      state.isAddingReview = true;
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.isAddingReview = false;
      state.reviews.push(action.payload);
      state.isAddSuccess = true;
    });

    builder.addCase(add.rejected, (state, action) => {
      state.isAddingReview = false;
      state.addErrors = parseErrors(action.error.message);
    });
  },
});

export const { clearApproveData, clearDeleteData, clearAddData } =
  reviewsSlice.actions;
export default reviewsSlice.reducer;
