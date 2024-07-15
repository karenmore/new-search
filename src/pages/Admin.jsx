import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../store/states/productSlice';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const Admin = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  console.log(product)
  const [disaibleFrom, setDisaibleFrom] = useState(false);

  const handleSubmit = (newProduct) => {
    dispatch(createProduct(newProduct));
  };

  const handleUpdate = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
  };

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-cyan-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
        onClick={() => setDisaibleFrom(!disaibleFrom)}
      >
        {disaibleFrom ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>
      <div className={`${disaibleFrom ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>

      </div>

      <div className="md:w-1/2 lg:w-3/5">

      </div>
    </div>
  );
};

export default Admin;