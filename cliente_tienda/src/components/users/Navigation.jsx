import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { Menu, ChevronDown, Search, Plus, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/categories.api";
import { searchProducts } from "../../api/products.api";
import { NavLink } from 'react-router-dom'


export function Navigation() {

  const [searchCriteria, setSearchCriteria] = useState('username')

  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isPermissionDropdownOpen, setIsPermissionDropdownOpen] = useState(false);

  const togglePermissionDropdown = (e) => {
    e.stopPropagation();
    setIsPermissionDropdownOpen(!isPermissionDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsPermissionDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando usuario:', searchTerm);
    console.log('searchCriteria:', searchCriteria)
    navigate('/users/' + searchCriteria + '/' + searchTerm)
  };

  return (
    <nav className="text-white p-4" style={{ backgroundColor: "#0FA0CC" }}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o Título */}
        <Link to="/products"
          className="text-xl font-bold hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          Productos
        </Link>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `text-xl font-bold hover:scale-110 transition-transform duration-300 ease-in-out ${isActive ? 'scale-100' : 'text-white'
            }`
          }
        >
          Usuarios
        </NavLink>

        <Link
          className="text-xl font-bold hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          Categorias
        </Link>
        <Link
          to="/pedidos"
          className="text-xl font-bold hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          Pedidos
        </Link>
        



        {/* Menú de Navegación */}
        <div className="relative flex items-center space-x-4">
          {/* Ícono de Búsqueda */}
          <div
            className="cursor-pointer"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={24} />
          </div>

  

          {/* Barra de Búsqueda */}
          {isSearchOpen && (
            <div className="fixed inset-0 left-[-20px] bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder={"Buscar usuario por " + searchCriteria}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                  >
                    <Search size={20} />
                  </button>
                </form>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black mt-3" name="busqueda"
                  onChange={(e) => setSearchCriteria(e.target.value)}
                >
                  <option value="username">Nombre</option>
                  <option value="email" >Email</option>
                </select>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="mt-4 w-full bg-indigo-500 py-2 rounded-lg hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Botón de Salir */}
      <div className="fixed bottom-4 left-4">
        <button
          className="text-white p-2 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
          style={{ backgroundColor: "#0FA0CC" }}
          onClick={() => {
            localStorage.removeItem('authToken');
            navigate('/client');
          }}
        >
          <LogOut size={24} />
        </button>
      </div>

      {/* Botón de opciones adicionales */}
      <div className="fixed bottom-4 right-4">
        <div className="relative">
          <button
            className="text-white p-4 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
            style={{ backgroundColor: "#0FA0CC" }}
            onClick={toggleUserDropdown}
          >
            <Plus size={24} />
          </button>
          {isUserDropdownOpen && (
            <div
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
              className="absolute bottom-full right-0 mb-2 bg-white text-black shadow-lg rounded-md w-48 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate('/users-create');
                    setIsUserDropdownOpen(false);
                  }}
                >
                  Crear Usuario
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer relative"
                  onClick={togglePermissionDropdown}
                >
                  <div className="flex items-center justify-between">
                    Ver por Permisos <ChevronDown size={16} />
                  </div>
                  {isPermissionDropdownOpen && (
                    <div
                      onMouseEnter={() => setIsUserDropdownOpen(true)}
                      onMouseLeave={() => setIsUserDropdownOpen(false)}
                      className="absolute bottom-0 right-full bg-white text-black shadow-lg rounded-md w-48 z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate('/users')
                            setIsUserDropdownOpen(false);
                          }}
                        >
                          Ver Todo
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate('/users/is_staff/false')
                            setIsUserDropdownOpen(false);
                          }}
                        >
                          Clientes
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate('/users/is_staff/true')
                            setIsUserDropdownOpen(false);
                          }}
                        >
                          Empleados
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate('/users/is_superuser/true')
                            setIsUserDropdownOpen(false);
                          }}
                        >
                          Super Usuarios
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}