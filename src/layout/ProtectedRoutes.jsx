import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { authenticateUser } from '../store/states/authSlice'; // Importa la acción de autenticación
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProtectedRoutes = () => {
  const { user, token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticateUser()); // Llama a la acción de autenticación
  }, [dispatch]);

  if (loading) return <div>Cargando...</div>;

  return user?.id ? (
    <>
      <Header />
      <main className="container mx-auto mt-10">
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;