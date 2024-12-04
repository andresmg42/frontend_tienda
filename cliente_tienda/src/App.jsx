import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProductPage } from './pages/products/ProductPage'
import { ProductFormPage } from './pages/products/ProductFormPage'
import {Toaster} from "react-hot-toast"
import { UserPage } from './pages/users/UserPage'
import { UserFormPage } from './pages/users/UserFormPage'
import { LoginFormPage } from './pages/login/LoginFormPage'

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
       
      </Routes>
      <Toaster/>
     

    </BrowserRouter>
  )
}

export default App