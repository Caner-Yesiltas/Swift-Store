import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
interface ProductsState {
  loading: boolean;
  error: boolean;
  favorites: Product[];
  productsList: Product[];
}

const initialState: ProductsState = {
  loading: false,
  error: false,
  favorites: [],
  productsList: [],
};

export const productsSlice = createSlice({
  name: 'products',

  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = false;
    },
    getSuccesProduct(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.error = false;
      state.productsList = action.payload;
    },

    addFavorites(state, action:PayloadAction<Product>) {
        state.favorites = [...state.favorites, action.payload]
    },
    
    removeFavorites(state, action:PayloadAction<Product[]>){
        state.favorites = action.payload
    },

    fetchFail(state) {
        state.loading = false;
        state.error = true;
      },

 
  },
});

export const { fetchStart, getSuccesProduct, addFavorites, removeFavorites,fetchFail } = productsSlice.actions;

export default productsSlice.reducer;
