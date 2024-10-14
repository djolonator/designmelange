import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer, 
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;