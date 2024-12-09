import axios from 'axios'
const categoriaApi= axios.create({
    baseURL:'http://localhost:8000/api/categorias/'
})

export const getAllCategories = () => categoriaApi.get("/")