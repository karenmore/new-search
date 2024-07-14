import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOff } from "../store/states/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSignOff = () => {
    dispatch(signOff());
  };

  return (
    <header className="py-10 bg-cyan-500">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <Link
          to="/products"
          className="font-bold text-3xl text-cyan-200 text-center"
        >
          Buscador de{" "}
          <span className="text-white font-black">Medicamentos</span>
        </Link>

        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
          {user?.role === "ADMINISTRADOR" && (
            <Link
              to="/products/admin"
              className="text-white text-sm uppercase font-bold"
            >
              Admin
            </Link>
          )}

          <button
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={handleSignOff}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;