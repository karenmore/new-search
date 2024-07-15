import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientAxios from '../../config/axios';

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async () => {
    const token = localStorage.getItem('token');
    if (!token) return { user: null, token: null };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await clientAxios.get('/profile', config);
    //console.log(data)
    return { user: data, token };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: true,
  },
  reducers: {
    signOff: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
      });
  },
});

export const { signOff } = authSlice.actions;
export default authSlice.reducer;