import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCategoria, updateCategoria, deleteCategoria, createCategoria } from '../../api/categories.api';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/products/ProductCard';
import toast from 'react-hot-toast';;


export function CategoriaFormPage() {
    const { register, handleSubmit, setValue } = useForm();
    const [categoria, setCategoria] = useState({
        nombre_categoria: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            const fetchCategoria = async () => {
            try {
                const response = await getCategoria(id);
                setCategoria(response.data);
                setValue('nombre_categoria', response.data.nombre_categoria);
            } catch (error) {
                console.error('Error fetching categoria:', error);
            }
        };

        fetchCategoria();
    }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        if(id){
            try {
                await updateCategoria(id, { nombre_categoria: data.nombre_categoria });
                toast.success('Categoria actualizada', {
                    position: 'bottom-right',
                    style: { background: '#101010', color: '#fff' },
                  });
                console.log('Categoria actualizada correctamente');
                navigate('/categorias');
            } catch (error) {
                console.error('Error updating categoria:', error);
                toast.error('Usted no tiene permiso para realizar esta acción', {
          
                    position: "bottom-right",
                    style: {
                      background: "#101010",
                      color: "#fff"
                    }
                  });
            }

        }
        else{
            try {
                await createCategoria(data);
                toast.success('Categoria creada', {
                    position: 'bottom-right',
                    style: { background: '#101010', color: '#fff' },
                  });
                console.log('Categoria creada correctamente');
                navigate('/categorias');
            } catch (error) {
                console.error('Error creating categoria:', error);
                toast.error('Usted no tiene permiso para realizar esta acción', {
          
                    position: "bottom-right",
                    style: {
                      background: "#101010",
                      color: "#fff"
                    }
                  });
            }
        }
        
    };

    const handleDelete = async () => {
        try {
            await deleteCategoria(id);
            toast.success('Categoria eliminada', {
                position: 'bottom-right',
                style: { background: '#101010', color: '#fff' },
            });
            navigate('/categorias');
        } catch (error) {
            console.error('Error deleting categoria:', error);
            toast.error('Usted no tiene permiso para realizar esta acción', {
      
                position: "bottom-right",
                style: {
                  background: "#101010",
                  color: "#fff"
                }
              });
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="nombre_categoria"
                    placeholder="Ingresa el nombre de la categoria"
                    {...register('nombre_categoria', { required: true })}
                    className="bg-gray-200 text-black p-3 rounded-lg block w-full mb-3"
                />
                <div className="flex gap-4 mt-3">
                <button 
                    type="submit"
                    className="bg-indigo-500 p-3 rounded-lg flex-1 hover:bg-indigo-700 transition duration-300"
                >
                    Save
                </button>
                {id &&
                <div>
                <button 
                    onClick={async () => {
                        const accepted = window.confirm("¿Estás seguro de querer borrar este producto?");
                        if (accepted) {
                            handleDelete();
                        }
                    }}
                    className="bg-red-500 p-3 rounded-lg w-48 hover:bg-red-700 hover:cursor-pointer transition duration-300"
                >
                    Delete
                </button>
                </div>
                }
                </div>
            </form>
            <div>
            <button 
                onClick={() => navigate('/categorias/')}
                className="bg-indigo-500 p-3 w-48 font-bold rounded-lg mt-7"
            >
                Cerrar
            </button>

            </div>
        </div>
    );
}