import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import Home from "../pages/Home"
import { fetchProducts } from "../features/products/productSlice"
import { Product, ProductState } from "../types/product"
import "../__mocks__/intersectionObserverMock"

jest.mock("../features/products/productSlice", () => {
  const originalModule = jest.requireActual("../features/products/productSlice")
  return {
    __esModule: true,
    ...originalModule,
    fetchProducts: jest.fn(),
  }
})

jest.mock("../components/organisms/ProductCard", () => ({
  __esModule: true,
  default: ({ product }: { product: Product }) => (
    <div data-testid={`product-${product.id}`}>{product.title}</div>
  ),
}))

jest.mock("../components/molecules/SearchBar", () => ({
  __esModule: true,
  default: () => <div data-testid="search-bar">Search Bar</div>,
}))

jest.mock("../components/molecules/Filters", () => ({
  __esModule: true,
  default: () => <div data-testid="filters">Filters</div>,
}))

jest.mock("../components/organisms/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="spinner">Loading...</div>,
}))

describe("Home Component", () => {
  let store: ReturnType<typeof configureStore>

  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Product 1",
      price: 49.99,
      description: "Description 1",
      category: "electronics",
      thumbnail: "img1.jpg",
      stock: 10,
    },
    {
      id: 2,
      title: "Product 2",
      price: 99.99,
      description: "Description 2",
      category: "clothing",
      thumbnail: "img2.jpg",
      stock: 5,
    },
    {
      id: 3,
      title: "Product 3",
      price: 149.99,
      description: "Description 3",
      category: "books",
      thumbnail: "img3.jpg",
      stock: 3,
    },
  ]

  const initialState: ProductState = {
    items: mockProducts,
    total: 100,
    loading: false,
    error: null,
    skip: 0,
    limit: 10,
    searchQuery: "",
    sortBy: "title",
    order: "asc",
    category: "",
    priceRanges: [],
    minPrice: 0,
    maxPrice: Infinity,
    hasMore: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetchProducts as unknown as jest.Mock).mockReturnValue({
      type: "products/fetchProducts/fulfilled",
    })

    store = configureStore({
      reducer: {
        products: (state = initialState) => state,
      },
    })
    store.dispatch = jest.fn().mockImplementation(() => Promise.resolve())
  })

  it("should fetch products on initial render", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(fetchProducts).toHaveBeenCalledWith({
      skip: 0,
      limit: 10,
      search: "",
      sortBy: "title",
      order: "asc",
      category: "",
    })
  })

  it("should display products when data is loaded", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    expect(screen.getByTestId("product-1")).toBeInTheDocument()
    expect(screen.getByTestId("product-2")).toBeInTheDocument()
    expect(screen.getByTestId("product-3")).toBeInTheDocument()
  })

  it("should display loading spinner when loading", () => {
    const loadingStore = configureStore({
      reducer: {
        products: (state = { ...initialState, loading: true }) => state,
      },
    })

    render(
      <Provider store={loadingStore}>
        <Home />
      </Provider>
    )

    expect(screen.getByTestId("spinner")).toBeInTheDocument()
  })

  it("should filter products based on price ranges", () => {
    const storeWithPriceFilter = configureStore({
      reducer: {
        products: (
          state = {
            ...initialState,
            priceRanges: [{ label: "$0 - $50", min: 0, max: 50 }],
          }
        ) => state,
      },
    })

    render(
      <Provider store={storeWithPriceFilter}>
        <Home />
      </Provider>
    )

    expect(screen.getByTestId("product-1")).toBeInTheDocument()
    expect(screen.queryByTestId("product-2")).not.toBeInTheDocument()
    expect(screen.queryByTestId("product-3")).not.toBeInTheDocument()
  })

  it('should show "No products found" message when no products match filters', () => {
    const emptyStore = configureStore({
      reducer: {
        products: (state = { ...initialState, items: [] }) => state,
      },
    })

    render(
      <Provider store={emptyStore}>
        <Home />
      </Provider>
    )

    expect(screen.getByText("No products found.")).toBeInTheDocument()
  })
})
