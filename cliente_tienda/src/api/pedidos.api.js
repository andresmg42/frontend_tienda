import axios from 'axios'
const pedidosApi= axios.create({
    baseURL:'http://localhost:8000/api/'
})

export const getAllPedidos = () => pedidosApi.get("pedidos/")

export const getAllPedidosProductos = () => pedidosApi.get("pedidos_productos/")

export const getPedido = (id) => pedidosApi.get("pedidos/"+id+"/")

export const getPedidoProducto = (id) => pedidosApi.get("pedidos_productos/"+id+"/")

export const updatePedido = (id, pedido) => {
    return pedidosApi.put("pedidos/" + id + "/", pedido, {
        headers: {
            'Content-Type': 'application/json', // or 'multipart/form-data' if you're sending files
            'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
    });
}

export const send_cancel_mail=(dest,mensaje)=> pedidosApi.get('/send_email_cancel/?dest='+dest+'&'+'mensaje='+mensaje)

export const deletePedido = (id) => {
    return pedidosApi.delete("pedidos/" + id + "/", {
        headers: {
            'Content-Type': 'application/json', // or 'multipart/form-data' if you're sending files
            'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
    });
}