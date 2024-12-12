import axios from 'axios'
const pedidosApi= axios.create({
    baseURL:'http://localhost:8000/api/'
})

export const productosMasVendidos=()=>pedidosApi.get('productos_mas_vendidos')