import { Footer } from "../Components/Footer"
import {Outlet} from 'react-router-dom'
import Navbar from "../Components/NavGroup/Navbar"



const DefaultLayout = () => {
  return (
    <>
    <Navbar/>
    <main className=" relative">
      <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default DefaultLayout