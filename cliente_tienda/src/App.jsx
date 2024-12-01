import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProductPage } from './pages/ProductPage'
import { ProductFormPage } from './pages/ProductFormPage'
import { Navigation } from './components/Navigation'
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <BrowserRouter>
     <div className='container mx-auto'>

     <Navigation/>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product-create" element={<ProductFormPage />} />
        <Route path="/product-create/:id" element={<ProductFormPage/>}/>
        <Route path="/products/:id" element={<ProductPage/>}/>
      </Routes>
      <Toaster/>
     </div>

    </BrowserRouter>
  )
}

export default App