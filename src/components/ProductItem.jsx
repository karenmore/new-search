// ProductItem.js
const ProductItem = ({ product, onDelete }) => {
    const handleDelete = () => {
      onDelete(product.id);
    };
  
    return (
      <li className="bg-gray-50 py-5 px-5 mb-5 shadow-md rounded-md">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p>{product.description}</p>
        <p>Principio Activo: {product.activeIngredient}</p>
        <p>Item: {product.item}</p>
        <p>UPC: {product.upc}</p>
        <p>Categoría: {product.categoryId}</p>
        <div className="flex justify-between my-5">
          <button
            type="button"
            className="py-2 px-10 bg-cyan-500 hover:bg-cyan-700 text-white uppercase font-bold rounded-lg"
            onClick={() => onUpdate(product)}
          >
            Editar
          </button>
          <button
            type="button"
            className="py-2 px-10 bg-red-500 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </li>
    );
  };
  
  export default ProductItem;  