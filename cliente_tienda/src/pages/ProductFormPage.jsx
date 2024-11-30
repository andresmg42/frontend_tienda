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
      console.log(categorias)
      const categoriaExiste = categorias.some(
        (categoria) => categoria.nombre_categoria === data.categoria
      );

      if (categoriaExiste) {
        const newData = {
          nombre: data.nombre,
          precio: parseFloat(data.precio),
          estado_producto: data.estado_producto === 'true',
          cantidad_producto: parseInt(data.cantidad_producto, 10),
          descripcion: data.descripcion,
          categoria: data.categoria

        }
        //Aqui hay que crear un producto.
        console.log(newData);
      } else {
        console.log("error despues del else")
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

  //const res = await createProduct(data)
  //console.log(res)

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

        <button>save</button>

      </form>
    </div>
  )
}