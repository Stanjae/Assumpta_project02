import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { firebaseDb } from "../Api/firebase"



const UsegetAllPriests = () => {
  
    const [allPriests, setAllPriests] = useState([])

    const PriestsCollectonRef = collection(firebaseDb, "priestsData")

    const getPriestData =async()=>{
        let suscribe;
        try{
            const query1 = query(PriestsCollectonRef, orderBy('fullname'));

            suscribe = onSnapshot(query1, (snapshot) => {
                let list = []
                snapshot.docs.forEach((doc) => {
                    list.push({ ...doc.data(), id: doc.id })
                })
                setAllPriests(list)
                //console.log(list)

                setAllPriests(list)
            })

           
        }catch(err){
            console.log(err)
        }

        return ()=> suscribe()
    }

    useEffect(()=>{
        getPriestData()
    },[])

    return{allPriests }
}

export default UsegetAllPriests