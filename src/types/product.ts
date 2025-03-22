export interface Product {
  id: number
  title: string
  price: number
  description: string
  thumbnail: string
  stock: number
  category: string
}

export interface PriceRange {
  label: string
  min: number
  max: number
}

export interface ProductState {
  items: Product[]
  total: number
  loading: boolean
  error: string | null
  skip: number
  limit: number
  searchQuery: string
  sortBy: "title" | "price"
  order: "asc" | "desc"
  category: string
  minPrice: number
  hasMore: boolean
  maxPrice: number
  priceRanges: PriceRange[]
}
