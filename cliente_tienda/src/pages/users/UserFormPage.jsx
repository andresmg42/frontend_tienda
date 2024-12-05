import { useForm, useWatch } from 'react-hook-form'
import { createUser, getUser, updateUser, deleteUser, registerUser } from '../../api/users.api'
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

      await updateUser(newdata);
      toast.success('Usuario Actualizado correctamente', {

        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })

    } else {
      console.log(newdata)
      try {
        await registerUser(newdata)
        toast.success('usuario Creado Exitosamente', {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });


      } catch (error) {
        console.log(error.response?.data || error.message)
        toast.error('datos invalidos o el usuario ya existe', {
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
        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="text" name="username" placeholder="username" {...register("username", { required: true })} />

        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="text" name="email" placeholder="email" {...register("email", { required: true })} />

        <select className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' name="permissions" {...register("permissions", { required: true })}>
          <option value="Client">Client</option>
          <option value="Staff">Staff</option>
          <option value="SuperUser">Super User</option>

        </select>

        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type='password' name="password" placeholder="password" {...register("password", { required: params.id === undefined ? "la contraseña es requerida" : false })} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type='password' name="password2" placeholder="again write your parsswowrd" {...register("password2", {
          required: params.id === undefined ? "la contraseña es requerida" : false,
          validate: (value) => value === password || 'las contraseñas no coinciden'

        })} />
        {errors.password2 && <p className="text-red-500">{errors.password2.message}</p>}

        <button className='bg-indigo-500 p-3 rounded-lg  w-48 mt-3' type="submit">Save</button>

      </form>
      {params.id &&
        <div>
          <button
            className='bg-red-500 p-3 rounded-lg w-48 mt-3'
            onClick={async () => {
              const accepted = window.confirm("are you sure?");
              if (accepted) {
                await deleteUser(params.id);
                toast.success('Usuario eliminada exitosamente', {

                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff"
                  }
                })

                navigate("/users")
              }

            }}
          >Delete

          </button>

        </div>



      }

    </div>
  )
}