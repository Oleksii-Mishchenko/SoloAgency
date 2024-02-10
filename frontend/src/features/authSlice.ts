import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../api/auth';
import { LoginData } from '../types/LoginData';
import { RegisterData } from '../types/RegisterData';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';

export type AuthState = {
  token: string | null;
  isLoggingIn: boolean;
  isLoginFormOpen: boolean;
  isRegisterFormOpen: boolean;
  isRegistering: boolean;
  errors: ServerErrorResponse | null;
};

const initialState: AuthState = {
  token: null,
  isLoggingIn: false,
  isLoginFormOpen: false,
  isRegisterFormOpen: false,
  isRegistering: false,
  errors: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData) => {
    const response = await loginUser(loginData);
    return response.token;
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
      state.isRegisterFormOpen = false;
      state.isLoginFormOpen = true;
    },

    closeLoginForm: state => {
      state.isLoginFormOpen = false;
    },

    clearErrors: state => {
      state.errors = null;
    },

    openRegisterForm: state => {
      state.isLoginFormOpen = false;
      state.isRegisterFormOpen = true;
    },

    closeRegisterForm: state => {
      state.isRegisterFormOpen = false;
    },

    logOut: state => {
      state.token = initialState.token;
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
      state.token = action.payload;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.isLoginFormOpen = false;
      state.errors = parseErrors(action.error.message);
    });

    // registration
    builder.addCase(register.pending, state => {
      state.errors = null;
      state.isRegistering = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isRegistering = false;
      state.isRegisterFormOpen = false;
      state.token = action.payload.token;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isRegistering = false;
      state.isRegisterFormOpen = false;
      state.errors = parseErrors(action.error.message);
    });
  },
});

export const {
  openLoginForm,
  closeLoginForm,
  clearErrors,
  openRegisterForm,
  closeRegisterForm,
  logOut,
} = authState.actions;
export default authState.reducer;
