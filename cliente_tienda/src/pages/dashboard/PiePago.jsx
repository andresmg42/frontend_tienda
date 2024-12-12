import React, { useEffect, useState } from 'react'
import { VictoryPie, VictoryTheme } from 'victory'
import { metodosPMasUtilizados } from '../../api/dashboard.api'

export default function PiePago() {
    const [data, setData] = useState([])

    useEffect(() => {


        async function loadMetodosPago() {
            const res = await metodosPMasUtilizados();
            setData(res.data)
            console.log('esta es la data en pie',res.data[0])
        }
        loadMetodosPago()

    }, [])

    const dataPie=data.length>=3? [
        { x: 'Transferencia', y:data[0]['frecuencia'] },
        { x: "Targeta", y:data[1]['frecuencia'] },
        { x: "Efecty", y:data[2]['frecuencia'] }
      ]:[]

    return (
        <div>
            <VictoryPie
                data={dataPie}
                theme={VictoryTheme.clean}
            />

        </div>
    )
}
