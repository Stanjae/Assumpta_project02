import { deleteDoc, doc } from "firebase/firestore"
import { firebaseDb } from "../Api/firebase"



const useDeleteData = () => {
 
    const deleteData =async(item)=>{
        const lol = doc(firebaseDb, 'priestsData', item.id)
    try{
        await deleteDoc(lol)
    }catch(err){
        console.log(err);
    }
        
    }
    return {deleteData}
}

export default useDeleteData
