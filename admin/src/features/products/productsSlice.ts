import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Product = {
  _id: string;
  title: string;
  price: number;
  rate?: number;
  description?: string;
  discount?: number;
  clothType?: string;
  stock: number;
  images?: string[];
};

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.items = state.items.map(p => (p._id === action.payload._id ? action.payload : p));
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter(p => p._id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;