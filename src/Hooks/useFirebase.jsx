import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { firebaseDb } from "../Api/firebase"



export const useFirebase =()=>{
    const priestCollectionRef = collection(firebaseDb, 'priestsData');

    const addPriestToDb =async(priestData)=>{
        await addDoc(priestCollectionRef,{
            fullname:priestData.fullname , email:priestData.email, title:priestData.title, DateOfBirth:priestData.DateOfBirth, tel:priestData.tel,
            PlaceOfBirth:priestData.PlaceOfBirth, gender:priestData.gender, DateOfOrdination:priestData.DateOfOrdination, address:priestData.address,
            currentParish:priestData.currentParish,
                academics:{primary:priestData.academics.primary, 
                            secondary:priestData.academics.secondary, 
                            tertiary:priestData.academics.tertiary
                            }, 
                priestID:priestData.priestID,
                createdAt:serverTimestamp()
        })
    }
    return {addPriestToDb}
}