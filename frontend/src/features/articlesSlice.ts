import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Article } from '../types/Article';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { loadArticles } from '../api/articles';
import { parseErrors } from '../helpers/parseErrors';

export type ArticlesState = {
  articles: Article[] | null;
  isLoadingArticles: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: ArticlesState = {
  articles: null,
  isLoadingArticles: false,
  errors: null,
};

export const init = createAsyncThunk('fetch/articles', async () => {
  const response = await loadArticles();

  return response;
});

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingArticles = true;
      state.articles = [];
      state.errors = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.isLoadingArticles = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingArticles = false;
      state.articles = [];
      state.errors = parseErrors(action.error.message);
    });
  },
});

export default articlesSlice.reducer;
