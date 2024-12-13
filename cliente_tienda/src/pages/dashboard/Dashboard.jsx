import React, { useEffect } from "react";

import { indicadoresUsuario, productosMasVendidos, valorTotalVentas } from "../../api/dashboard.api";
import { useState } from "react";
import { TableIndicadoresUsuario } from "./TableIndicadoresUsuario";
import { TableVentasDiarias } from "./TablaVentasDiarias";
import PiePago from "./PiePago";
import { BarrasProductosMasVendidos } from "./BarrasProductosMasVendidos";
import {BarrasIndicadoresUsuarios} from "./BarrasIndicadoresUsuarios"

import { TablaProductosMasVendidos } from "./TablaProductosMasVendidos";
import LineasVentasDiarias from "./LineasVentasDiarias";



export default function Dashboard() {

 
  const[selectedRows,setSelectedRows]=useState([])
  const[selectedRowsIndicadores,setSelectedRowsIndicadores]=useState([])
  const [data, setData] = useState([])
  const [total_ventas, setTotalVentas] = useState(0)


  useEffect(() => {
    async function loadProductosMasVendidos() {
      const res = await productosMasVendidos();
      const res2= await valorTotalVentas();
      const res3=await indicadoresUsuario();
      setData(res.data)
      setSelectedRows(res.data)
      setTotalVentas(res2.data.total_ventas)

      //procesar datos indicadores

      const newIndicadores=res3.data.length!=0?res3.data.map(json=>(
        {
          'nombre':json.usuarios__username,
          'total_pedidos':json.total_pedidos 
        
        })):[]

      setSelectedRowsIndicadores(newIndicadores)
    
      
    }
    loadProductosMasVendidos();

  }, [])

  



  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-500">Dash Board</h2>
      <div className="text-xl text-gray-500">Total Ingresos: {total_ventas}</div>
      <div className="grid grid-cosl-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* PRODUCTOS MAS VENDIDOS */}

        <div className="bg-white shadow-md rounded px-4 py-6">
          <TablaProductosMasVendidos setSelectedRows={setSelectedRows} />
        </div>
        {/* INDICADORES USUARIO */}
        <div className="bg-white shadow-md rounded px-4 py-6">

          <TableIndicadoresUsuario setSelectedRowsIndicadores={setSelectedRowsIndicadores} />


        </div>
        {/* VENTAS DIARIAS */}

        <div className="bg-white shadow-md rounded px-4 py-6">
          <TableVentasDiarias />
        </div>



        <div className="shadow-md rounded px-4 py-6">
          <h2 className="text-xl font-bold mb-2 text-gray-500">Productos Mas Vendidos</h2>
          
         <BarrasProductosMasVendidos selectedRows={selectedRows}/>

        </div>
        
        <div className="shadow-md rounded px-4 py-6">
          <h2 className="text-xl font-bold mb-2 text-gray-500">Productos Mas Vendidos</h2>
          
         <BarrasIndicadoresUsuarios selectedRowsIndicadores={selectedRowsIndicadores}/>

        </div>

        {/* GRAFICA DE LINEAS DE VENTAS DIARIAS */}
        
        <div className="bg-white shadow-md rounded px-4 py-6">
        <h2 className="text-xl font-bold mb-2 text-gray-500">Ventas Diarias</h2>

          <LineasVentasDiarias/>

        </div>


        {/* PIE METODOS PAGO MAS UTILIZADOS */}

        <div className="bg-white shadow-md rounded px-4 py-6">
        <h2 className="text-xl font-bold mb-2 text-gray-500">Metodos de Pago Mas Usados</h2>

          <PiePago />

        </div>








      </div>

    </div>
  );
};


