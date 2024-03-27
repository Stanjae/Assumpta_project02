
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './Layouts/DefaultLayout'
import Home from './Pages/Home'
import Directory, { ALoader } from './Pages/Directory'
import Detail from './Pages/Detail'
import {Login} from './Pages/Auth/Login'
import DashboardLayout from './Layouts/DashboardLayout'
import { ErrorPage } from './Components/ErrorPage'
import ContactUs from './Pages/ContactUs'
import CreateRegistry from './Pages/CreateRegistry'
import UpdateRegistry from './Pages/UpdateRegistry'
import { UseContextt } from './Context/useContextt'
import { Loader } from './Components/Loader'
import { AnimatePresence } from 'framer-motion'
import { SignUp } from './Pages/Auth/SignUp'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Dash from './Pages/Auth/Dash'
import ProtectAuthRoutes from './utils/ProtectAuthRoutes'


function App() {


  const router = createBrowserRouter([
    {path:'/',element:<DefaultLayout />, errorElement:<ErrorPage/>,
      children:[
        {index:true,element:<Home/>},
        {path:'directory', loader:ALoader ,element: <Directory/> },
        {path:'directory/detail/:id', element: <Detail/>},
        {path:'contact', element:<ContactUs/>},
        {path:'create-registry', element:<CreateRegistry/>},
    ]},
    {path:'/wp-admin', element:<ProtectAuthRoutes><Login/></ProtectAuthRoutes>},
    {path:'/auth/signup', element:<SignUp/>},
    {path:'/dashboard', errorElement:<ErrorPage/>, element:<ProtectedRoutes><DashboardLayout/></ProtectedRoutes>, children:[
      {index:true, element:<Dash/>},
      {path:'/dashboard/directory', loader:ALoader, element:<Directory/>},
      {path:'/dashboard/update-registry/:id', element:<UpdateRegistry/>},
      {path:'/dashboard/create-registry', element:<CreateRegistry/>},
      {path:'/dashboard/directory/detail/:id', element: <Detail/>},
    ]}
  ])

  return (
    <UseContextt>
      <AnimatePresence>
         <RouterProvider fallbackElement={<Loader/>} router={router }/>
      </AnimatePresence>
     
    </UseContextt>
    
  )
}

export default App
