import { Product } from "../../types/product"
import { Link } from "react-router-dom"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 object-cover object-center"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          ${product.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mt-1 h-10 line-clamp-2">
          {product.description}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="mt-3 block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
