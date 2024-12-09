import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products.api';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../components/products/ProductCard';
import { useNavigate } from "react-router-dom";

export function CategoriaProductoPage() {

    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                const filteredProducts = response.data.filter(producto => producto.categoria == id);
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
    <div>
        <div className="grid grid-cols-3 gap-3">
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>

        <button 
            onClick={()=>{
                navigate('/categorias/')
            }}
            className="bg-indigo-500 p-3 w-48 font-bold rounded-lg mt-7 ml-2"
        >
            Cerrar
        </button>

    </div>
    );
}