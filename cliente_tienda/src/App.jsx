import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProductPage } from './pages/products/ProductPage'
import { ProductFormPage } from './pages/products/ProductFormPage'
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <BrowserRouter>
    {/* <Navigation/> */}
     

     
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductPage />} />
       
        {/* <Route path="/products/:id" element={<ProductPage/>}/> */}
        <Route path="/products/:criteria/:value" element={<ProductPage/>}/>
        <Route path="/product-create" element={<ProductFormPage />} />
        <Route path="/product-create/:id" element={<ProductFormPage/>}/>
       
      </Routes>
      <Toaster/>
     

    </BrowserRouter>
  )
}

export default App