import React, { useEffect } from "react";

import { productosMasVendidos } from "../../api/dashboard.api";
import { useState } from "react";
import { TableIndicadoresUsuario } from "./TableIndicadoresUsuario";
import { TableVentasDiarias } from "./TablaVentasDiarias";
import PiePago from "./PiePago";
import { BarrasProductosMasVendidos } from "./BarrasProductosMasVendidos";

import { TablaProductosMasVendidos } from "./TablaProductosMasVendidos";
import LineasVentasDiarias from "./LineasVentasDiarias";



export default function Dashboard() {

 
  const[selectedRows,setSelectedRows]=useState([])
  const [data, setData] = useState([])

  // const[dataBar,setDataBar]=useState([])

  useEffect(() => {
    async function loadProductosMasVendidos() {
      const res = await productosMasVendidos();
      setData(res.data)
      setSelectedRows(res.data)
      console.log(data)
    }
    loadProductosMasVendidos();

  }, [])

  

  // if(selectedRows.length!=0){
  //   setDataBar(selectedRows)
  // }else{
  //   setDataBar(data)
  // }



  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-500">Dash Board</h2>
      <div className="grid grid-cosl-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* PRODUCTOS MAS VENDIDOS */}

        <div className="bg-white shadow-md rounded px-4 py-6">
          <TablaProductosMasVendidos setSelectedRows={setSelectedRows} />
        </div>
        {/* INDICADORES USUARIO */}
        <div className="bg-white shadow-md rounded px-4 py-6">

          <TableIndicadoresUsuario />


        </div>
        {/* VENTAS DIARIAS */}

        <div className="bg-white shadow-md rounded px-4 py-6">
          <TableVentasDiarias />
        </div>



        <div className="shadow-md rounded px-4 py-6">
          <h2 className="text-xl font-bold mb-2 text-gray-500">Productos Mas Vendidos</h2>
          
         <BarrasProductosMasVendidos selectedRows={selectedRows}/>

        </div>




        {/* PIE METODOS PAGO MAS UTILIZADOS */}

        <div className="bg-white shadow-md rounded px-4 py-6">
        <h2 className="text-xl font-bold mb-2 text-gray-500">Metodos de Pago Mas Usados</h2>

          <PiePago />

        </div>

        {/* GRAFICA DE LINEAS DE VENTAS DIARIAS */}
        
        <div className="bg-white shadow-md rounded px-4 py-6">
        <h2 className="text-xl font-bold mb-2 text-gray-500">Ventas Diarias</h2>

          <LineasVentasDiarias/>

        </div>




      </div>

    </div>
  );
};


