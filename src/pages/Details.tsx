import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Product } from "../types/product"
import { addToCart } from "../features/cart/cartSlice"
import Spinner from "../components/organisms/Spinner"
import { toast } from "sonner"

const Details = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    /**
     * Fetches a product from dummyjson.com by its id.
     * @param {string} id - The id of the product to fetch.
     * @returns {Promise<void>}
     */
    const fetchProduct = async () => {
      setLoading(true)
      const response = await fetch(`https://dummyjson.com/products/${id}`)
      const data = await response.json()
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity: 1 }))
      toast.success("Item added to cart")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <Spinner />
      </div>
    )
  }
  if (!product) {
    return <p className="text-center text-gray-500 mt-10">Product not found.</p>
  }

  return (
    <div className="bg-gray-50 flex justify-center items-center w-full">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Products
        </Link>
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-600 text-lg mt-2">${product.price}</p>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <p className="text-gray-500 mt-2">Stock: {product.stock}</p>
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
