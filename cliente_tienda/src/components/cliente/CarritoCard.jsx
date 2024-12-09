import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateCantidadProductoCarrito,partialUpdateProduct } from "../../api/products.api";


export function CarritoCard({ product }) {

    const navigate = useNavigate();
    
    const [cantidad,setCantidad]=useState(product.cantidad_user_producto)
    const [cantidadP,setCantidadP]=useState(product.cantidad_producto)
    console.log(cantidadP)
    const handlePlus= async ()=>{
        console.log('este es el producto en carrtoCard',product)
        if(cantidadP>0){

            const nuevaCantidadUser=cantidad+1
            const nuevaCantidadProducto=cantidadP-1
            
            try {
                const res=await updateCantidadProductoCarrito(
                    product.id_user_product,
                    nuevaCantidadUser
                );

                const res2= await partialUpdateProduct(
                    product.id,
                    nuevaCantidadProducto
                )

                setCantidad(res.data.cantidad_producto);
                setCantidadP(res2.data.cantidad_producto);
            } catch (error) {
                console.error("Error al actualizar cantidades",error);
                
            }
        }
    };

    const handleSub=async()=>{

        if(cantidad>0){
            const nuevaCantidad=cantidad-1;
            const nuevaCantidadProducto= cantidadP+1

            try {
                const res= await updateCantidadProductoCarrito(
                    product.id_user_product,
                    nuevaCantidad

                );

                 const res2= await partialUpdateProduct(
                    product.id,
                    nuevaCantidadProducto
                 );

                 setCantidad(res.data.cantidad_producto)
                 setCantidadP(res2.data.cantidad_producto)

            } catch (error) {
                console.log("error al actualizar las cantidades",error)
            }
        }
    }
    


    // const handlePlus=async ()=>{
    //     let cantidad_p_u=()=>cantidadP-1<0 ? cantidad:cantidad +1
    //     let cantidad_p=()=>cantidadP-1<0 ? 0: cantidadP-1
    //     const res=await updateCantidadProductoCarrito(product.id_user_product,cantidad_p_u)
    //     const res2=await partialUpdateProduct(product.id,cantidad_p)
    //     setCantidad(res.data.cantidad_producto)
    //     setCantidadP(res2.data.cantidad_producto)
        
        
    // }

    // const handleSub= async ()=>{
    //     let cantidad_p_u=()=>cantidad-1<0 ? 0:cantidad -1
    //     let cantidad_p=()=>cantidad-1<0 ? cantidadP: cantidadP-1
    //     const res= await updateCantidadProductoCarrito(product.id_user_product,cantidad_p_u)
    //     setCantidad(res.data.cantidad_producto)
    //     const res2=await partialUpdateProduct(product.id,cantidad_p)
    //     setCantidadP(res2.data.cantidad_producto)
    // }

   

  

    return (
        <div className="bg-withe p-3 hover:bg-gray-300
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
            <p className="text-gray-600">Cantidad a comprar:{cantidad}</p>
            <p className="text-gray-600">Cantidad disponible:{cantidadP}</p>
            <p className="text-gray-600">Precio:{product.precio}</p>
            <p className="text-gray-600">Descripcion:{product.descripcion}</p>

            <button className='bg-indigo-500 p-3 rounded-lg  w-48 mt-3 p-3 hover:bg-indigo-700
        hover:cursor-pointer'
        onClick={()=>{ 
            
            handlePlus()
        

        }}
        >+</button>
        <button className='bg-red-500 p-3 rounded-lg  w-48 mt-3 p-3 hover:bg-red-700
        hover:cursor-pointer'
        onClick={()=>{ 
            
            handleSub()
        

        }}
        >-</button>

        </div>
    );
}

