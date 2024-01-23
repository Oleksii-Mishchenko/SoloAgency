import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, loginUser, registerUser } from '../api/auth';
import { LoginData } from '../types/LoginData';
import { RegisterData } from '../types/RegisterData';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';
import { AuthData } from '../types/AuthData';

export type AuthState = {
  authData: AuthData;
  isLoginFormOpen: boolean;
  isLoggingIn: boolean;
  isGettingUser: boolean;
  isRegistering: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: AuthState = {
  authData: { token: null, user: null },
  isLoginFormOpen: false,
  isLoggingIn: false,
  isGettingUser: false,
  isRegistering: false,
  errors: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData) => {
    const response = await loginUser(loginData);

    return response;
  },
);

export const getUserByToken = createAsyncThunk(
  'auth/getUser',
  async (token: string) => {
    const response = await getUser(token);

    return response;
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterData) => {
    const response = await registerUser(registerData);

    return response;
  },
);

export const authState = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openLoginForm: state => {
      state.isLoginFormOpen = true;
    },

    closeLoginForm: state => {
      state.isLoginFormOpen = false;
    },

    clearErrors: state => {
      state.errors = null;
    },
  },
  extraReducers: builder => {
    // login
    builder.addCase(login.pending, state => {
      state.errors = null;
      state.isLoggingIn = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggingIn = false;
      state.authData.token = action.payload.token;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.isLoginFormOpen = false;
      state.errors = parseErrors(action.error.message);
    });

    // getUser
    builder.addCase(getUserByToken.pending, state => {
      state.errors = null;
      state.isGettingUser = true;
    });

    builder.addCase(getUserByToken.fulfilled, (state, action) => {
      state.isGettingUser = false;
      state.authData.user = action.payload;
    });

    builder.addCase(getUserByToken.rejected, (state, action) => {
      state.isGettingUser = false;
      state.errors = parseErrors(action.error.message);
    });

    // registration
    builder.addCase(register.pending, state => {
      state.errors = null;
      state.isRegistering = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isRegistering = false;
      state.authData.user = action.payload;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isRegistering = false;
      state.errors = parseErrors(action.error.message);
    });
  },
});

export const { openLoginForm, closeLoginForm, clearErrors } = authState.actions;
export default authState.reducer;
