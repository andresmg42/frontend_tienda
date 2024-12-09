import React, { useEffect, useState } from 'react';
import { getProduct } from '../../api/products.api';

export function PedidoProductoCard({ productId, cantidad }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const totalPrice = cantidad * product.precio;

    return (
        <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer">
            {product.foto_producto && (
                <img 
                    src={product.foto_producto} 
                    alt={product.nombre}
                    className="w-32 h-[120px] object-cover mb-3 rounded-md"
                />
            )}
            <h1 className="font-bold uppercase">{product.nombre}</h1>
            <p className="text-slate-400"><strong>Cantidad: </strong>{cantidad}</p>
            <p className="text-slate-400"><strong>Precio: </strong>{product.precio}</p>
            <p className="text-slate-400"><strong>Descripción: </strong>{product.descripcion}</p>
            <p className="text-slate-400"><strong>Total: </strong>{totalPrice}</p>
        </div>
    );
}

