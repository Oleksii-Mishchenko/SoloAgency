import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';
import { Portfolio } from '../types/Project';
import { loadPortfolio } from '../api/portfolio';

export type PortfolioState = {
  portfolio: Portfolio;
  isLoadingPortfolio: boolean;
  errorsLoadingPortfolio: ServerErrorResponse | null;
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
  errorsLoadingPortfolio: null,
};

export const init = createAsyncThunk(
  'fetch/portfolio',
  async (page: string) => {
    const response = await loadPortfolio(page);

    return response;
  },
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingPortfolio = true;
      state.errorsLoadingPortfolio = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.isLoadingPortfolio = false;
      state.portfolio = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingPortfolio = false;
      state.errorsLoadingPortfolio = parseErrors(action.error.message);
    });
  },
});

export default portfolioSlice.reducer;
