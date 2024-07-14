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
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
      <input
        ref={inputSearch}
        type="text"
        placeholder="Buscar por nombre..."
        className="w-full focus:outline-none"
      />
      <button
        type="submit"
        className=" bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-700 font-bold"
      >
        Buscar
      </button>
      </div>
    </form>
  );
};

export default FilterName;