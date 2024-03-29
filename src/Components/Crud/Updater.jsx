import {UserIcon, EnvelopeIcon, CalendarIcon, AcademicCapIcon, MapIcon, BuildingOfficeIcon,
    HomeModernIcon, IdentificationIcon, ChevronDownIcon, PhoneIcon} from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {PropTypes} from 'prop-types'
import { v4 as uuidv4 } from 'uuid';
import { useAddImages } from '../../Hooks/useAddImages';
import { PriestContext } from '../../Context/useContextt';
import { useParams } from 'react-router-dom';
import { useUpdatePriest } from '../../Hooks/useUpdatePriest';



const Updater = ({type, setAlertInfo}) => {

    const {allPriestsImages, allPriests} = useContext(PriestContext)
    const {id} = useParams()

    const foundData = allPriests?.find(item => item.priestID == id);
    const priestimages = allPriestsImages[id];

    const [ isClose, setIsClose ] = useState(false);

    const [isSubmitting, setIsSubmitting ] = useState(false)


    const {updatePriestData} = useUpdatePriest()

    const {AddImages} = useAddImages()



    const { register, handleSubmit, setValue, formState:{errors}} = useForm({
        defaultValues:{
            details:{
                fullname:'', email:'', title:'',  address:'', currentParish:'', DateOfBirth:'', DateOfOrdination:'', tel:'', PlaceOfBirth:'', gender:'male',
                academics:{primary:"", secondary:'', tertiary:'', certiticate:""}, passport:''
            }
            
        }
    })

    const onUpdateSubmit = async(data) => {
        const submittedData = {...data.details, academics:{...data.details.academics,  certiticate:""}, passport:'', priestID:uuidv4()}
        const imageData = {certificate: data.details.academics.certiticate[0], passport: data.details.passport[0], 
            priestID:submittedData.priestID}
        
        setIsSubmitting(true);
        try{
            await updatePriestData(foundData.id, submittedData);
            await AddImages(imageData)
            setAlertInfo({isAlert:true, message:'Data Updated Sucessfully', color:'green'})
            setIsSubmitting(false)
            setTimeout(()=> window.location.assign('/dashboard'), 1500)
        }catch(err){
            console.log(err)
            setAlertInfo({isAlert:true, message:'An Error Occured', color:'red'});
            setIsSubmitting(false);
        }

    }

    useEffect(()=>{
        if(type === 'Update'){
            setValue("details", {
                fullname: foundData?.fullname,
                email: foundData?.email,
                title: foundData?.title,
                DateOfBirth: foundData?.DateOfBirth,
                PlaceOfBirth: foundData?.PlaceOfBirth,
                gender: foundData?.gender,
                address:foundData?.address,
                tel:foundData?.tel,
                DateOfOrdination:foundData?.DateOfOrdination,
                currentParish:foundData?.currentParish,
                academics:{
                    primary:foundData?.academics.primary,
                    secondary:foundData?.academics.secondary,
                    tertiary:foundData?.academics.tertiary,
                   // certiticate:priestimages[1] || 'lol'
                },
                //passport:priestimages[0] || 'lol',
            })
        }
    },[foundData, priestimages, type, setValue]);

  return (
    <div className=' bg-white/80 px-12 rounded-md py-10 '>
        <h2 className=' text-2xl py-3 font-semibold'> Edit Priests Data </h2>
        <form method='post' encType='multipart/form-data' onSubmit={handleSubmit(onUpdateSubmit)} className=' grid grid-cols-4 gap-5'>
            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.title" className="block py-1 ms-1 font-semibold text-gray-800">Title</label>
                <div className=' relative'>
                    <UserIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                    <input
                        type="text"
                        {...register("details.title", { required: true, maxLength: 20 })}
                        placeholder="Title"
                        className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                {errors?.details?.title && <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p>}
            </div>
            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.fullname" className="block py-1 ms-1 font-semibold text-gray-800">Full Name</label>
                <div className=' relative'>
                    <UserIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                <input
                    {...register("details.fullname")}  
                    type="text"
                    placeholder="Enter your Full Name"
                    className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                </div>
                {errors?.details?.fullname && <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p>}
            </div>
            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.email" className="block py-1 ms-1 font-semibold text-gray-800">Email Address</label>
                <div className=' relative'>
                    <EnvelopeIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                    <input
                        {...register("details.email", { required: true })}
                        type="email"
                        placeholder="Enter your Email"
                        className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                {errors.details?.email && <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p>}
            </div>
            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.DateOfBirth" className="block py-1 ms-1 font-semibold text-gray-800">Date of Birth</label>
                <div className=' relative'>
                    <CalendarIcon className=" font-bold h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                    <input
                        {...register("details.DateOfBirth")}
                        type="date"
                        placeholder="Enter your Date of Birth"
                        className="w-full pl-16 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                {errors?.details?.DateOfBirth && <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p>}
            </div>
            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.PlaceOfBirth" className="block py-1 ms-1 font-semibold text-gray-800">Place of Birth</label>
                <div className=' relative'>
                    <HomeModernIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                    <input
                        {...register("details.PlaceOfBirth", {required: true})}
                        type="text"
                        placeholder="Enter your Place of Birth"
                        className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                {errors?.details?.PlaceOfBirth && <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p>}
            </div>
            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.gender" className="block py-1 ms-1 font-semibold text-gray-800">Gender</label>
                <div className=' relative'>
                    <IdentificationIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                    <select
                        {...register("details.gender")} defaultValue={'male'}
                        placeholder="Enter your Gender"
                        className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    >
                        <option >Enter your Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                {errors?.details?.gender && <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p>}
            </div>

            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.DateOfOrdination" className="block py-1 ms-1 font-semibold text-gray-800">Date of Ordination</label>
                <div className=' relative'>
                    <CalendarIcon className=" font-bold h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                    <input
                        {...register("details.DateOfOrdination", { required: true })}
                        type="date"
                        placeholder="Enter your Date of Ordination"
                        className="w-full pl-16 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                {errors?.details?.DateOfOrdination && <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p>}
            </div>

            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.tel" className="block py-1 ms-1 font-semibold text-gray-800">Phone Number</label>
                <div className=' relative'>
                    <PhoneIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                    <input
                        {...register("details.tel", { required: "This is required", pattern:"[0-9]{4}-[0-9]{3}-[0-9]{4}" })}
                        type="tel"
                        pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
                        placeholder="Eg. 0701-123-4567"
                        className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                {errors.details?.tel && <p className=' ms-4 text-sm text-red-500 font-medium'>{errors?.details?.tel?.message}</p>}
            </div>

            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.address" className="block py-1 ms-1 font-semibold text-gray-800">Home Address</label>
                <div className=' relative'>
                    <MapIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                <input
                    {...register("details.address", {required:'This is required'})}  
                    type="text"
                    placeholder="Enter your Home Address"
                    className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                </div>
                {errors?.details?.address && <p className=' ms-4 text-sm text-red-500 font-medium'>{errors?.details?.address?.message}</p>}
            </div>

            <div className=" relative md:col-span-2 col-span-4">
                <label htmlFor="details.currentParish" className="block py-1 ms-1 font-semibold text-gray-800">Current Parish</label>
                <div className=' relative'>
                    <BuildingOfficeIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                <input
                    {...register("details.currentParish", {required:'This is required'})}  
                    type="text"
                    placeholder="Enter your Current Parish"
                    className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                </div>
                {errors?.details?.address && <p className=' ms-4 text-sm text-red-500 font-medium'>{errors?.details?.currentParish?.message}</p>}
            </div>
 
            
            <div className=' my-3 col-span-4'>
                <hr className=' bg-primary py-[1px]'/>
            </div>

            <div className=' my-0.5 inline-flex items-center gap-x-4 col-span-4'>
                <h2 className=' text-2xl font-semibold'>Academic Qualifications</h2>
                <button onClick={()=> setIsClose(prev => !prev)} type='button'><ChevronDownIcon className={` ${ isClose ? 'transform rotate-180':' '} w-6 h-6 text-gray-700`}/></button>
            </div>
            <div className={`${ isClose ? 'h-0 hidden':'h-auto '} transition-all ease-in-out duration-1000   relative col-span-4`} >
               <div className='  relative gap-5 grid-cols-4 grid'>
                    <div className=" relative md:col-span-2 col-span-4">
                        <label htmlFor="details.fullname" className="block py-1 ms-1 font-semibold text-gray-800">Primary School</label>
                        <div className=' relative'>
                            <AcademicCapIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                        <input
                            {...register("details.academics.primary", {required:true})}  
                            type="text"
                            placeholder="Enter your Primary school"
                            className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        </div>
                        {errors?.details?.academics?.primary && <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p>}
                    </div>

                    <div className=" relative md:col-span-2 col-span-4">
                        <label htmlFor="details.academics.secondary" className="block py-1 ms-1 font-semibold text-gray-800">Secondary School</label>
                        <div className=' relative'>
                            <AcademicCapIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                        <input
                            {...register("details.academics.secondary",)}  
                            type="text"
                            placeholder="Enter your Secondary school"
                            className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        </div>
                        {/* <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p> */}
                    </div>

                    <div className=" relative md:col-span-2 col-span-4">
                        <label htmlFor="details.academics.secondary" className="block py-1 ms-1 font-semibold text-gray-800">Tertiary Institution</label>
                        <div className=' relative'>
                            <AcademicCapIcon className="w-6 h-6 text-gray-900 absolute left-3 inset-y-0 my-auto"/>
                        <input
                            {...register("details.academics.tertiary",)}  
                            type="text"
                            placeholder="Enter your Tertiary Institution"
                            className="w-full pl-12 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        </div>
                        {/* <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p> */}
                    </div>

                    <div className=" relative md:col-span-2 col-span-4">
                        <label htmlFor="details.academics.certiticate" className="block py-1 ms-1 font-semibold text-gray-800">Upload Certificate</label>
                        <div className=' relative w-full  pr-3  text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'>
                            <span className=' relative z-10 rounded-s-md py-2 px-[13px] inline-block text-white h-full bg-primary'>Choose File</span>
                        <input className="block bg-opacity-10 top-0.5  absolute w-[98%] text-lg text-gray-900 rounded-lg cursor-pointer bg-gray-50 
                         focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="large_size" {...register("details.academics.certiticate", {required:"This is required"})} type="file" accept='image/jpeg, image/png'/>
                        </div>
                        {errors?.details?.academics?.certiticate && <p className=' ms-4 text-sm text-red-500 font-medium'>This is required</p>}
                    </div>

               </div>
            </div>

            <div className=' my-0.5 col-span-4'>
                <label htmlFor="details.passport" className="block py-1 ms-1 font-semibold text-gray-800">Upload Passport Photograph</label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col relative items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 1MB)</p>
                        </div>
                        <input accept='image/*' {...register('details.passport', {required:"This is required", validate: {
                                            maxSize: (value) => value[0]?.size <= 1024 * 1024 || "File size must be less than 1MB",
                                            isImage: (value) => value[0]?.type.startsWith('image/') || "Only image files are allowed"
                                        }})} 
                        id="dropzone-file" type="file" className=" bg-transparent" />
                        <span className=' left-[36%] bottom-9 absolute px-[52px] py-5 bg-gray-50'></span>
                    </label>
                </div> 
                {errors?.details?.passport && <p className=' ms-4 text-sm text-red-500 font-medium'>{errors?.details?.passport?.message}</p>}
            </div>
            <div className=' col-span-4'>
                <button className=' bg-primary text-white font-medium text-lg px-6 py-2 rounded-md' type='submit'>{isSubmitting ? '...loading':type}</button>
            </div>
        </form>
    </div>
  )
}
Updater.propTypes = {
    type:PropTypes.string.isRequired,
    //datay:PropTypes.object,
    setAlertInfo:PropTypes.func,
    //multimedia: PropTypes.array,
}

export default Updater