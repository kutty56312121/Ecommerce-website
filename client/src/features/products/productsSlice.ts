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
  page: number;
  limit: number;
  total: number;
}

const initialState: ProductsState = {
  items: [],
  page: 1,
  limit: 12,
  total: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<{ items: Product[]; page: number; limit: number; total: number }>) {
      state.items = action.payload.items;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;