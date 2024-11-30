
export function ProductCard({product}) {
    return (
        <div>
            <h1>{product.nombre}</h1>
            <p>{product.cantidad_producto}</p>
            <p>{product.precio}</p>
            <p>{product.descripcion}</p>
            <hr />
        </div>
    )
}

