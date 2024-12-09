import React from 'react'
import { vaciarCarrito } from '../../api/products.api'
import toast from 'react-hot-toast'
export  function NavigationCar() {

 const handleVaciarCarrito=async ()=>{
  const res= await vaciarCarrito(localStorage.getItem('user_id'))
  console.log(res)
  toast.success('carrito vaciado exitosamente', {

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
        <nav  className="bg-indigo-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
             <h2 className='text-xl font-bold'>Tu Carrito de Compras</h2>
             <div>

             </div>
             <div>

             </div>

             <div>
                Comprar
             </div>
             
             <button
             onClick={()=>{
              handleVaciarCarrito()
             }}
             >
                Vaciar Carrito
             </button>
             

            </div>
        </nav>
    </div>
  )
}
