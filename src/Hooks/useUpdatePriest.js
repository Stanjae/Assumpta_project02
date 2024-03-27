import { doc, updateDoc } from "firebase/firestore"
import { firebaseDb } from "../Api/firebase"
import UsegetAllPriests from "./usegetAllPriests"




export const useUpdatePriest =()=>{
    const {getPriestData} = UsegetAllPriests()
    const updatePriestData =async(dataID, newData)=>{
        const updateRef = doc(firebaseDb, 'priestsData', dataID);
        try{
            await updateDoc(updateRef, newData);
            getPriestData();
        }catch(err){
            console.log(err)
        }
    }

    return {updatePriestData}
}