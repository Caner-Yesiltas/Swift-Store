import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'


interface ProductsState {
  value: number
}


const initialState: ProductsState = {
  value: 0,
}

export const productsSlice = createSlice({
  name: 'products',

  initialState,
  reducers: {
    
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = productsSlice.actions


export const selectCount = (state: RootState) => state.products.value

export default productsSlice.reducer