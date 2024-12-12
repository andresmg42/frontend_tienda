import React from 'react'
import { searchUserProducts, vaciarCarrito } from '../../api/products.api'
import toast from 'react-hot-toast'
import { useState,useEffect } from 'react'
import {ShoppingCart} from 'lucide-react'
import { useNavigate } from "react-router-dom";


export function NavigationCar({total_global}) {

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/client");
  };

 
const handleVaciarCarrito=async ()=>{



  

  const res= await vaciarCarrito(localStorage.getItem('user_id'))
  console.log(res)
  toast.success('Carrito vaciado exitosamente', {

    position: "bottom-right",
    style: {
        background: "#101010",
        color: "#fff"
    }
});



setTimeout(() => {
  location.reload(); // Recarga la página
}, 2000); 


// window.location.reload()
 }


 
  return (
    
    <div>
        <nav className="bg-[#0FA0CC] text-white p-5">
          
            <div className="container mx-auto flex justify-between items-left">
            <div className="flex items-center">
            <button
              className="p-1 text-white-1000 hover:text-gray-900 transition duration-300 flex items-center"
              onClick={handleBackClick}
            >
              <svg
                className="w-6 h-6  ml-[-50px]" 
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="ml-31">Back</span>
            </button>
          </div>

             <ShoppingCart size={24} />
             <h2 className='text-xl font-bold ml-[-250px]' >Tu carrito de compras</h2>
             <div>
             <div className="flex space-x-4">
            <button className="text-xl font-bold text-white hover:scale-110 transition duration-300 ease-in-out">Comprar</button>
          </div>

             </div>
             

             
             
             <button className="text-xl font-bold text-white hover:text-red-600 hover:scale-110 
             transition duration-300 ease-in-out"
             
             onClick={()=>{
              handleVaciarCarrito()
             }}
             >
                Vaciar carrito
             </button>
             

            </div>
        </nav>
    </div>
  )
}
