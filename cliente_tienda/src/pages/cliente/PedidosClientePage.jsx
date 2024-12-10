import React, { useEffect , useState} from 'react'
import { createPedido, llenarPedidosProductos } from '../../api/pedidos.api';
import { searchUserProducts } from '../../api/products.api';
import { createPedidosProductos } from '../../api/pedidos.api';

export default function PedidosClientePage() {

 
const [userProducts,setUserProducts]=useState([]);
 

 

  useEffect(()=>{
   async function loadUserProducts(){
    try {
      const res= await searchUserProducts(localStorage.getItem('user_id'))
      setUserProducts(res.data)
    } catch (error) {
      console.log('error al cargar los productos del usuario en PedidosClientePage',error)
    }

   };
   loadUserProducts()

  },[])


  const [formData, setFormData]=useState({
    direccion:"",
    metodo_pago:"Transferencia bancaria",
    usuarios:parseInt( localStorage.getItem('user_id')),
    estado_pedido:false,

    

  });

  const handleChange=(e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    });
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();

    try {
      const res_pedido= await createPedido(formData)

      const lista=userProducts.map((product)=>{
        return {
          cantidad_producto_carrito:product.cantidad_user_producto,
          pedido_ppid:res_pedido.data.id,
          producto_ppid:product.id
  
        }

        
        
      })
      
      console.log(lista)
      try {
        const res2=await llenarPedidosProductos(lista)
        console.log('esto es lo que retorna llenar tabla',res2.data)
      } catch (error) {
        console.error('error la llenarPedidosProduct',error)
      }

      
      
   
      
      
      
    } catch (error) {
      console.log('error al crear Pedido',error)
    }

   
    
   
  }

  return (
    <div className='max-w-xl mx-auto mt-10'>
      <h2 className='text-lx font-bold text-black'>Informacion de Pago</h2>
      <form className='mt-3'onSubmit={handleSubmit}>


      <input type="text"
      className='bg-gray-200 text-black p-3 rounded-lg block w-full mb-3'
      name="direccion"
      placeholder="Direccion"
      value={formData.direccion}
      onChange={handleChange}


      />

     <select type="text"
      
      className='bg-gray-200 text-black p-3 rounded-lg block w-full mb-3'
      name="metodo_pago"
      value={formData.metodo_pago}
      onChange={handleChange}

      >
        <option value="Transferencia bancaria"> Transeferecia Bancaria</option>
        <option value="Targeta de credito">Targeta de Credito</option>
        <option value="Redes de Recaudo">Redes de Recaudo</option>
        <option value="pago Contraentrega">Pago Contraentrega</option>
        <option value="pago Electronico">Pago PSE</option>


     </select>

<button
className='bg-indigo-500 p-3 rounded-lg w-48 hover:bg-green-700 hover:cursor-pointer transition duration-300'
>
Siguiente

</button>


      </form>

    </div>
  )
}
