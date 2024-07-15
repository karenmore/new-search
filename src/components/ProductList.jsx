import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/states/productSlice';
import ProductItem from './ProductItem';

const ProductList = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  console.log(product)

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los productos: {error}</div>;
  }

  return (
    <>
      <h2 className="font-black text-3xl text-center">Listado de productos existentes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        <span>Consulta y edita los productos de tu catálogo</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {product.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </>
  );
};

export default ProductList;