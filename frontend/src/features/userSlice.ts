import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';
import { User } from '../types/User';
import { getUser } from '../api/user';
import { logOut } from './authSlice';

export type UserState = {
  user: User | null;
  isGettingUser: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: UserState = {
  user: null,
  isGettingUser: false,
  errors: null,
};

export const getUserByToken = createAsyncThunk(
  'user/getUser',
  async (token: string) => {
    const response = await getUser(token);

    return response;
  },
);

export const userState = createSlice({
  name: 'getUser',
  initialState,
  reducers: {},

  extraReducers: builder => {
    // getUser
    builder.addCase(getUserByToken.pending, state => {
      state.errors = null;
      state.isGettingUser = true;
    });

    builder.addCase(getUserByToken.fulfilled, (state, action) => {
      state.isGettingUser = false;
      state.user = action.payload;
    });

    builder.addCase(getUserByToken.rejected, (state, action) => {
      state.isGettingUser = false;
      state.errors = parseErrors(action.error.message);
    });

    // logOut
    builder.addCase(logOut.type, state => {
      state.user = initialState.user;
    });
  },
});

export default userState.reducer;
