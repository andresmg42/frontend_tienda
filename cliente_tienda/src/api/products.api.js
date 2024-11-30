import axios from 'axios'
const productoApi= axios.create({
    baseURL:'http://localhost:8000/api/productos/'
})

export const getAllProducts = () => productoApi.get("/")


export const createProduct=(product)=>{
    return productoApi.post("/",product,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })
}

export const getProduct=(id)=>productoApi.get('/'+id+'/')

export const updateProuduct=(id,product)=> productoApi.put('/'+id+'/',product)

export const deleteProduct=(id)=> productoApi.delete('/'+id+'/')
       

