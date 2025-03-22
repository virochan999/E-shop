import { RouterProvider } from "react-router-dom"
import "./App.css"
import { router } from "./route/routes"
import { Toaster } from "sonner"
import { Suspense } from "react"
import Loader from "./components/organisms/Loader"

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          closeButton
        />
      </Suspense>
    </>
  )
}

export default App
