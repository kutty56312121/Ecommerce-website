import { configureStore, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout(state) {
      state.user = null
      state.token = null
    },
  },
})

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], page: 1, total: 0, pages: 0, loading: false },
  reducers: {
    setProducts(state, action) {
      return { ...state, ...action.payload }
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const item = action.payload
      const existing = state.items.find((i) => i._id === item._id)
      if (existing) existing.quantity += item.quantity || 1
      else state.items.push({ ...item, quantity: item.quantity || 1 })
    },
    removeFromCart(state, action) {
      const id = action.payload
      state.items = state.items.filter((i) => i._id !== id)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export const { setProducts, setLoading } = productsSlice.actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
})