import React, { useEffect } from "react";

import { productosMasVendidos } from "../../api/dashboard.api";
import { useState } from "react";
import { TableIndicadoresUsuario } from "./TableIndicadoresUsuario";
import { TableVentasDiarias } from "./TablaVentasDiarias";
import PiePago from "./PiePago";
import { BarrasProductosMasVendidos } from "./BarrasProductosMasVendidos";

import { TablaProductosMasVendidos } from "./TablaProductosMasVendidos";


export default function Dashboard() {

  const [data, setData] = useState([])

  useEffect(() => {
    async function loadProductosMasVendidos() {
      const res = await productosMasVendidos();
      setData(res.data)
      console.log(data)
    }
    loadProductosMasVendidos();

  }, [])

  // const data = [
  //   { category: "A", value: 30 },
  //   { category: "B", value: 80 },
  //   { category: "C", value: 45 },
  //   { category: "D", value: 60 },
  //   { category: "E", value: 20 },
  // ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-500">Dash Board</h2>
      <div className="grid grid-cosl-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* PRODUCTOS MAS VENDIDOS */}

        <div className="bg-white shadow-md rounded px-4 py-6">
          <TablaProductosMasVendidos />
        </div>
        {/* INDICADORES USUARIO */}
        <div className="bg-white shadow-md rounded px-4 py-6">

          <TableIndicadoresUsuario />


        </div>
        {/* VENTAS DIARIAS */}

        <div className="bg-white shadow-md rounded px-4 py-6">
          <TableVentasDiarias />
        </div>



        <div className="shadow-md r0ouded px-4 py-6">
          <h2 className="text-xl font-bold mb-2 text-gray-500">Productos Mas Vendidos</h2>
          
         <BarrasProductosMasVendidos/>

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


