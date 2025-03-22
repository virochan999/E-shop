import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../features/products/productSlice"
import { RootState, AppDispatch } from "../store/store"
import ProductCard from "../components/organisms/ProductCard"
import SearchBar from "../components/molecules/SearchBar"
import Filters from "../components/molecules/Filters"
import Spinner from "../components/organisms/Spinner"

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    items,
    loading,
    skip,
    limit,
    searchQuery,
    sortBy,
    order,
    category,
    priceRanges,
    hasMore,
  } = useSelector((state: RootState) => state.products)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  // Fetch products on initial render or when dependencies change
  useEffect(() => {
    if (skip === 0) {
      dispatch(
        fetchProducts({
          skip: 0,
          limit,
          search: searchQuery,
          sortBy,
          order,
          category,
        })
      )
    }
  }, [dispatch, limit, searchQuery, sortBy, order, category, skip])

  // Set up intersection observer to load more products when the user scrolls to the bottom
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          dispatch(
            fetchProducts({
              skip,
              limit,
              search: searchQuery,
              sortBy,
              order,
              category,
            })
          )
        }
      },
      { threshold: 1.0 }
    )

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current)

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [
    dispatch,
    skip,
    limit,
    loading,
    hasMore,
    searchQuery,
    sortBy,
    order,
    category,
  ])

  // Filter items based on selected price ranges
  const filteredItems = items.filter((item) => {
    if (priceRanges.length === 0) return true // No ranges selected, show all
    return priceRanges.some(
      (range) => item.price >= range.min && item.price <= range.max
    )
  })

  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center w-full">
      <SearchBar />
      <Filters />
      <div className="px-4 py-8 max-w-8xl mx-auto flex flex-col gap-6">
        {filteredItems.length === 0 && !loading ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
        {loading && <Spinner />}
        {!loading && hasMore && (
          <div
            ref={loadMoreRef}
            className="h-10"
          ></div>
        )}
      </div>
    </div>
  )
}

export default Home
