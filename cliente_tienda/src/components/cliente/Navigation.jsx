import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { Menu, ChevronDown, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/categories.api";
import { searchProducts } from "../../api/products.api";
import { NavLink } from 'react-router-dom'


export function Navigation() {

  const [searchCriteria, setSearchCriteria] = useState('nombre')

  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    async function loadCategorias() {

      const res = await getAllCategories()

      setCategorias(res.data)

    }


    loadCategorias()

  }, [])

  const navigate = useNavigate();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');



  const toggleCategoryDropdown = (e) => {
    e.stopPropagation();
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };



  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando producto:', searchTerm);
    console.log(searchCriteria)
    navigate('/products/' + searchCriteria + '/' + searchTerm)



  };

  return (

    <nav className="bg-indigo-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o Título */}

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `text-xl font-bold hover:scale-110 transition-transform duration-300 ease-in-out ${isActive ? 'scale-150' : 'text-white'
            }`
          }
        >
          Productos
        </NavLink>

        {/* Submenu de Categorías */}
        <div

          className="px-4 py-2  cursor-pointer relative"
          onClick={toggleCategoryDropdown}
        >
          <div className="flex items-center justify-between">
            Ver por Categoría <ChevronDown size={16}
            />
          </div>

          {isCategoryDropdownOpen && (
            <div
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
              className="absolute top-full left-0 bg-white text-black shadow-lg rounded-md w-48 z-20"
              onClick={(e) => e.stopPropagation()}
            >

              <ul className="py-2">
                {categorias.map(categoria => (
                  //<ProductCard key={product.id} product={product}/>

                  <li key={categoria.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/products/categoria_id/' + categoria.id)
                      setIsCategoryDropdownOpen(false);

                    }}

                  >
                    {categoria.nombre_categoria}
                  </li>
                ))}


              </ul>
            </div>
          )}
        </div>

        <div></div>

        <div></div>

        <div></div>

        <Link

          className="text-xl font-bold hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          Nosotros
        </Link>

        <Link

          className="text-xl font-bold hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          Registrate
        </Link>
        <Link
          className="text-xl font-bold hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          Ingresa
        </Link>

        <Link
          className="text-xl font-bold hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          Carrito
        </Link>


        {/* Barra de Búsqueda */}
        {
          isSearchOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder={"Buscar producto por " + searchCriteria}
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
                //absolute top-full left-0 bg-white text-black shadow-lg rounded-md mt-2 w-48 z-10
                >
                  <option value="nombre">Nombre</option>
                  <option value="precio" >Precio</option>
                  <option value="estado_producto">Estado</option>
                  <option value="cantidad_producto">Cantidad</option>
                  {/* <option value="categoria">Categoria</option> */}
                </select>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="mt-4 w-full bg-indigo-500 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )
        }
      </div >
    </nav >


  )
}