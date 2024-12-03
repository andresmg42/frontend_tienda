import { ProductList } from "../components/ProductList"
import { useNavigate, useParams } from "react-router-dom"


export function ProductPage() {
  const params = useParams(); // Obtén todos los parámetros como un objeto
  const { criteria, value } = params;
  console.log(params.id)
  return (
    
    <ProductList searchCriteria={criteria} searchValue={value} ></ProductList>
  )
}

