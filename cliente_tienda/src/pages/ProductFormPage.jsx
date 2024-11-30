import { useForm } from 'react-hook-form'
import { createProduct } from '../api/products.api'
import { getAllCategories } from '../api/categories.api'
import toast from 'react-hot-toast'

export function ProductFormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async data => {

    try {
      const response = await getAllCategories(); // Asegúrate de que esta función funcione correctamente
      const categorias = response.data;
    
     const cat=categorias.find(categoria=>categoria.nombre_categoria === data.categoria);

  
        if (cat!=undefined){
          const newData = {
            "nombre": data.nombre,
            "precio": data.precio,
            "estado_producto": data.estado_producto === 'true',
            "cantidad_producto": parseInt(data.cantidad_producto, 10),
            "descripcion": data.descripcion,
            "categoria": cat.id
  
          }

          console.log(newData)

          await createProduct(newData)
          toast.success('Producto Creado Exitosamente', {
            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#fff",
            },
          });

        } else{
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








  });



  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="nombre"
          {...register("nombre", { required: true })}
        />

        {errors.nombre && <span>this field is required</span>}


        <input type="text" placeholder="precio"
          {...register("precio", { required: true })}
        />


        <input type="text" placeholder="categoria"
          {...register("categoria", { required: true })}
        />


        <input type="radio" name="estado" value="false"
          {...register("estado_producto", { required: true })}
        />inactivo


        <input type="radio" name="estado" value="true"
          {...register("estado_producto", { required: true })}
        />activo


        {errors.precio && <span>this field is required</span>}

        <input type="text" placeholder="cantidad_producto"
          {...register("cantidad_producto", { required: true })}
        />

        {errors.cantidad_producto && <span>this field is required</span>}

        <textarea
          rows="3"
          placeholder="Descripcion"
          {...register("descripcion", { required: true })}

        ></textarea>

        {errors.descripcion && <span>this field is required</span>}

        <input type='file' name='imagen' onChange={handleFileChange}/>

        <button>save</button>

      </form>
    </div>
  )
}