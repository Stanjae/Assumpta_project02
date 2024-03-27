import { useState } from "react"
import Alerts from "../Components/Alerts"
import Updater from "../Components/Crud/Updater"



const UpdateRegistry = () => {
  const [alertInfo, setAlertInfo] = useState({color:'', isAlert:false, message:''})
    
  return (
    <section className=" py-12 mt-24 relative " 
    style={{ background: "linear-gradient(106.89deg, #C2C8E4 15.73%, #C2C8E4 15.74%, #2EA069 56.49%, #04ABF0 115.91%)" }}>
         {alertInfo.isAlert && <Alerts setAlertInfo={setAlertInfo} alertInfo={alertInfo}/>}
        <div className=" mx-auto max-w-6xl">
            <Updater setAlertInfo={setAlertInfo} type={'Update'}/>
        </div>
    </section>
  )
}

export default UpdateRegistry