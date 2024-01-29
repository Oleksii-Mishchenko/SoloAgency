import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';
import { Portfolio } from '../types/Project';
import { addProject, loadPortfolio } from '../api/portfolio';

export type PortfolioState = {
  portfolio: Portfolio;
  isLoadingPortfolio: boolean;
  hasLoaded: boolean;
  errorsLoadingPortfolio: ServerErrorResponse | null;
  errorsAdding: ServerErrorResponse | null;
  isAdding: boolean;
  isAddSuccess: boolean;
};

const initialState: PortfolioState = {
  portfolio: {
    num_pages: 0,
    current_page: 1,
    next_page: null,
    previous_page: null,
    results: [],
  },
  isLoadingPortfolio: false,
  hasLoaded: false,
  errorsLoadingPortfolio: null,
  errorsAdding: null,
  isAdding: false,
  isAddSuccess: false,
};

export const init = createAsyncThunk(
  'fetch/portfolio',
  async (page: string) => {
    const response = await loadPortfolio(page);

    return response;
  },
);

export const add = createAsyncThunk('post/project', async (data: FormData) => {
  const response = await addProject(data);

  return response;
});

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,

  reducers: {
    clearAddData: state => {
      state.errorsAdding = null;
      state.isAddSuccess = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingPortfolio = true;
      state.errorsLoadingPortfolio = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.isLoadingPortfolio = false;
      state.hasLoaded = true;
      state.portfolio = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingPortfolio = false;
      state.errorsLoadingPortfolio = parseErrors(action.error.message);
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
  },
});

export const { clearAddData } = portfolioSlice.actions;
export default portfolioSlice.reducer;
