import { useEffect,useState } from "react"
import { get_products_by_category, getAllProducts } from "../api/products.api"
import { ProductCard } from "./ProductCard"
export function ProductList({category_id}) {

    const [products,setProducts]=useState([])

    useEffect(()=>{
      async  function loadProducts(){
            const res= await get_products_by_category(category_id)
            console.log(res.data['products'])
            setProducts(res.data['products'])
        }
        loadProducts()
    },[])
    
  return (
    <div className="grid grid-cols-3 gap-3">
        {products.map(product=>(
           <ProductCard key={product.id} product={product}/>
        ))}
        
    </div>
  )
}
