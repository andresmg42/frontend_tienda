import { useForm } from 'react-hook-form'
import { createProduct } from '../api/products.api'
import { getAllCategories } from '../api/categories.api'
import toast from 'react-hot-toast'
import { useState } from 'react'

export function ProductFormPage() {


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

  const onSubmit= async (e) => {

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
        estado_producto: formData.estado_producto ==="true",
        categoria: cat.id,
        foto_producto : formData.foto_producto, 
        }
        console.log(newdata)

        await createProduct(newdata)
        toast.success('Producto Creado Exitosamente', {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });

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