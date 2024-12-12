import React from 'react'
import DataTable from "react-data-table-component"
import { useState, useEffect } from 'react'
import { indicadoresUsuario } from '../../api/dashboard.api'



export function TableIndicadoresUsuario() {


    const [data, setData] = useState([])

    useEffect(() => {
        async function loadIndicadoreUsuario() {
            const res = await indicadoresUsuario();
            setData(res.data)
            setRecords(res.data)
            console.log(res.data)
        }
        loadIndicadoreUsuario()

    }, [])

    

    const [records, setRecords] = useState(data)

    console.log('estos son los records:',records)

    const handleChange = (e) => {
       const filteredRecords= data.filter(record => {
            return record.usuarios__username.toLowerCase().includes(e.target.value.toLowerCase())

        })

        setRecords(filteredRecords)
    }



    const columns = [
        {
            name: 'Nombre',
            selector: row => row.usuarios__username

        },
        {
            name: "Total Vendidos",
            selector: row => row.total_productos_vendidos

        },
        {

            name: "Total Pedidos",
            selector: row => row.total_pedidos


        },
        {

            name: "Ingresos por Usuario",
            selector: row => row.ingresos_por_usuario

        }

    ]
    return (
        <div className='table_container'>
            <input type="text" className='text-black border border-gray-300 rounded px-2 py-1' onChange={handleChange} />
            <DataTable
            title={'Indicadores Usuario'}
                columns={columns}
                data={records}
                selectableRows
                pagination
                paginationPerPage={5}
                onSelectedRowsChange={rows => console.log(rows)}
                fixedHeader
            />

        </div>
    )
}
