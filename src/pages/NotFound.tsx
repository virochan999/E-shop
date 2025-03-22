import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl">Page Not Found</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline mt-4 inline-block"
      >
        Back to Home
      </Link>
    </div>
  )
}
export default NotFound
