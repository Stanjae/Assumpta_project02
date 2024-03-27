import { Navigate } from "react-router-dom"

const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

// eslint-disable-next-line react/prop-types
const ProtectAuthRoutes = ({children}) => {
    if(currentUser){
        return <Navigate to={'/dashboard'}/> 
       } 
  return (
    <>
      {children}
    </>
  )
}

export default ProtectAuthRoutes
