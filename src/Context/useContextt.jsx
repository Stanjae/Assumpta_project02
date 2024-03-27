import  { createContext, useEffect } from 'react'
import { useAddImages } from '../Hooks/useAddImages'
import UsegetAllPriests from '../Hooks/usegetAllPriests'
import { firebaseAuth } from '../Api/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const PriestContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const UseContextt = ({children}) => {
    const {allPriestsImages, allPriestsCert} = useAddImages()

    const auth = firebaseAuth
  

    const {allPriests} = UsegetAllPriests()

    useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        if(user){
          const AuthDetails = {email:user?.email, uid:user?.uid, initials:user?.email?.toUpperCase().slice(0,2)}
          sessionStorage.setItem("currentUser", JSON.stringify(AuthDetails))
        }else{
          sessionStorage.clear();
          console.log('User not authenticated!');
        }
      })
    },[auth])


  return (
   <PriestContext.Provider value={{allPriestsImages, allPriests, allPriestsCert}}>
   {children}
   </PriestContext.Provider>
  )
}

