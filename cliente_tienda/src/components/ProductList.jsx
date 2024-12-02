import { useEffect,useState } from "react"
import { get_products_by_category, getAllProducts } from "../api/products.api"
import { ProductCard } from "./ProductCard"
export function ProductList({category_id}) {

    const [products,setProducts]=useState([])
    console.log('estoy en ProductList'+category_id)
    useEffect(()=>{
      async  function loadProducts(){
        if(category_id!=undefined){
          const res= await get_products_by_category(category_id)
            
            setProducts(res.data['products'])

        }else{
          const res= await getAllProducts()
            
            setProducts(res.data)
        }
            
        }
        loadProducts()
    },[category_id])
    
  return (
    <div className="grid grid-cols-3 gap-3">
        {products.map(product=>(
           <ProductCard key={product.id} product={product}/>
        ))}
        
    </div>
  )
}
