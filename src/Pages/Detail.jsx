import { useLocation, useParams } from 'react-router-dom'
import BgImage from '../assets/james.jpg'
import UsegetAllPriests from '../Hooks/usegetAllPriests'
//import { useAddImages } from '../Hooks/useAddImages'
import { useContext } from 'react'
import { PriestContext } from '../Context/useContextt'
import AnimatedPage from '../Layouts/AnimatedPage'



const Detail = () => {
  const {allPriestsImages, allPriestsCert} = useContext(PriestContext)
  const {id} = useParams()

const {pathname} = useLocation()

  const {allPriests} = UsegetAllPriests()

  const priest = allPriests.find((priest) => priest.priestID == id);

  const priestImage = allPriestsImages[id]
  const priestCert = allPriestsCert[id]

 // console.log(pathname)

 // console.log('venitus:', priestCert, priestImage)

 

  return (
    <AnimatedPage>
       <section className={`${pathname.startsWith('/directory') ? 'mt-24':'mt-14'} relative`}>
      <div style={{backgroundImage:`url(${BgImage})`}} className=" bg-blend-overlay bg-opacity-80 bg-stone-900 px-12 bg-cover bg-center bg-no-repeat py-12 ">
        <div className=' space-y-5 max-w-7xl mx-auto'>
          <h2 className=' text-2xl font-semibold text-primary'>Priest Details</h2>
          <h2 className=' text-4xl font-semibold text-white'>Rev. {priest?.fullname}</h2>
        </div>   
      </div>

      <div className=' bg-[#F3F3F3] py-10' >
        <div className=' max-w-6xl mx-auto  grid gap-6 grid-cols-12 '>
            <div className=' bg-white shadow-sm rounded-md py-3 px-5 col-span-12 md:col-span-3'>
                <div>
                  <img className=' z-50 block mx-auto rounded-full object-cover w-48 h-48' src={priestImage?.at(0)} alt='detail image'/>
                </div>

                <h2 className=' py-3 text-2xl'>Contact Info</h2>
              <ul className=' py-2 space-y-2'>
                <li className=' py-3 border-b border-b-gray-200'>
                  <h3 className=' font-semibold text-lg'>LOCATION</h3>
                  <p className='text-gray-700 text-base'>{priest?.address}</p>
                </li>
                <li className=' py-3 border-b border-b-gray-200'>
                  <h3 className=' font-semibold text-lg'>PHONE</h3>
                  <p className='text-gray-700 text-base'>{priest?.tel}</p>
                </li>
                <li className=' py-3 border-b border-b-gray-200'>
                  <h3 className=' font-semibold text-lg'>EMAIL</h3>
                  <p className='text-gray-700 text-base'>{priest?.email}</p>
                </li>

              </ul>
            </div>


            <div className=' space-y-5 bg-transparent col-span-12 md:col-span-9'>
              <div className=' rounded-md bg-white'>
                  <div className=' px-6 border-b border-b-gray-200 py-2'>
                    <h2 className='text-2xl'>Profile Description</h2>
                  </div>
                  <div className=' p-6'>
                      <ul className=' space-y-1.5'>
                        <li><span className=' text-lg font-semibold '>FullName</span> : {priest?.fullname}</li>
                        <li><span className=' text-lg font-semibold '>Gender</span> : {priest?.gender}</li>
                        <li><span className=' text-lg font-semibold '>Date of Birth</span> : {priest?.DateOfBirth}</li>
                        <li><span className=' text-lg font-semibold '>Date of Ordination</span>: {priest?.DateOfOrdination}</li>
                        <li><span className=' text-lg font-semibold '>Current Parish</span>: {priest?.currentParish}</li>
                      </ul>
                  </div>
              </div>

              <div className=' rounded-md bg-white'>
                  <div className=' px-6 border-b border-b-gray-200 py-2'>
                    <h2 className='text-2xl'>Qualifications</h2>
                  </div>
                  <div className=' p-6'>
                      <ul className=' space-y-1.5'>
                        <li><span className=' text-lg font-semibold '>Primary School</span> : {priest?.academics?.primary}</li>
                        <li><span className=' text-lg font-semibold '>Secondary School</span> : {priest?.academics?.secondary}</li>
                        <li><span className=' text-lg font-semibold '>Tertiary Institution</span> : {priest?.academics?.tertiary}</li>
                      </ul>
                  </div>
              </div>


              <div className=' rounded-md bg-white'>
                  <div className=' px-6 border-b border-b-gray-200 py-2'>
                    <h2 className='text-2xl'>Certificate</h2>
                  </div>
                  <div className=' p-6'>
                     <img className=' w-48 h-56 shadow-md' src={priestCert?.at(0)} alt='certificate'/>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </section>
    </AnimatedPage>
   
  )
}

export default Detail