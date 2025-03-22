import { Link } from "react-router-dom"

const EmptyCart = () => {
  return (
    <div className="text-center">
      <p className="text-gray-500 text-lg">Your cart is empty.</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline mt-4 inline-block"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default EmptyCart
