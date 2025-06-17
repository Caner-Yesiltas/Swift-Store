import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/models';


interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductsState {
  loading: boolean;
  error: boolean;
  favorites: Product[];
  productsList: Product[];
  cart: CartItem[];  
  quantities: {[key: string]: number}; 
}

const initialState: ProductsState = {
  loading: false,
  error: false,
  favorites: [],
  productsList: [],
  cart: [],  
  quantities: {}, 
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

    updateQuantity(state, action: PayloadAction<{id: string, quantity: number}>) {
      const { id, quantity } = action.payload;
      state.quantities[id] = Math.max(1, quantity);
    },

addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const quantity = state.quantities[product.id] || 1;
      
      const existingItem = state.cart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
    },



      clearCart(state) {
      state.cart = [];
      state.quantities = {};
    },


    removeFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.product.id !== productId);
      delete state.quantities[productId];
    },


    fetchFail(state) {
        state.loading = false;
        state.error = true;
      },

 
  },
});

export const { fetchStart, getSuccesProduct, addFavorites, removeFavorites, fetchFail, updateQuantity, addToCart, clearCart,  removeFromCart   } = productsSlice.actions;

export default productsSlice.reducer;
