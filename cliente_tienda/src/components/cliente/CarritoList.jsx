import { useEffect, useState } from "react"
import {searchUserProducts} from '../../api/products.api'
import { CarritoCard } from "./CarritoCard"
export function CarritoList({searchValue }) {

  const [products, setProducts] = useState([])
  
  useEffect(() => {
    async function loadProducts() {
      try {
        
        
        

        if (searchValue!=undefined) {
        const res= await searchUserProducts(searchValue)
        
        setProducts(res.data)
         
        }
          

        
      } catch {
        console.log("Error al cargar los datos")
      }

    }
    loadProducts()
  }, [searchValue])

  console.log(products)

  return (
    <div className="grid grid-cols-3 gap-3">
      {products.map(product => (
        <CarritoCard key={product.id} product={product} />
      ))}

    </div>
  )
}