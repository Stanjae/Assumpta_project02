import { deleteObject, ref } from "firebase/storage"
import { firebaseStorage } from "../Api/firebase"


const useDeleteMedia = () => {
  
    const deleteImages =async(item)=>{
        const imageref = ref(firebaseStorage, `images/${item.priestID}/`)
        const certref = ref(firebaseStorage, `certificate/${item.priestID}/`)
        try{
            const deleteImage = await deleteObject(imageref);
            const deletecert = await deleteObject(certref);

            Promise.all([deleteImage, deletecert]).then(()=>{
                console.log('both deleted sucessfully!!')
            })
        }catch(err){
            console.log('301 error:',err);
        }
    }
    return {deleteImages}
}

export default useDeleteMedia