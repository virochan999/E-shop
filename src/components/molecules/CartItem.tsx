import { useDispatch } from "react-redux"
import { CartItem as CartItemType } from "../../types/cart"
import { removeFromCart, updateQuantity } from "../../features/cart/cartSlice"
import Input from "../atoms/Input"
import Button from "../atoms/Button"
import { toast } from "sonner"

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch()

  const removeItem = (id: number) => {
    toast.success("Item removed from cart")
    dispatch(removeFromCart(id))
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
      <img
        src={item.product.thumbnail}
        alt={item.product.title}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {item.product.title}
        </h3>
        <p className="text-gray-600">
          ${item.product.price} x {item.quantity}
        </p>
        <p className="text-gray-700 font-medium">
          Total: ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Input
          name="quantity"
          id="quantity"
          type="number"
          value={item.quantity}
          onChange={(e) =>
            dispatch(
              updateQuantity({
                productId: item.product.id,
                quantity: Number(e.target.value),
              })
            )
          }
          min="1"
          className="w-16"
        />
        <Button
          onClick={() => removeItem(item.product.id)}
          variant="danger"
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default CartItem
