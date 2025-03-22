import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem, CartState } from "../../types/cart"

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      )
      if (existingItem) {
        // If item exists, update quantity
        existingItem.quantity += quantity
      } else {
        // If item doesn't exist, add it
        state.items.push({ product, quantity })
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      // Remove item by product ID
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      )
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      // Update quantity of an item
      const { productId, quantity } = action.payload
      const item = state.items.find((item) => item.product.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },
    clearCart(state) {
      // Clear all items
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
