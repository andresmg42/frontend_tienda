import React, { useEffect, useState } from 'react'
import { vaciarCarrito } from '../../api/products.api'
import toast from 'react-hot-toast'
import { searchUserProducts } from '../../api/products.api'
import { useNavigate } from 'react-router-dom'

export function NavigationCar({ total_global }) {

  const [hayProductos, setHayProductos] = useState(false)

  const navigate = useNavigate()


  useEffect(() => {
    async function loadCarrito() {
      const res = await searchUserProducts(localStorage.getItem('user_id'))
      if (res.data.length != 0) {
        console.log('retorno consulta carrito',res)
        setHayProductos(true)
      }

    }
    loadCarrito()

  }, [])


  const handleVaciarCarrito = async () => {

    const res = await vaciarCarrito(localStorage.getItem('user_id'))
    console.log(res)
    toast.success('carrito vaciado exitosamente', {

      position: "bottom-right",
      style: {
        background: "#101010",
        color: "#fff"
      }
    });



    setTimeout(() => {
      location.reload();
    }, 2000);


  }
  return (
    <div>
      <nav className="bg-indigo-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className='text-xl font-bold'>Tu Carrito de Compras</h2>
          <div>

          </div>
          <div>
            Total:{total_global}$
          </div>

          <button onClick={() => hayProductos ? navigate('/pasarela') :
            toast.success('No hay productos para comprar', {

              position: "top-right",
              style: {
                background: "#101010",
                color: "#fff"
              }
            })

          }>
            Comprar
          </button>

          <button
            onClick={() => {
              handleVaciarCarrito()
            }}
          >
            Vaciar Carrito
          </button>


        </div>
      </nav >
    </div >
  )
}
