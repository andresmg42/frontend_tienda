import React from 'react'
import { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { productosMasVendidos } from '../../api/dashboard.api';
export function BarrasProductosMasVendidos() {
    const [data, setData] = useState([])

  useEffect(() => {
    async function loadProductosMasVendidos() {
      const res = await productosMasVendidos();
      setData(res.data)
      
    }
    loadProductosMasVendidos();

  }, [])

  return (
    <div>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20} >
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
  )
}
