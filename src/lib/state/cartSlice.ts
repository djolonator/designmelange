import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/models';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.designId === action.payload.designId && item.dimensionId === action.payload.dimensionId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ designId: number; dimensionId: number }>) => {
      state.items = state.items.filter(
        item => item.designId !== action.payload.designId || item.dimensionId !== action.payload.dimensionId
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    addQuantity: (state, action: PayloadAction<{ designId: number; dimensionId: number; quantity: number }>) => {
      const existingItem = state.items.find(
        item => item.designId === action.payload.designId && item.dimensionId === action.payload.dimensionId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      }
    },
    removeQuantity: (state, action: PayloadAction<{ designId: number; dimensionId: number; quantity: number }>) => {
      const existingItem = state.items.find(
        item => item.designId === action.payload.designId && item.dimensionId === action.payload.dimensionId
      );
      if (existingItem) {
        existingItem.quantity -= action.payload.quantity;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            item => item.designId !== existingItem.designId || item.dimensionId !== existingItem.dimensionId
          );
        }
      }
    },
  },
});

export const { addItem, removeItem, clearCart, addQuantity, removeQuantity } = cartSlice.actions;
export default cartSlice.reducer;