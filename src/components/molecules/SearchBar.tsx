import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchQuery } from "../../features/products/productSlice"
import Input from "../atoms/Input"
import useDebounce from "../../hooks/useDebounce"

const SearchBar = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState("")

  const debouncedSearch = useDebounce((value: string) => {
    dispatch(setSearchQuery(value))
  }, 500)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedSearch(value)
  }

  return (
    <div className="my-4 relative">
      <Input
        type="text"
        id="search"
        name="search"
        value={inputValue}
        placeholder="Search products..."
        className="w-full p-2 border rounded pr-10 text-black"
        onChange={handleSearch}
      />
    </div>
  )
}

export default SearchBar
