import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../store/states/productSlice';


const ProductForm = ({ onSubmit, onUpdate }) => {
  
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  console.log(product)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [activeIngredient, setActiveIngredient] = useState('');
  const [item, setItem] = useState('');
  const [upc, setUpc] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setActiveIngredient(product.activeIngredient);
      setItem(product.item);
      setUpc(product.upc);
      setCategoryId(product.categoryId);
      setId(product.id);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, description, activeIngredient, item, upc, categoryId, id };
    if (id) {
      onUpdate(newProduct);
    } else {
      onSubmit(newProduct);
    }
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setActiveIngredient('');
    setItem('');
    setUpc('');
    setCategoryId('');
    setId(null);
  };

  const isValid = () => {
    return name !== '' && description !== '' && activeIngredient !== '';
  };

  return (
    <>
      <p className="text-center mb-10 font-black text-3xl">
        Crea un nuevo producto o edita su informacion
      </p>

      <form
        className="bg-gray-50 py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label className="upprcase text-gray-600 block text-xl font-bold">
            Nombre del Producto
          </label>
          <input
            type="text"
            placeholder="Nombre del Producto"
            className="borde-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold">
            Descriptcion del Producto
          </label>
          <input
            type="text"
            placeholder="Description del Producto"
            className="borde-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold">
            Marca Comercial
          </label>
          <input
            type="text"
            placeholder="Principio Activo del producto"
            className="borde-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md"
            value={activeIngredient}
            onChange={(e) => setActiveIngredient(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold">
            ITEM / SKU del Producto
          </label>
          <input
            type="text"
            placeholder="Item del producto"
            className="borde-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold">
            UPC del Producto
          </label>
          <input
            type="text"
            placeholder="UPC del producto"
            className="borde-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md"
            value={upc}
            onChange={(e) => setUpc(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold">
            Categoria del Producto
          </label>
          <input
            type="text"
            placeholder="Categoria del producto"
            className="borde-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value={id ? 'Guardar Cambios' : 'Crear Producto'}
          className="bg-cyan-500 w-full hover:bg-cyan-600 text-sm uppercase p-2 font-black text-white cursor-pointer disabled:opacity-10"
          disabled={!isValid()}
        />
      </form>
    </>
  );
};

export default ProductForm;