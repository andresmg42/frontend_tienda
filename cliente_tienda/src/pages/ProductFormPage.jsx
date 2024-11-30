import { useForm } from 'react-hook-form'
import { createProduct, getProduct } from '../api/products.api'
import { getAllCategories } from '../api/categories.api'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

export function ProductFormPage() {
  const navigate = useNavigate();

  const params = useParams();

  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    cantidad_producto: '',
    estado_producto: true,
    categoria: '',
    foto_producto: null, // Para la imagen
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto_producto: e.target.files[0] });
  };

  const onSubmit = async (e) => {

    e.preventDefault();



    try {
      const response = await getAllCategories();
      const categorias = response.data;

      const cat = categorias.find(categoria => categoria.nombre_categoria === formData.categoria);


      if (cat != undefined) {

        const newdata = {
          nombre: formData.nombre,
          precio: formData.precio,
          descripcion: formData.descripcion,
          cantidad_producto: parseInt(formData.cantidad_producto),
          estado_producto: formData.estado_producto === "true",
          categoria: cat.id,
          foto_producto: formData.foto_producto,
        }

        if (params.id) {
          await updateTask(params.id, newdata);
          toast.success('Tarea Actualizada correctamente', {

            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#fff"
            }
          })

        } else {

          await createProduct(newdata)
          toast.success('Producto Creado Exitosamente', {
            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#fff",
            },
          });



        }


        //navigate("/products")




      } else {
        toast.error('Categoría no encontrada', {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });

      }


    } catch (error) {
      console.error("Error al validar la categoría:", error);
      toast.error('Ocurrió un error. Intenta nuevamente.', {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }








  };

useEffect(()=>{
  async function loadProduct(){
    console.log(params.id)
  if (params.id){
    const res=await getProduct(params.id)
    console.log(res)
    setFormData({
      nombre: res.nombre,
      precio: res.precio,
      descripcion: res.descripcion,
      cantidad_producto: String(res.cantidad_producto),
      estado_producto: String(res.estado_producto),
      categoria: String(res.categoria),
      foto_producto: res.foto_producto,
    });

  }

}
loadProduct();
},[params.id])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} />
        <input type="number" name="precio" placeholder="Precio" onChange={handleInputChange} />
        <textarea name="descripcion" placeholder="Descripción" onChange={handleInputChange}></textarea>
        <input type="number" name="cantidad_producto" placeholder="Cantidad" onChange={handleInputChange} />
        <select name="estado_producto" onChange={handleInputChange}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        <input type="text" name="categoria" placeholder="Categoría" onChange={handleInputChange} />
        <input type="file" name="foto_producto" onChange={handleFileChange} />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  )
}