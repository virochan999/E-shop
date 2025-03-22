import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { ProductState, Product, PriceRange } from "../../types/product"
import { apiUrl } from "../../api/apiUrl"

interface FetchProductsArgs {
  skip: number
  limit: number
  search?: string
  sortBy?: "title" | "price"
  order?: "asc" | "desc"
  category?: string
}

interface FetchProductsResponse {
  products: Product[]
  total: number
}

const predefinedRanges: PriceRange[] = [
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$51 - $100", min: 51, max: 100 },
  { label: "$101 - $200", min: 101, max: 200 },
  { label: "$201+", min: 201, max: Infinity },
]

// fetch products from API based on given arguments
export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  FetchProductsArgs
>(
  "products/fetchProducts",
  async ({ skip, limit, search, sortBy, order, category }) => {
    let url = apiUrl.base_url
    if (category) url += `/category/${category}`
    if (search) url += `/search`
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    })
    if (search) params.append("q", search)
    if (sortBy) params.append("sortBy", sortBy)
    if (order) params.append("order", order)
    url += `?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()
    return { products: data.products, total: data.total }
  }
)

const initialState: ProductState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "title",
  order: "asc",
  category: "",
  minPrice: 0,
  maxPrice: Infinity,
  hasMore: true,
  priceRanges: [],
}

// slice for products
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // set search query
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
      state.items = []
      state.skip = 0
    },
    // set sort
    setSort(
      state,
      action: { payload: { sortBy: "title" | "price"; order: "asc" | "desc" } }
    ) {
      state.searchQuery = ""
      state.sortBy = action.payload.sortBy
      state.order = action.payload.order
      state.items = []
      state.skip = 0
    },
    setCategory(state, action) {
      state.searchQuery = ""
      state.category = action.payload
      state.items = []
      state.skip = 0
    },
    setPriceRange(state, action: PayloadAction<PriceRange[]>) {
      state.priceRanges = action.payload
    },
    resetSkip(state) {
      state.skip = 0
    },
  },

  /**
   * Handles additional action types for the product slice.
   *
   * Utilizes the Redux Toolkit's builder API to manage asynchronous actions
   * related to product fetching.
   *
   * - On `fetchProducts.pending`: Sets loading state to true.
   * - On `fetchProducts.rejected`: Sets loading state to false and records error message.
   * - On `fetchProducts.fulfilled`: Updates loading state, products, total count,
   *   pagination info, and determines if more products are available for fetching.
   *
   * @param builder - The builder object provided by Redux Toolkit to handle action types.
   */

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items =
          state.skip === 0
            ? action.payload.products
            : [...state.items, ...action.payload.products]
        state.total = action.payload.total
        state.skip += state.limit
        state.hasMore = action.payload.products.length === state.limit
      })
  },
})

export const {
  setSearchQuery,
  setSort,
  setCategory,
  setPriceRange,
  resetSkip,
} = productSlice.actions
export default productSlice.reducer

export { predefinedRanges }
