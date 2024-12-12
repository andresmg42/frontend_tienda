
import { CarritoList } from "../../components/cliente/CarritoList"
import { useParams } from "react-router-dom"
import { Navigation } from '../../components/cliente/Navigation'
import { NavigationCar } from "../../components/cliente/NavigationCar";
import { useEffect, useState } from "react";
import { searchUserProducts } from "../../api/products.api";
export function CarritoPage() {
  const params = useParams(); // Obtén todos los parámetros como un objeto
  const { id } = params;
  const [total,setTotal]=useState(0)

  useEffect(()=>{
   async function loadUserProducts(){
    try {
      const res=await searchUserProducts(localStorage.getItem('user_id'))

      const products=res.data
      const total=products.reduce((acumulador,producto)=>acumulador+(producto.cantidad_user_producto*producto.precio),0)
      setTotal(total)
      
    } catch (error) {
      console.log('Error al consultar los productos del usaurio',error)
    }
   }
   loadUserProducts()
  },[])

  
 
  return (
    <div>
      
      <NavigationCar total_global={total}/>
      <div className='container mx-auto mt-4'><CarritoList set_total={setTotal} Total={total} searchValue={id}></CarritoList></div>

    </div>

  )
}