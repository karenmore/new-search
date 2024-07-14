import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser, signOff } from '../store/states/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import clientAxios from '../config/axios'

const Login = () => {
  const [employeeNumber, setEmployeeNumber] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const isValid = () => {
    return employeeNumber.trim() !== '' && password.trim() !== ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const { data } = await clientAxios.post('/employees/login', { employeeNumber, password })
  
      console.log(data)
  
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      await dispatch(authenticateUser()) // Llamar a authenticateUser después de guardar el token
      navigate('/products')
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
  

  return (
    <>
      <div>
        <form
          className="flex flex-col gap-2 py-10 px-5 shadow bg-gray-70 mx-auto max-w-lg mt-20 rounded-xl"
          onSubmit={handleSubmit}
        >
          <legend className="font-black text-3xl">Iniciar Sesión</legend>
          <div className="my-2">
            <label className="upprcase text-gray-600 block text-xl font-bold">
              Codigo
              <input
                type="text"
                placeholder="Codigo de Registro"
                className="borde-2 w-full p-2 mt-2 placeholder:-gray-400 rounded-md"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
              />
            </label>
          </div>
          <div className="my-2">
            <label className="upprcase text-gray-600 block text-xl font-bold">
              Contraseña
              <input
                type="password"
                placeholder="Tu contraseña"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-cyan-500 hover:bg-cyan-600 text-sm uppercase p-2 font-black text-white cursor-pointer disabled:opacity-10"
            disabled={!isValid()}
          />
        </form>
        <nav className="mt-10 lg:flx lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/forget-password">
            Olvide mi contraseña
          </Link>
          <Link className="block text-center my-5 text-gray-500" to="/register">
            Registrar una cuenta
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Login