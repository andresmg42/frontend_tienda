import { useForm } from 'react-hook-form'
import { createProduct, getProduct, updateProduct, deleteProduct} from '../api/products.api'
import { getAllCategories } from '../api/categories.api'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

export function ProductFormPage() {
  const navigate = useNavigate();

  const params = useParams();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();


  const onSubmit = handleSubmit(async data => {





    try {
      const response = await getAllCategories();
      const categorias = response.data;

      const cat = categorias.find(categoria => categoria.nombre_categoria === data.categoria);


      if (cat != undefined) {

        const newdata = {
          nombre: data.nombre,
          precio: data.precio,
          descripcion: data.descripcion,
          cantidad_producto: parseInt(data.cantidad_producto),
          estado_producto: data.estado_producto === "true",
          categoria: cat.id,
          foto_producto: data.foto_producto[0],
        }

        if (params.id) {
          console.log(newdata)
          await updateProduct(params.id, newdata);
          toast.success('Tarea Actualizada correctamente', {

            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#fff"
            }
          })

        } else {
          console.log(newdata)
          await createProduct(newdata)
          toast.success('Producto Creado Exitosamente', {
            position: "bottom-right",
            style: {
              background: "#101010",
              color: "#fff",
            },
          });



        }


      navigate("/products")




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








  });

  useEffect(() => {
    async function loadProduct() {
      console.log(params.id)
      if (params.id) {
        const res = await getProduct(params.id)
        const response = await getAllCategories();
        const categorias = response.data;
        console.log(res.data)
        console.log(categorias)
        const cat = categorias.find(categoria => categoria.id === res.data.categoria);

        setValue('nombre', res.data.nombre)
        setValue('precio', res.data.precio)
        setValue('descripcion', res.data.descripcion)
        setValue('cantidad_producto', String(res.data.cantidad_producto))
        setValue('categoria', cat.nombre_categoria)
        setValue('estado_producto', String(res.data.estado_producto))
        //setValue('foto_producto', FileList(res.data.foto_producto,1))
      };
    }
    loadProduct();
  }, [])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="nombre" placeholder="nombre" {...register("nombre", { required: true })} />

        <input type="number" name="precio" placeholder="precio" {...register("precio", { required: true })} />

        <textarea name="descripcion" placeholder="descripción" {...register("descripcion", { required: true })}></textarea>

        <input type="number" name="cantidad_producto" placeholder="cantidad_producto" {...register("cantidad_producto", { required: true })} />

        <select name="estado_producto" {...register("estado_producto", { required: true })}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>

        <input type="text" name="categoria" placeholder="categoría" {...register("categoria", { required: true })} />

        <input type="file" name="foto_producto" {...register("foto_producto", { required: false })} />

        <button type="submit">Crear Producto</button>

      </form>
      {params.id &&
        <div>
          <button

            onClick={async () => {
              const accepted = window.confirm("are you sure?");
              if (accepted) {
                await deleteProduct(params.id);
                toast.success('Tarea eliminada exitosamente', {

                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff"
                  }
                })

                navigate("/products")
              }

            }}
          >Delete

          </button>

        </div>



      }

    </div>
  )
}