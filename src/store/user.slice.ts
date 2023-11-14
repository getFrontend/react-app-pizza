import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { LoginResponse } from '../interfaces/auth.interface';
import axios from 'axios';
import { PREFIX } from '../helpers/API';

export const JWT_PERSISTANT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginState: null | 'rejected';
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTANT_STATE)?.jwt ?? null,
  loginState: null
};

export const login = createAsyncThunk('user/login',
  async (params: { email: string, password: string }) => {
    const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
      email: params.email,
      password: params.password
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, error) => {
      console.log(error);
    });
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
