import { useNavigate } from "react-router-dom";

export function ClientCard({ product }) {

    const navigate = useNavigate();

    return (
        <div className="bg-zinc-800 p-3 hover:bg-zinc-700
        hover:cursor-pointer"

            onClick={() => {
                // navigate('/pedido-create/'+product.id)
                console.log('navegando a pedido')
            }}
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

            <button  className='bg-indigo-500 p-3 rounded-lg  w-48 mt-3 p-3 hover:bg-indigo-700
        hover:cursor-pointer'>Agregar al Carrito</button>

        </div>
    );
}

