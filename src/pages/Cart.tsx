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
      <div className="bg-gray-50 flex justify-center items-center w-full">
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className="bg-gray-50 flex w-full">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Your Cart Items
        </h1>
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
