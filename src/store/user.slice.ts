import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { LoginResponse } from '../interfaces/auth.interface';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { UserProfile } from '../interfaces/user.interface';
import { RootState } from './store';

export const JWT_PERSISTANT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string | null;
  registerErrorMessage?: string | null;
  profile?: UserProfile;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTANT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk('user/login',
  async (params: { email: string, password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const register = createAsyncThunk('user/register',
  async (params: { name: string, email: string, password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
        name: params.name,
        email: params.email,
        password: params.password
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<UserProfile, void, { state: RootState }>('user/getProfile',
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<UserProfile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    return data;

  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // addJwt: (state, action: PayloadAction<string>) => {
    //   state.jwt = action.payload;
    // },
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
