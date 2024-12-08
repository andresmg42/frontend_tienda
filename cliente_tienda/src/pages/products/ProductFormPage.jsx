import { useForm } from 'react-hook-form'
import { createProduct, getProduct, updateProduct, deleteProduct } from '../../api/products.api'
import { getAllCategories } from '../../api/categories.api'
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
          
          await updateProduct(params.id, newdata);
          toast.success('Producto Actualizado correctamente', {

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
    
      toast.error('Ocurrió un error', {
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
    <div className='max-w-xl mx-auto mt-10'>
      <form onSubmit={onSubmit}>
        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="text" name="nombre" placeholder="nombre" {...register("nombre", { required: true })} />

        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="number" name="precio" placeholder="precio" {...register("precio", { required: true })} />

        <textarea className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' name="descripcion" placeholder="descripción" {...register("descripcion", { required: true })}></textarea>

        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="number" name="cantidad_producto" placeholder="cantidad_producto" {...register("cantidad_producto", { required: true })} />

        <select className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' name="estado_producto" {...register("estado_producto", { required: true })}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>

        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="text" name="categoria" placeholder="categoría" {...register("categoria", { required: true })} />

        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="file" name="foto_producto" {...register("foto_producto", { required: false })} />

        <button className='bg-indigo-500 p-3 rounded-lg  w-48 mt-3' type="submit">Save</button>

      </form>
      {params.id &&
        <div>
          <button
            className='bg-red-500 p-3 rounded-lg w-48 mt-3'
            onClick={async () => {
              const accepted = window.confirm("are you sure?");
              if (accepted) {
                try {

                  await deleteProduct(params.id);
                toast.success('Producto eliminada exitosamente', {

                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff"
                  }
                })

                navigate("/products")
                  
                } catch (error) {
                  toast.error('Usted no tiene permiso para esta accion', {

                    position: "bottom-right",
                    style: {
                      background: "#101010",
                      color: "#fff"
                    }
                  })
                  
                }
                
              }

            }}
          >Delete

          </button>

        </div>



      }

    </div>
  )
}