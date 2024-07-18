import React, { useState, useEffect } from 'react';
import clientAxios from '../config/axios';

const FilterCategory = ({ selectedCategory, handleCategoryFilter }) => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderedCategories, setOrderedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = '/categories';
        const response = await clientAxios.get(url);
        setCategories(response.data);
        setOrderedCategories(response.data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container mx-auto flex flex-wrap justify-center gap-4 mt-2 mb-2">
      <div
        className={`cursor-pointer px-7 py-2 rounded-md ${
          selectedCategory === 'todas las categorias'
            ? 'bg-blue-700 text-white font-bold'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => handleCategoryFilter('todas las categorias')}
      >
        Todas los productos
      </div>
      <button className="px-7 py-2 rounded-md bg-blue-700 text-white font-bold" onClick={toggleModal}>
        Categorías
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Categorías</h2>
            <div className="max-h-[400px] overflow-y-auto">
              {orderedCategories.map((category) => (
                <div
                  key={category.id}
                  className={`cursor-pointer px-7 py-2 rounded-md borde-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-700 text-white font-bold'
                      : `bg-${category.color || 'gray'}-200 hover:bg-${category.color || 'gray'}-300`
                  }`}
                  onClick={() => {
                    handleCategoryFilter(category.id);
                    toggleModal();
                  }}
                >
                  {category.name}
                </div>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              onClick={toggleModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCategory;