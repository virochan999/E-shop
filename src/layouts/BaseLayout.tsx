import { Outlet } from "react-router-dom"
import Header from "../components/organisms/Header"
import Footer from "../components/organisms/Footer"

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
