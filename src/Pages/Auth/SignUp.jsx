import { useForm } from 'react-hook-form'
import Logo from '../../assets/cropped-AB-Ugo-Logo-1-removebg.png'
import { Link, useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../../Api/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import AnimatedPage from '../../Layouts/AnimatedPage'
import { useState } from 'react'
import Alerts from '../../Components/Alerts'

export const SignUp = () => {

    const { register, handleSubmit, formState:{errors}} = useForm({
        defaultValues:{
                email:'', password:'', rememberMe:false   
        }
    })

    const navigate = useNavigate()

    const [registerStatus, setRegisterStatus] = useState({message:'', status:false, color:'' })

    const auth = firebaseAuth;

    const onSubmit = async(data) => {

        try{
            const response = await createUserWithEmailAndPassword(auth, data?.email, data?.password);
            console.log(response);
            setRegisterStatus({message:`${response.user.email} registered sucessfully`, status:true, color:'green' })
            setTimeout(()=> navigate('/dashboard'), 3000)
        }catch(error){
            const {code, message} = error;
            console.log(code, message);
            setRegisterStatus({message:code, status:true, color:'red' })
        }

    }
    return (
        <AnimatedPage>
            <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            {registerStatus.status && <Alerts alertInfo={registerStatus} setAlertInfo={setRegisterStatus} />}
            <div className="max-w-sm w-full text-gray-600 space-y-5">
                <div className="text-center pb-8">
                    <img src={Logo} width={80} className="mx-auto" />
                    <div className="mt-5">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Register</h3>
                    </div>
                </div>
                <form
                    method='post' encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <label htmlFor='email' className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: 'This is required'})}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        {errors?.email && <p className=' ms-4 text-sm text-red-500 font-medium'>{errors?.email?.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='password' className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: true, maxLength: 20 })}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                        {errors?.password && <p className=' ms-4 text-sm text-red-500 font-medium'>{errors?.password?.message}</p>}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-x-3">
                            <input {...register("rememberMe")} type="checkbox" id="remember-me-checkbox" className="checkbox-item peer hidden" />
                            <label
                                htmlFor="remember-me-checkbox"
                                className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                            >
                            </label>
                            <span>Remember me</span>
                        </div>
                        <Link to="/" className="text-center text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                    </div>
                    <button type='submit'
                        className="w-full px-4 py-2  flex items-center justify-center gap-x-3 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                     <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_17_40)">
                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                        Signup
                    </button>
                </form>
                <p className="text-center">Don&#39;t have an account? <a href="javascript:void(0)" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
            </div>
        </main>
        </AnimatedPage>
        
    )
}