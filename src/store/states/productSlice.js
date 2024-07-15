// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientAxios from '../../config/axios';
import { toast } from 'react-toastify';

export const getProducts = createAsyncThunk('product/getProducts', async () => {
  try {
    const token = localStorage.getItem('token');
    //console.log(token)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await clientAxios.get('/products', config);
    console.log(data)
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    throw error;
  }
});

export const createProduct = createAsyncThunk('product/createProduct', async (newProduct) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await clientAxios.post('/products', newProduct, config);
    toast.success('Producto creado exitosamente');
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    throw error;
  }
});

export const updateProduct = createAsyncThunk('product/updateProduct', async (updatedProduct) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await clientAxios.put(`/products/${updatedProduct.id}`, updatedProduct, config);
    toast.success('Producto actualizado exitosamente');
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    throw error;
  }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await clientAxios.delete(`/products/${id}`, config);
    toast.success('Producto eliminado exitosamente');
    return id;
  } catch (error) {
    toast.error(error.response.data.msg);
    throw error;
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    //products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.product.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = state.product.map((p) => (p.id === action.payload.id ? action.payload : p));
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = state.product.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;