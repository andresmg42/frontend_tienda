import React, { useEffect } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { productosMasVendidos } from "../../api/dashboard.api";
import { useState } from "react";


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
        <div className="shadow-md rouded px-4 py-6">
          <h2 className="text-xl font-bold mb-2 text-gray-500">Productos Mas Vendidos</h2>
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            {/* Eje X */}
            <VictoryAxis
              style={{
                axis: { stroke: "#756f6a" },
                ticks: { stroke: "#756f6a" },
                tickLabels: { fontSize: 12, padding: 5 },
              }}
            />
            {/* Eje Y */}
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: "#756f6a" },
                grid: { stroke: "gray", strokeDasharray: "4, 4" },
                tickLabels: { fontSize: 12, padding: 5 },
              }}
            />
            {/* Gráfico de barras */}
            <VictoryBar
              data={data}
              x="nombre"
              y="total_vendidos"
              style={{
                data: { fill: "#c43a31", width: 20 },
              }}
            />
          </VictoryChart>


        </div>


      </div>

    </div>
  );
};


