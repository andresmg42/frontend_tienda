
import { CarritoList } from "../../components/cliente/CarritoList"
import { useParams } from "react-router-dom"
import { Navigation } from '../../components/cliente/Navigation'
import { NavigationCar } from "../../components/cliente/NavigationCar";
export function CarritoPage() {
  const params = useParams(); // Obtén todos los parámetros como un objeto
  const { id } = params;
  console.log("este es el parametro",id)
  return (
    <div>
      
      <NavigationCar/>
      <div className='container mx-auto mt-4'><CarritoList searchValue={id}></CarritoList></div>

    </div>

  )
}