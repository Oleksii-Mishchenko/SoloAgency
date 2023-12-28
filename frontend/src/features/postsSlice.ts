import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { createPost, getPosts } from '../api/posts';

export type PostsState = {
  posts: Post[];
  isLoading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: '',
};

export const loadPosts = createAsyncThunk('posts/fetch', async () => {
  const response = await getPosts();

  return response;
});

export const uploadPost = createAsyncThunk(
  'post/post',
  async (postData: Omit<Post, 'id'>) => {
    const response = await createPost(postData);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = '';
    });

    builder.addCase(loadPosts.rejected, (state, action) => {
      state.isLoading = false;
      if (action.error.message) {
        state.error = action.error.message;
        state.posts = [];
      }
    });

    builder.addCase(uploadPost.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(uploadPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.unshift(action.payload);
      state.error = '';
    });

    builder.addCase(uploadPost.rejected, (state, action) => {
      state.isLoading = false;
      if (action.error.message) {
        state.error = action.error.message;
        state.posts = [];
      }
    });
  },
});

export default postsSlice.reducer;
