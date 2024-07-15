import { configureStore } from '@reduxjs/toolkit';
import authReducer from './states/authSlice';
import productsReducer from './states/productsSlice';
import productReducer from './states/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    product: productReducer
  },
});

export default store;