import React, { useState, useEffect } from 'react';
import clientAxios from '../config/axios';

const FilterCategory = ({ selectedCategory, handleCategoryFilter }) => {
    const [categories, setCategories] = useState([]);

    //console.log(categories)
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const url = '/categories';
          const response = await clientAxios.get(url);
          //console.log(response.data)
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, []);
  
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
          Todas las categorías
        </div>
        {categories.map((category) => (
  <div
    key={category.id}
    className={`cursor-pointer px-7 py-2 rounded-md borde-2 ${
      selectedCategory === category.id
        ? 'bg-blue-700 text-white font-bold'
        : `bg-${category.color || 'gray'}-200 hover:bg-${category.color || 'gray'}-300`
    }`}
    onClick={() => handleCategoryFilter(category.id)}
  >
    {category.name}
  </div>
))}

      </div>
    );
  };
  
export default FilterCategory;