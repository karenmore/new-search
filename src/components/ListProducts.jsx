import React from 'react';

const ListProducts = ({ products }) => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-4xl font-bold mb-10 text-center">Buscador de Medicamentos</h2>

      {products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold mb-2">{product.name.charAt(0).toUpperCase() + product.name.substring(1)}</h3>
              <p className="text-gray-700 mb-3"><span className='text-lg font-bold'>Codigo:</span> {product.item}</p>
              <p className="text-gray-700 mb-3"><span className='text-lg font-bold'>Categoria: </span>{product.category.name.charAt(0).toUpperCase() + product.category.name.substring(1)}</p>
              <p className="text-gray-600 font-bold">Marca Comercial:</p>
              <ul className="list-disc pl-4">
                {product.activeIngredient.split(", ").map((componente) => (
                  <li key={componente}>{componente.charAt(0).toUpperCase() + componente.substring(1)}</li>
                ))}
              </ul>
              <p className="text-gray-700 mt-2"><span className='text-lg font-bold'>Precio: </span>{product.price}</p>
              {product.images.length > 0 ? (
          <img
              src={product.images[0].url.startsWith("http://") ? product.images[0].url.replace("http://", "https://") : product.images[0].url}
              alt="Descripción de la imagen"
              className="h-50 object-cover rounded-t-md"
          />
          ) : (
          <div className="h-50 bg-gray-200 rounded-t-md flex items-center justify-center">
          <p className="text-gray-500">Imagen no disponible</p>
          </div>
          )}
            </div>
          ))}
        </div>
      )}
      {products.length === 0 && <p>No se encontraron productos.</p>}
    </div>
  );
};

export default ListProducts;