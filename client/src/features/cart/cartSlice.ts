import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
};

function persist(items: CartItem[]) {
  if (typeof localStorage !== 'undefined') localStorage.setItem('cart', JSON.stringify(items));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ productId: string; title: string; price: number }>) {
      const existing = state.items.find(i => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ productId: action.payload.productId, title: action.payload.title, price: action.payload.price, quantity: 1 });
      }
      persist(state.items);
    },
    removeFromCart(state, action: PayloadAction<{ productId: string }>) {
      state.items = state.items.filter(i => i.productId !== action.payload.productId);
      persist(state.items);
    },
    decrementQuantity(state, action: PayloadAction<{ productId: string }>) {
      const item = state.items.find(i => i.productId === action.payload.productId);
      if (!item) return;
      item.quantity = Math.max(0, item.quantity - 1);
      if (item.quantity === 0) state.items = state.items.filter(i => i.productId !== item.productId);
      persist(state.items);
    },
    clearCart(state) {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { addToCart, removeFromCart, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;