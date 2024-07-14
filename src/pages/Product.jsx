// Product.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, setFilteredProducts, setSelectedCategory } from '../store/states/productsSlice';
import ListProducts from '../components/ListProducts';
import FilterName from '../components/FilterName';
import FilterCategory from '../components/FilterCategory';

const Product = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, selectedCategory } = useSelector((state) => state.products);
  console.log(products)

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleNameFilter = (searchTerm) => {
    let filtered;

    if (!isNaN(searchTerm)) {
      filtered = products.filter((product) =>
        product.item.toString().includes(searchTerm)
      );
    } else if (products.some((product) => {
      const ingredients = product.activeIngredient.toLowerCase().split(',');
      return ingredients.some((ingredient) => ingredient.trim().includes(searchTerm.toLowerCase()));
    })) {
      filtered = products.filter((product) => {
        const ingredients = product.activeIngredient.toLowerCase().split(',');
        return ingredients.some((ingredient) => ingredient.trim().includes(searchTerm.toLowerCase()));
      });
    } else {
      filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    dispatch(setFilteredProducts(filtered));
  };

  const handleCategoryFilter = (id) => {
    dispatch(setSelectedCategory(id));
    if (id === 'todas las categorias') {
      dispatch(setFilteredProducts(products));
    } else {
      const filtered = products.filter((product) =>
        product.category.id === id
      );
      dispatch(setFilteredProducts(filtered));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <FilterCategory
          selectedCategory={selectedCategory}
          handleCategoryFilter={handleCategoryFilter}
        />
      </div>
      <FilterName setNameInput={handleNameFilter} />
      <ListProducts products={filteredProducts} />
    </>
  );
};

export default Product;