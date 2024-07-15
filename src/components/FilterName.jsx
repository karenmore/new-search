import { useRef } from "react";

const FilterName = ({ setNameInput }) => {
  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameInput(inputSearch.current.value.trim().toLowerCase());
    inputSearch.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 flex justify-center items-center">
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      <input
        ref={inputSearch}
        type="text"
        placeholder="Buscar por nombre..."
        className="w-full focus:outline-none"
      />
      <button
        type="submit"
        className=" bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-bold"
      >
        Buscar
      </button>
      </div>
    </form>
  );
};

export default FilterName;