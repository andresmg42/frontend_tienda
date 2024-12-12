import React from 'react'
import DataTable from "react-data-table-component"
import { useState, useEffect } from 'react'
import { tablaProductosMasVendidos } from '../../api/dashboard.api'



export function TablaProductosMasVendidos() {


    const [data, setData] = useState([])

    useEffect(() => {
        async function loadTablaProductosMasVendidos() {
            const res = await tablaProductosMasVendidos();
            setData(res.data)
            setRecords(res.data)
            console.log(res.data)
        }
        loadTablaProductosMasVendidos()

    }, [])

    console.log('esta es la data 2:', data)

    const [records, setRecords] = useState(data)

    console.log('estos son los records:', records)

    const handleChange = (e) => {
        const filteredRecords = data.filter(record => {
            return record.usuarios__username.toLowerCase().includes(e.target.value.toLowerCase())

        })

        setRecords(filteredRecords)
    }



    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre

        },
        {
            name: "Precio",
            selector: row => row.precio

        },
        {

            name: "Estado",
            selector: row => row.estado_producto ? "Activo":"Inactivo"


        },
        {

            name: "Cantidad",
            selector: row => row.cantidad_producto

        },
        {

            name: "Total Vendidos",
            selector: row => row.total_vendidos

        },

        {

            name: "Ingresos por U",
            selector: row => row.ingresos

        },
  
        

    ]
    return (
        <div className='table_container'>
            <input type="text" onChange={handleChange} />
            <DataTable
                title={'Productos mas Vendidos'}
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