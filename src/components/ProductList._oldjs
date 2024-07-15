// src/components/ProductList.js
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, saveProduct, deleteProduct, setSelectedProduct } from '../store/productsSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, selectedProduct } = useSelector((state) => state.products);

  // Usa los actions de productsSlice para manejar los productos
  dispatch(getProducts());
  dispatch(saveProduct(newProduct));
  dispatch(deleteProduct(productId));
  dispatch(setSelectedProduct(product));
};