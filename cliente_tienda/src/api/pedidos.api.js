import axios from 'axios'
const pedidosApi= axios.create({
    baseURL:'http://localhost:8000/api/'
})

export const getAllPedidos = () => pedidosApi.get("pedidos/",{headers: {
    'Content-Type': 'application/json', 
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})

export const getAllPedidosProductos = () => pedidosApi.get("pedidos_productos/",{headers: {
    'Content-Type': 'application/json', 
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})

export const getPedido = (id) => pedidosApi.get("pedidos/"+id+"/",{headers: {
    'Content-Type': 'application/json', 
    'Authorization': `Token ${localStorage.getItem('authToken')}`

  }})

export const getPedidoProducto = (id) => pedidosApi.get("pedidos_productos/"+id+"/",{headers: {
    'Content-Type': 'application/json', 
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})

export const updatePedido = (id, pedido) => {
    return pedidosApi.put("pedidos/" + id + "/", pedido, {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
    });
}

export const createPedido=(pedido)=>pedidosApi.post('pedidos/',pedido,{headers: {
'Content-Type': 'application/json', 
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})

export const createPedidosProductos=(pedidos_productos)=>pedidosApi.post('pedidos_productos/',pedidos_productos,{headers: {
    'Content-Type': 'application/json', 
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})

export const llenarPedidosProductos=(listaPP)=>pedidosApi.post('llenarTablaProductosPedidos',listaPP,{headers: {
    'Content-Type': 'application/json', 
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})




