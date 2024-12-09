import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProductPage } from './pages/products/ProductPage'
import { ProductFormPage } from './pages/products/ProductFormPage'
import {Toaster} from "react-hot-toast"
import { UserPage } from './pages/users/UserPage'
import { UserFormPage } from './pages/users/UserFormPage'
import { LoginFormPage } from './pages/login/LoginFormPage'
import {Register} from './components/login/Register';
import {EmailVerification} from './components/login/EmailVerification';
import {ClientPage} from './pages/cliente/ClientPage'
import { PedidosPage } from './pages/pedidos/PedidosPage'
import { PedidosProductosPage } from './pages/pedidos/PedidosProductosPage'
import { CategoriaPage } from './pages/categoria/CategoriaPage'
import { CategoriaProductoPage } from './pages/categoria/CategoriaProductoPage'


function App() {
  return (
    <BrowserRouter>
    {/* <Navigation/> */}
     

     
      <Routes>

        {/* PRODUCTOS */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginFormPage/>}/>
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:criteria/:value" element={<ProductPage/>}/>
        <Route path="/product-create" element={<ProductFormPage />} />
        <Route path="/product-create/:id" element={<ProductFormPage/>}/>

        {/* USUARIOS */}
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/:criteria/:value" element={<UserPage/>}/>
        <Route path="/users-create" element={<UserFormPage />} />
        <Route path="/users-create/:id" element={<UserFormPage/>}/>

        {/* PEDIDOS */}
        <Route path="/pedidos" element={<PedidosPage />} />
        <Route path="/pedidosProductos/:id" element={<PedidosProductosPage/>}/>

        {/* CATEGORIA */}
        <Route path="/categorias" element={<CategoriaPage />} />
        <Route path="/categoriasProductos/:id" element={<CategoriaProductoPage/>}/>

        {/* CLIENTE */}
        <Route path="/client" element={<ClientPage />} />
        <Route path="/register-user" element={<Register />} />
        <Route 
          path="/verify_Email/:token" 
          element={<EmailVerification />} 
        />
       
      </Routes>
      <Toaster/>
     

    </BrowserRouter>
  )
}

export default App