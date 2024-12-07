import { useForm } from 'react-hook-form'
import { login} from '../../api/users.api'
import { getAllUsers } from '../../api/users.api'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"





export function LoginFormPage() {
  const navigate = useNavigate();

  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();


  const onSubmit = handleSubmit(async data => {
      
      const res=await login(data)
      console.log(res.data.token)
      if (res.data.token){
        localStorage.setItem('authToken',res.data.token);
        console.log(localStorage.getItem('authToken'))
        alert('Inicio de sesión exitoso')
        
      }

     
      navigate('/products')

  });

  

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Log in</h1>
  
      <form onSubmit={onSubmit}>
        <input
          className="bg-gray-200 text-black p-3 rounded-lg block w-full mb-3"
          type="text"
          name="username"
          placeholder="Username"
          {...register("username", { required: true })}
        />
  
        <input
          className="bg-gray-200 text-black p-3 rounded-lg block w-full mb-3"
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
  
        <div className="flex justify-between items-center mt-3 space-x-200">
          <button
            className="bg-indigo-500 p-3 rounded-lg w-full hover:bg-indigo-600 transition duration-300 mr-3"
            type="submit"
          >
            Login
          </button>
          <div className="w-full text-center m-100" style={{ marginTop: "1.725rem" }}>
            <button
              className="bg-indigo-500 p-3 rounded-lg w-full hover:bg-indigo-600 transition duration-300"
              type="button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-600 mt-2 text-center">
              ¿No tienes cuenta?{" "}
              <span
                className="text-indigo-500 font-bold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Regístrate
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
  
}