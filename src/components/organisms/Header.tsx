import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          E-Shop
        </Link>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Cart ({cartItemCount})
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
