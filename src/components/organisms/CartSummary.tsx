import { useDispatch } from "react-redux"
import { clearCart } from "../../features/cart/cartSlice"
import Button from "../atoms/Button"

interface CartSummaryProps {
  totalPrice: number
}

const CartSummary = ({ totalPrice }: CartSummaryProps) => {
  const dispatch = useDispatch()

  return (
    <div className="mt-6 flex justify-between items-center">
      <p className="text-xl font-bold text-gray-800">
        Total: ${totalPrice.toFixed(2)}
      </p>
      <div className="space-x-4">
        <Button
          onClick={() => dispatch(clearCart())}
          variant="danger"
          className="text-red-600"
        >
          Clear Cart
        </Button>
        <Button variant="primary">Checkout</Button>
      </div>
    </div>
  )
}

export default CartSummary
