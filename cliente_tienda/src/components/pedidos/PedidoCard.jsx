import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUser } from '../../api/users.api';
import { PedidoProductoCard } from './PedidoProductoCard';

export function PedidoCard({pedido}) {
    
        const navigate=useNavigate();
        const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser(pedido.usuarios);
                setUsuario(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [pedido.usuarios]);
    
        return (
            <div className="bg-zinc-800 p-3 hover:bg-zinc-700
            hover:cursor-pointer"

            onClick={()=>{
                navigate('/pedidosProductos/'+pedido.id)
            }}

            >
                <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-bold uppercase"><strong>Pedido #</strong>{pedido.id}</h1>
                    <p className="text-slate-400"><strong>Metodo de pago: </strong>{pedido.metodo_pago}</p>
                    <p className="text-slate-400"><strong>Fecha: </strong>{pedido.fecha}</p>
                    <p className="text-slate-400"><strong>Hora: </strong>{pedido.hora}</p>
                    <p className="text-slate-400"><strong>Cliente: </strong>{usuario ? usuario.username : 'Cargando...'}</p>
                </div>
                <div>
                    <p className="font-bold uppercase">{pedido.estado_pedido ? 'ENTREGADO' : 'PENDIENTE'}</p>
                </div>
            </div>
                
            </div>
        );
    }