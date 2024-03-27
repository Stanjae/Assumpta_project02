import { Navigate } from "react-router-dom";


const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({children}) => {

    if(!currentUser?.email){
        return <Navigate to={'/'}/>
    }

  return (
    <>
     {children} 
    </>
  )
}

export default ProtectedRoutes
