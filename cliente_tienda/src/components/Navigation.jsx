import { Link } from "react-router-dom"

export function Navigation() {
  return (
    <div className="flex justify-between py-3">
      <button className="bg-indigo-500 px-3 py-2 rounded-lg">
        <Link to="/products">Products List</Link>

      </button>
      <button className="bg-indigo-500 px-3 py-2 rounded-lg">
        <Link to="/product-create" >Create Product</Link>
      </button>
    </div>
  )
}

