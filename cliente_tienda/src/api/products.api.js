import axios from 'axios'
const productoApi= axios.create({
    baseURL:'http://localhost:8000/api/'
})

export const getAllProducts = () => productoApi.get("productos/")


export const createProduct=(product)=>{
    return productoApi.post("/productos/",product,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })
}

export const getProduct=(id)=>productoApi.get('/productos/'+id+'/')

export const updateProduct=(id,product)=> {
    return productoApi.put("/productos/"+id+"/",product,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })
}

export const deleteProduct=(id)=> productoApi.delete('/productos/'+id+'/')

// export const get_products_by_category=(category_id)=> productoApi.get('/productos/get_by_category/'+category_id+'/')

export const searchProducts=(searchCriteria,searchValue)=> productoApi.get('/filter_products/?criteria='+searchCriteria+'&'+'value='+searchValue)
       

