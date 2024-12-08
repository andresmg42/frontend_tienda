import { useNavigate } from "react-router-dom";
import { insertarCarrito, searchUserProducts, } from "../../api/products.api";
import toast from "react-hot-toast";
import { useState } from "react";
export function ClientCard({ product }) {

    const navigate = useNavigate();
    

    const handleInsertar = async () => {

        const res1= await searchUserProducts(localStorage.getItem('user_id'));
        console.log(res1.data)
        console.log(localStorage.getItem('user_id'))

        const productos=res1.data

        const product_exist = productos.find(element => element.id===product.id) 
            

            
            
        


        if (!product_exist) {

            const carrito = {
                cantidad_producto: 0,
                usuario: parseInt(localStorage.getItem('user_id')),
                producto: product.id

            }
            try {
                const res = await insertarCarrito(carrito)

                

                


                
                console.log(res)
                toast.success('Agregado al carrito exitosamente', {

                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });

            } catch (error) {
                toast.success('Error al agregar el carrito', {

                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                })
            }



        }

        else {

            toast.success('ya agregaste este producto al carrito', {

                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })

        }


    }

    return (
        <div className="bg-zinc-800 p-3 hover:bg-zinc-700
        hover:cursor-pointer"


        >

            {product.foto_producto && (
                <img
                    src={product.foto_producto}
                    alt={product.nombre}
                    className="w-32 h-[120px] object-cover mb-3 rounded-md"
                />
            )}
            <h1 className="font-bold uppercase">{product.nombre}</h1>
            <p className="text-slate-400">{product.cantidad_producto}</p>
            <p className="text-slate-400">{product.precio}</p>
            <p className="text-slate-400">{product.descripcion}</p>

            {/* CREAR ENTRADA EN LA BASE DE DATOS DE PRODUCTOUSUARIO */}

            <button className='bg-indigo-500 p-3 rounded-lg  w-48 mt-3 p-3 hover:bg-indigo-700
        hover:cursor-pointer'
                onClick={() => {
                    handleInsertar()
                }}

            >Agregar al Carrito</button>

        </div>
    );
}

