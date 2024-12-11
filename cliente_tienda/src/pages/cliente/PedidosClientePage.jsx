import React, { useEffect, useState } from 'react'

import { searchUserProducts } from '../../api/products.api';

import Bancos from '../../components/cliente/metodos_pago/Bancos'
import Targetas from '../../components/cliente/metodos_pago/Targetas';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';



export default function PedidosClientePage() {


  const [userProducts, setUserProducts] = useState([]);

  const [Transferencia, setTransferencia] = useState(false)
  const [Targeta, setTargeta] = useState(false)

  
  const navigate=useNavigate()
 

  useEffect(() => {
    async function loadUserProducts() {
      try {
        const res = await searchUserProducts(localStorage.getItem('user_id'))
        setUserProducts(res.data)
      } catch (error) {
        console.log('error al cargar los productos del usuario en PedidosClientePage', error)
      }

    };
    loadUserProducts()

  }, [])


  const [formData, setFormData] = useState({
    direccion: "",
    metodo_pago: "Transferencia bancaria",
    usuarios: parseInt(localStorage.getItem('user_id')),
    estado_pedido: false,



  });

  const guardarDatosEfecty=()=>{
    
  }

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (formData.metodo_pago) {
      case 'Targeta de credito': setTargeta(true); setTransferencia(false); 
        break;
      case 'efecty': 
      authService.HacerCompra(formData,userProducts);
      setTargeta(false); 
      setTransferencia(false); 
      window.open('https://www.efectyvirtual.com/PortalEcommerce/Account/Login?Geolocalizacion=%2F%2F'); navigate('/client'); 
      break;
      default: setTransferencia(true); setTargeta(false); 





    }
  }

  

  return (
    <div className='max-w-xl mx-auto mt-10'>
      <h2 className='text-lx font-bold text-black'>Informacion de Pago</h2>
      <form className='mt-3' onSubmit={handleSubmit}>


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
          <option value="efecty">Efecty</option>


        </select>

        <button
          className='bg-indigo-500 p-3 rounded-lg w-48 hover:bg-green-700 hover:cursor-pointer transition duration-300'
          type='submit'
        >
          Siguiente

        </button>


      </form>

      {Transferencia && (<Bancos userP={userProducts} formD={formData} />)}
      {Targeta && (<Targetas userP={userProducts} formD={formData} />)}
     
     <img src="" alt="" />

    </div>
  )
}
