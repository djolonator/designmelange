import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {Category} from '../types/models'




interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}


const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[], void>(
  'categories/fetchCategories',
  async () => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/categories');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return (json) as Category[];
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default categoriesSlice.reducer;