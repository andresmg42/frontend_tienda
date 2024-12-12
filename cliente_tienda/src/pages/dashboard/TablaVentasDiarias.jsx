import React from 'react'
import DataTable from "react-data-table-component"
import { useState, useEffect } from 'react'
import {  ventasDiarias } from '../../api/dashboard.api'



export function TableVentasDiarias() {


    const [data, setData] = useState([])

    useEffect(() => {
        async function loadVentasDiarias() {
            const res = await ventasDiarias();
            setData(res.data)
            setRecords(res.data)
            console.log(res.data)
        }
        loadVentasDiarias()

    }, [])



    const [records, setRecords] = useState(data)

    

    const handleChange = (e) => {
       const filteredRecords= data.filter(record => {
            return record.usuarios__username.toLowerCase().includes(e.target.value.toLowerCase())

        })

        setRecords(filteredRecords)
    }



    const columns = [
        {
            name: 'Fecha',
            selector: row => row.fecha

        },
        {
            name: "Total Pedidos",
            selector: row => row.total_pedidos

        },
        {

            name: "Total Ventas",
            selector: row => row.total_ventas


        }
        

    ]
    return (
        <div className='table_container'>
            <input type="text" onChange={handleChange} />
            <DataTable
            title={'Ventas Diarias'}
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
