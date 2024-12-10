import React, { useEffect, useState } from 'react'

import { searchUserProducts } from '../../api/products.api';

import Bancos from '../../components/cliente/metodos_pago/Bancos'

export default function PedidosClientePage() {


  const [userProducts, setUserProducts] = useState([]);

  const [Transferencia, setTransferencia] = useState(false)
  const [Targeta, setTargeta] = useState(false)
  const [pse, setPse] = useState(false)
  const [Recaudo, setRecaudo] = useState(false)
  const [contraEntrega, setContraEntrega] = useState(false)



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

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (formData.metodo_pago) {
      case 'Targeta de credito': setTargeta(true);
        break;
      case 'Redes de Recaudo': setRecaudo(true);
        break;
      case 'pago Electronico': setPse(true);
        break;
      case 'pago Contraentrega': setContraEntrega(true);
        break;
      default: setTransferencia(true)





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
          <option value="Redes de Recaudo">Redes de Recaudo</option>
          <option value="pago Contraentrega">Pago Contraentrega</option>
          <option value="pago Electronico">Pago PSE</option>


        </select>

        <button
          className='bg-indigo-500 p-3 rounded-lg w-48 hover:bg-green-700 hover:cursor-pointer transition duration-300'
          type='submit'
        >
          Siguiente

        </button>


      </form>

      {Transferencia && (<Bancos userP={userProducts} formD={formData} />)}

    </div>
  )
}
