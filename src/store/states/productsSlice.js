// productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientAxios from '../../config/axios';

export const getProducts = createAsyncThunk('products/getProducts', async (_, { getState }) => {
  const { token } = getState().auth;
  console.log(token);
  if (!token) return [];

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await clientAxios.get('/products', config);
  return data;
});


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    selectedCategory: null,
  },
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredProducts = action.payload;
      });
  },
});

export const { setFilteredProducts, setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;