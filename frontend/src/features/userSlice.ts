import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/user';
import { LoginData } from '../types/LoginData';

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: '',
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: LoginData) => {
    const response = await getUser(loginData);

    return response;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      console.log(action);
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'SWWrong';
      console.log(action);
    });
  },
});

export default userSlice.reducer;
