import { useForm} from 'react-hook-form'
import { getUser, updateUser, deleteUser, registerUser } from '../../api/users.api'
import { getAllUsers } from '../../api/users.api'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"




export function UserFormPage() {
  const navigate = useNavigate();

  const params = useParams();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();



  const password = watch('password')

  const onSubmit = handleSubmit(async data => {

    const newdata = {
      //id:params.id,
      username: data.username,
      email: data.email,
      is_staff: data.permissions === 'Staff' || data.permissions === 'SuperUser',
      is_superuser: data.permissions === 'SuperUser',
      password: data.password

    }
    console.log(newdata)
    if (params.id) {
      // console.log(newdata)
      newdata.id = params.id
      
     try {
      await updateUser(newdata);
      toast.success('Usuario actualizado correctamente', {

        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
     } catch (error) {
      toast.error(error.response.data.detail, {

        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
      
     }

    } else {
      console.log(newdata)
      try {
        await registerUser(newdata)
        toast.success('Usuario creado exitosamente', {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });


      } catch (error) {
        console.log(error.response?.data || error.message)
        
        toast.error(error.response.data.detail, {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
      }




    }


    navigate("/users")


  });

  useEffect(() => {
    async function loadUser() {
      console.log(params.id)
      if (params.id) {
        const res = await getUser(params.id)

        setValue('username', res.data.username)
        setValue('email', res.data.email)



      };
    }
    loadUser();
  }, [])

  return (
    <div className='max-w-xl mx-auto mt-10'>
      <form onSubmit={onSubmit}>
        <input className='bg-gray-200 text-black p-3 rounded-lg block w-full mb-3' type="text" name="username" placeholder="Username" {...register("username", { required: true })} />

        <input className='bg-gray-200 text-black p-3 rounded-lg block w-full mb-3' type="text" name="email" placeholder="Email" {...register("email", { required: true })} />

        <select className='bg-gray-200 text-black p-3 rounded-lg block w-full mb-3' name="permissions" {...register("permissions", { required: true })}>
          <option value="Client">Client</option>
          <option value="Staff">Staff</option>
          <option value="SuperUser">Super User</option>

        </select>

        <input className='bg-gray-200 text-black p-3 rounded-lg block w-full mb-3' type='password' name="password" placeholder="Password" {...register("password", { required: params.id === undefined ? "La contraseña es requerida" : false })} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <input className='bg-gray-200 p-3 text-black rounded-lg block w-full mb-3' type='password' name="password2" placeholder="Write your parssword again" {...register("password2", {
          required: params.id === undefined? "La contraseña es requerida" : false,
          validate: (value) => {
            if (!password && !value) return true
           return  value === password || 'Las contraseñas no coinciden'
           
          }
        })} />
        {errors.password2 && <p className="text-red-500">{errors.password2.message}</p>}

        <div className="flex gap-4 mt-3">
          <button className='bg-indigo-500 p-3 rounded-lg flex-1 hover:bg-indigo-700 hover:cursor-pointer transition duration-300' type="submit">
            Save
          </button>
          {params.id && (
            <button
              type="button"
              className='bg-red-500 p-3 rounded-lg flex-1 hover:bg-red-700 hover:cursor-pointer transition duration-300'
              onClick={async () => {
                const accepted = window.confirm("¿Estás seguro de querer eliminar este usuario?");
                if (accepted) {
                  try {
                    await deleteProduct(params.id);
                    toast.success('Usuario eliminado exitosamente', {
                      position: "bottom-right",
                      style: {
                        background: "#101010",
                        color: "#fff"
                      }
                    })
                    navigate("/products")
                  } catch (error) {
                    toast.error('No tienes permiso para realizar esta acción', {
                      position: "bottom-right",
                      style: {
                        background: "#101010",
                        color: "#fff"
                      }
                    })
                  }
                }
              }}
            >
              Delete
            </button>
          )}
        </div>



      </form>

    </div>
  )
}