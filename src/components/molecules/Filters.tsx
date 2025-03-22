import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import {
  setSort,
  setCategory,
  setPriceRange,
  predefinedRanges,
} from "../../features/products/productSlice"
import useDataFetch from "../../hooks/useDataFetch"
import { useEffect, useState } from "react"

const Filters = () => {
  const dispatch = useDispatch()
  const { sortBy, order, category, priceRanges } = useSelector(
    (state: RootState) => state.products
  )
  const [categories, setCategories] = useState<string[]>([])
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)

  // Fetch categories using useDataFetch
  const { loading, error, fetchData } = useDataFetch()

  useEffect(() => {
    fetchData({
      apiEndpoint: "/category-list",
      onSuccess: (data) => setCategories(data),
      onError: (err) => console.error("Failed to fetch categories:", err),
    })
  }, [])

  const handlePriceRangeChange = (
    range: (typeof predefinedRanges)[number],
    checked: boolean
  ) => {
    const updatedRanges = checked
      ? [...priceRanges, range]
      : priceRanges.filter((r) => r.label !== range.label)
    dispatch(setPriceRange(updatedRanges))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Sort Dropdown */}
      <select
        value={`${sortBy}-${order}`}
        id="sort"
        onChange={(e) => {
          const [sortBy, order] = e.target.value.split("-")
          dispatch(
            setSort({
              sortBy: sortBy as "title" | "price",
              order: order as "asc" | "desc",
            })
          )
        }}
        className="p-2 border-t border-t-blue-200 rounded-lg shadow-sm text-blue-500"
      >
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>

      {/* Category Dropdown */}
      <select
        value={category}
        id="category"
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="p-2 rounded-lg shadow-sm border-t border-t-blue-200 text-blue-500"
        disabled={loading || !!error}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option
            key={cat}
            value={cat}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* Price Range Dropdown with Checkboxes */}
      <div className="relative">
        <button
          onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
          className="p-2 border-t border-t-blue-200 rounded-lg shadow-sm text-blue-500 bg-white hover:bg-gray-100"
        >
          Price Range {priceRanges.length > 0 ? `(${priceRanges.length})` : ""}
          <span className="material-symbols-outlined flex justify-center items-center"></span>
        </button>
        {isPriceDropdownOpen && (
          <div className="absolute z-10 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
            {predefinedRanges.map((range) => (
              <label
                key={range.label}
                className="flex items-center text-blue-500 hover:text-gray-700 gap-2 py-1 px-1 hover:bg-blue-300 hover:rounded"
              >
                <input
                  type="checkbox"
                  id={`price-range-${range.label}`}
                  checked={priceRanges.some((r) => r.label === range.label)}
                  onChange={(e) =>
                    handlePriceRangeChange(range, e.target.checked)
                  }
                  className="form-checkbox text-blue-500"
                />
                <span className="">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Filters
