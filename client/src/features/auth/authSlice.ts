import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = { id: string; name: string; email: string; role: 'user' | 'admin' };

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    loadFromStorage(state) {
      if (typeof localStorage === 'undefined') return;
      const token = localStorage.getItem('token');
      const userRaw = localStorage.getItem('user');
      state.token = token;
      state.user = userRaw ? (JSON.parse(userRaw) as User) : null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setCredentials, loadFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;