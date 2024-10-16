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
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.designId === action.payload.designId && item.dimensionId === action.payload.dimensionId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ designId: number; dimensionId: number }>) => {
      state.items = state.items.filter(
        item => item.designId !== action.payload.designId || item.dimensionId !== action.payload.dimensionId
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    addQuantityToItemInCart: (state, action: PayloadAction<{ designId: number; dimensionId: number; }>) => {
      const existingItem = state.items.find(
        item => item.designId === action.payload.designId && item.dimensionId === action.payload.dimensionId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    removeQuantityFromItemInCart: (state, action: PayloadAction<{ designId: number; dimensionId: number; }>) => {
      const existingItem = state.items.find(
        item => item.designId === action.payload.designId && item.dimensionId === action.payload.dimensionId
      );
      if (existingItem && existingItem.quantity !== 1) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            item => item.designId !== existingItem.designId || item.dimensionId !== existingItem.dimensionId
          );
        }
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, addQuantityToItemInCart, removeQuantityFromItemInCart } = cartSlice.actions;
export default cartSlice.reducer;





// const handleClearCart = () => {
//   dispatch(clearCart());
// };