import { createBrowserRouter } from "react-router-dom"
import React from "react"
import Layout from "../layouts/BaseLayout"
const Details = React.lazy(() => import("../pages/Details"))
const NotFound = React.lazy(() => import("../pages/NotFound"))
const Home = React.lazy(() => import("../pages/Home"))
const Cart = React.lazy(() => import("../pages/Cart"))

export const router = createBrowserRouter([
  {
    path: "/*",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <Details />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])
