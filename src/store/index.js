import { configureStore } from '@reduxjs/toolkit';
import authReducer from './states/authSlice';
import productsReducer from './states/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export default store;