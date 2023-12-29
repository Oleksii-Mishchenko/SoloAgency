import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { loginUser, registerUser } from '../api/auth';
import { LoginData } from '../types/LoginData';
// import { AuthData } from '../types/AuthData';
import { RegisterData } from '../types/RegisterData';
import { Errors } from '../types/Errors';
import { parseErrors } from '../helpers/parseErrors';

export type AuthState = {
  user: User | null;
  // authData: AuthData | null;
  token: string | null;
  isLoading: boolean;
  isRegistering: boolean;
  errors: Errors | null;
};

const initialState: AuthState = {
  user: null,
  // authData: null,
  token: null,
  isLoading: false,
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

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterData) => {
    const response = await registerUser(registerData);

    return response;
  },
);

export const AuthState = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.token = action.payload;
      console.log(action);
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = parseErrors(action.error.message);
    });

    builder.addCase(register.pending, state => {
      state.errors = null;
      state.isRegistering = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isRegistering = false;
      state.user = action.payload;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isRegistering = false;
      state.errors = parseErrors(action.error.message);
    });
  },
});

export default AuthState.reducer;
