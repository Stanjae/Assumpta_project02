import { useState } from "react"
import CreateUpdate from "../Components/Crud/CreateUpdate"
import Alerts from "../Components/Alerts"
import { useLocation } from "react-router-dom"
import AnimatedPage from "../Layouts/AnimatedPage"


const CreateRegistry = () => {
  const [alertInfo, setAlertInfo] = useState({color:'', isAlert:false, message:''})
  const {pathname} = useLocation()
  return (
    <AnimatedPage>
      <section className={`${pathname === '/dashboard' ? 'mt-24 relative':'mt-14 relative'} relative py-12`} style={{ background: "linear-gradient(106.89deg, #C2C8E4 15.73%, #C2C8E4 15.74%, #2EA069 56.49%, #04ABF0 115.91%)" }}>
      {alertInfo.isAlert && <Alerts setAlertInfo={setAlertInfo} alertInfo={alertInfo}/>}
        <div className=" mx-auto max-w-6xl">
            <CreateUpdate setAlertInfo={setAlertInfo} type={'Create'} />
        </div>
    </section>
    </AnimatedPage>
    
  )
}

export default CreateRegistry