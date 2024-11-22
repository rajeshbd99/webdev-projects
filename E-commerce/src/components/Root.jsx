import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"

export const Root = () => {
  return (
    <div>
        <Navbar />
        <Outlet/>
        <Footer/>
    </div>
  )
}
