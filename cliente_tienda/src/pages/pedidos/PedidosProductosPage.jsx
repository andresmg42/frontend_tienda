import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getAllPedidosProductos, getPedido} from "../../api/pedidos.api";
import { PedidoProductoCard } from '../../components/pedidos/PedidoProductoCard';
import { getProduct } from '../../api/products.api';
import { updatePedido } from '../../api/pedidos.api';
import { useNavigate } from "react-router-dom";

export function PedidosProductosPage() {

    const params = useParams();
    const { id } = params;
    const navigate=useNavigate();

    const [pedidosProductos, setPedidosProductos] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [pedido, setPedido] = useState({
        estado_pedido: false, // Initialize with a default value
        metodo_pago: '',
        hora: '',
        fecha: '',
        usuarios: [],
        productos: []
    });

    useEffect(() => {
        async function fetchPedidosProductos() {
            try {
                const response = await getAllPedidosProductos();
                const filteredPedidosProductos = response.data.filter(pedidoProducto => pedidoProducto.pedido_ppid == id);
                setPedidosProductos(filteredPedidosProductos);
            } catch (error) {
                console.error('Error fetching pedidos productos:', error);
            }
        }

        fetchPedidosProductos();
    }, []);

    useEffect(() => {
        async function calculateTotalPrice() {
            let total = 0;
            for (const producto of pedidosProductos) {
                const response = await getProduct(producto.producto_ppid);
                total += producto.cantidad_producto_carrito * response.data.precio;
            }
            setTotalPrice(total);
        }

        if (pedidosProductos.length > 0) {
            calculateTotalPrice();
        }
    }, [pedidosProductos]);

    useEffect(() => {
        async function fetchPedido() {
            try {
                const response = await getPedido(id);
                setPedido(response.data);
            } catch (error) {
                console.error('Error fetching pedidos productos:', error);
            }
        }

        fetchPedido();
    } , [id]);

    const handleCheckboxChange = async (event) => {
        const newEstadoPedido = event.target.checked;
        const newData = { 
            id: id,
            metodo_pago: pedido.metodo_pago,
            hora: pedido.hora,
            estado_pedido: newEstadoPedido,
            fecha: pedido.fecha,
            usuarios: pedido.usuarios,
            productos: pedido.productos};
        try {
            await updatePedido(id, newData);
            setPedido(prevPedido => ({ ...prevPedido, estado_pedido: newEstadoPedido }));
            console.log('Updated pedido:', newData);
        } catch (error) {
            console.error('Error updating estado_pedido:', error);
        }
    };

    const handleBackClick = () => {
        navigate("/pedidos/")
      }


    return (
        <div>
            <div className="grid grid-cols-3 gap-3 mt-8">
                {/* Contenedor para la flecha */}
                <button
                className="absolute top-0 left-0 p-3 text-gray-600 hover:text-gray-900 transition duration-300 flex items-center"
                onClick={handleBackClick}
                >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="ml-2">Back</span>
                </button>
                {pedidosProductos.map((producto, index) => (
                    <PedidoProductoCard key={index}  productId={producto.producto_ppid} cantidad={producto.cantidad_producto_carrito} />
                ))}
            </div>
            <p className="text-slate-900 text-2xl mt-1 ml-5"><strong>TOTAL PEDIDO: </strong> ${totalPrice.toLocaleString('es-ES')}</p>
            <label className="text-slate-400 flex items-center ml-5 mt-7">
                <input 
                    type="checkbox" 
                    checked={pedido.estado_pedido} 
                    onChange={handleCheckboxChange} 
                    style={{ width: '20px', height: '20px' }}
                />
                <span className="ml-2">Entregado</span>
            </label>

        </div>
        
    );
    }