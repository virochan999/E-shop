import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import CartItem from "../components/molecules/CartItem"
import CartSummary from "../components/organisms/CartSummary"
import EmptyCart from "../components/organisms/EmptyCart"

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 flex justify-center items-center w-full min-h-screen">
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className="bg-gray-50 flex justify-center items-center w-full min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
            />
          ))}
        </div>
        <CartSummary totalPrice={totalPrice} />
      </div>
    </div>
  )
}

export default Cart
