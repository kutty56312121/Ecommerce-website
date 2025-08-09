import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = { id: string; name: string; email: string; role: 'user' | 'admin' };

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: typeof localStorage !== 'undefined' && localStorage.getItem('admin_user')
    ? JSON.parse(localStorage.getItem('admin_user') as string)
    : null,
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('admin_token', action.payload.token);
        localStorage.setItem('admin_user', JSON.stringify(action.payload.user));
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;