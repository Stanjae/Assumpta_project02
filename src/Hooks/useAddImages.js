import { useEffect, useState } from "react";
import { firebaseStorage } from "../Api/firebase";
import { ref, uploadBytes, getDownloadURL, listAll} from "firebase/storage";


export const useAddImages =()=>{
    const [allPriestsImages, setAllPriestsImages] = useState({});
    const [allPriestsCert, setAllPriestsCert] = useState({});

    const imageReff = ref(firebaseStorage, `images/`)
    const imageReff2 = ref(firebaseStorage, `certificates/`)

    const metadata = {
        contentType: 'image/jpg',
      };

    const AddImages = async(priestImages)=>{
        const imageRef = ref(firebaseStorage, `images/${priestImages.priestID}/${priestImages.passport.name}`, metadata);
        const imageRef2 = ref(firebaseStorage, `certificates/${priestImages.priestID}/${priestImages.certificate.name}`, metadata);

       

        const Upload1 = await uploadBytes(imageRef, priestImages.passport)
        const Upload2 = await uploadBytes(imageRef2, priestImages.certificate)

        Promise.all([Upload1, Upload2]).then((snapshotArr)=>{
            //console.log('snapshotArr: ',snapshotArr);
            let imageurlList = []
            snapshotArr.forEach((snapshot)=>{
                console.log('snapshot: ',snapshot);
                getDownloadURL(snapshot.ref).then((url)=>{
                    imageurlList.push(url)
                })
                
            })
            console.log('sanctus: ',imageurlList,)
            setAllPriestsImages(prevUrls => ({...prevUrls, [priestImages.priestID]:imageurlList[0] }))
            setAllPriestsCert(prevUrls => ({...prevUrls, [priestImages.priestID]:imageurlList[1]}))
        })

    }

    useEffect(()=>{
    const loadImagesurl =async()=>{
        await listAll(imageReff).then((response)=>{
            response.prefixes.forEach((folderRef)=>{
                listAll(ref(firebaseStorage, `${folderRef.fullPath}`)).then((item)=>{
                    let yours = [];
                    item.items.forEach((image)=>{
                        getDownloadURL(image).then((url)=>{
                            yours.push(url)
                           
                        });
                    });
                    setAllPriestsImages(prevUrls => ({...prevUrls, [folderRef.name]:yours}))
                    
                })
            })
        })
    }
    loadImagesurl();
    },[]);

    useEffect(()=>{
       const oarimo =async()=>{ 
        await listAll(imageReff2).then((response)=>{
            response.prefixes.forEach((folderRef)=>{
                listAll(ref(firebaseStorage, `${folderRef.fullPath}`)).then((item)=>{
                    let yours = [];
                    item.items.forEach((image)=>{
                        getDownloadURL(image).then((url)=>{
                            yours.push(url)
                           
                        });
                    });
                    //console.log('response, ', yours)
                    setAllPriestsCert(prevUrls => ({...prevUrls, [folderRef.name]:yours}))
                    
                })
            })
        })
    }
    oarimo();
       
    },[])
    
    return {AddImages, allPriestsImages, allPriestsCert}
}