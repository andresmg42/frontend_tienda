import { useForm } from 'react-hook-form'
import { login} from '../../api/users.api'
import { getAllUsers } from '../../api/users.api'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"




export function LoginFormPage() {
  const navigate = useNavigate();

  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();


  const onSubmit = handleSubmit(async data => {
      
      const res=await login(data)
      console.log(res.data.token)
      if (res.data.token){
        localStorage.setItem('authToken',res.data.token);
        console.log(localStorage.getItem('authToken'))
        alert('Inicio de secion Exitoso')
        console.log("comprovando",localStorage.getItem('authToken'))
      }

     
      navigate('/products')

  });

  

  return (
    <div className='max-w-xl mx-auto mt-10'>
      <form onSubmit={onSubmit}>

        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type="text" name="username" placeholder="username" {...register("username", { required: true })} />


        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' type='password' name="password" placeholder="password" {...register("password", {required:true })}/>

     


        <button className='bg-indigo-500 p-3 rounded-lg  w-48 mt-3' type="submit">Login</button>
      
      </form>
      

    </div>
  )
}