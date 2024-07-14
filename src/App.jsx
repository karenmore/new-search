import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Product from "./pages/Product";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div>
      <Routes>
        
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<Login />}/>
      </Route>

      <Route path='/products' element={<ProtectedRoutes />}>
            <Route index element={<Product />} />
      </Route>

      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
