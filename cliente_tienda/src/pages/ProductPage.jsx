import { ProductList } from "../components/ProductList"
import { useNavigate, useParams } from "react-router-dom"


export function ProductPage() {
  const params = useParams();
  console.log(params.id)
  return (
    
    <ProductList category_id={params.id}></ProductList>
  )
}

