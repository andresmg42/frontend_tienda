import axios from 'axios'
const productoApi= axios.create({
    baseURL:'http://localhost:8000/api/productos/'
})

export const getAllProducts = () =>{
    return productoApi.get("/")
}

export const createProduct=(product)=>{
    return productoApi.post("/",product)
}

