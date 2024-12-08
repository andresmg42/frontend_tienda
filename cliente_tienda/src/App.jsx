import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProductPage } from './pages/products/ProductPage'
import { ProductFormPage } from './pages/products/ProductFormPage'
import { Toaster } from "react-hot-toast"
import { UserPage } from './pages/users/UserPage'
import { UserFormPage } from './pages/users/UserFormPage'
import { LoginFormPage } from './pages/login/LoginFormPage'
import { Register } from './components/login/Register';
import { EmailVerification } from './components/login/EmailVerification';
import { ClientPage } from './pages/cliente/ClientPage'
import { CarritoPage } from './pages/cliente/CarritoPage'
import ProtectedRoute from './pages/login/ProtectedRoute'
import { useEffect, useState } from 'react'

function App() {
  //const [isAutenticated, setIsAutenticated] = useState(() => localStorage.getItem('IsAutenticated') === 'true');
 
  return (
    <BrowserRouter>
      {/* <Navigation/> */}



      <Routes>

        {/* ruta publica */}

        <Route path='/login' element={<LoginFormPage/>} />

        {/* PRODUCTOS */}
        <Route path="/" element={<Navigate to="/client" />} />



        {/* USUARIOS */}


        {/* CLIENTE */}
        <Route path="/client" element={<ClientPage />} />
        <Route path="/client/:criteria/:value" element={<ClientPage/>}/>
        <Route path="/register-user" element={<Register />} />
        <Route
          path="/verify_Email/:token"
          element={<EmailVerification />}
        />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:criteria/:value" element={<ProductPage />} />



        {/* rutas privadas */}

        <Route element={<ProtectedRoute />}>



          <Route path='/carrito' element={<CarritoPage />} />
          <Route path='/carrito/:id' element={<CarritoPage />} />

          
          <Route path="/product-create" element={<ProductFormPage />} />
          <Route path="/product-create/:id" element={<ProductFormPage />} />

          <Route path="/users" element={<UserPage />} />
          <Route path="/users/:criteria/:value" element={<UserPage />} />
          <Route path="/users-create" element={<UserFormPage />} />
          <Route path="/users-create/:id" element={<UserFormPage />} />



        </Route>

      </Routes>
      <Toaster />


    </BrowserRouter>
  )
}

export default App