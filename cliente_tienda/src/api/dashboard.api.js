import axios from 'axios'
const pedidosApi= axios.create({
    baseURL:'http://localhost:8000/api/'
})

export const productosMasVendidos=()=>pedidosApi.get('productos_mas_vendidos')

export const indicadoresUsuario=()=>pedidosApi.get('indicadores_por_usuario')

export const ventasDiarias=()=>pedidosApi.get('ventas_diarias')

export const metodosPMasUtilizados=()=>pedidosApi.get('metodos_pago_mas_utilizados')

export const tablaProductosMasVendidos=()=>pedidosApi.get('productosMasVendidos')

export const  valorTotalVentas=()=>pedidosApi.get('valor_total_ventas')