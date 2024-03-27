import { Link, Outlet, useLocation } from 'react-router-dom'
import Logo from '../assets/cropped-AB-Ugo-Logo-1-removebg.png'
import { dashNavigation } from '../lib/navigation'
import AnimatedPage from './AnimatedPage'
import { firebaseAuth } from '../Api/firebase'
import { signOut } from 'firebase/auth'
import { Fragment, useState } from 'react'
import Alerts from '../Components/Alerts'
import LiveTimeComponent from '../Components/TimeComp'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'

const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

const DashboardLayout = () => {
  const {pathname} = useLocation();

  const [signoutStatus, setSignoutStatus] = useState({message:'', status:false, color:''})

  const [mobileToogle, setMobileToogle] = useState(false);


  const logOutWithGoogle =async()=>{
    const auth = firebaseAuth
    try{
      await signOut(auth);
      setSignoutStatus({message:'Signed-out successfully', status:true, color:'green'})
      setTimeout(()=>  window.location.assign('/'), 2000);
    }catch(error){
      setSignoutStatus({message:'Signed-out failed', status:true, color:'red'})
     
    }

  }

  return (
    <AnimatedPage>
      <main>
        <section className=" relative h-screen flex gap-3">
          <div
            className={` lg:block hidden left-0 px-3 py-4 bottom-0 top-0 fixed w-0 lg:w-[20%] bg-slate-800`}
          >
            <Link to={"/"}>
              <div className=" flex items-center gap-x-2">
                <img src={Logo} alt="logo" className=" w-14 object-contain" />
                <h1 className="text-sm font-bold text-white">
                  Catholic Archdiocese of Owerri
                </h1>
              </div>
            </Link>

            <div>
              <ul className="mt-10 px-3">
                {dashNavigation.map((item) => (
                  <Link key={item.title} to={item.url}>
                    <li
                      className={` ${
                        pathname === item.url
                          ? "text-primary border-b-2 border-primary"
                          : "text-white"
                      } hover:text-primary hover:translate-x-2 duration-700 transition-all text-base py-3 font-semibold`}
                    >
                      {item.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className=" bottom-3 absolute w-4/5 left-[12px]">
              <button
                onClick={logOutWithGoogle}
                className="bg-primary block w-full hover:bg-primary/65 transition-all ease-out duration-500 text-white py-2 px-3 rounded-md mt-10"
              >
                Logout
              </button>
            </div>
          </div>
          <div
            className={` relative col-span-9 lg:ml-[20%] ml-0 w-[100%] lg:w-[80%] bg-slate-50`}
          >
            <div className=" fixed w-[100%] lg:w-[80%] z-50 bg-slate-50 right-0 top-0   py-2 px-10 gap-3 items-center flex justify-between shadow-md">
              <button
                onClick={() => setMobileToogle(true)}
                className=" lg:hidden inline-block  border border-primary rounded-md p-2"
              >
                <Bars3BottomLeftIcon
                  className=" hover:rotate-90 duration-700 transition-all ease-in-out"
                  height={28}
                  width={28}
                />
              </button>
              <div>
                <LiveTimeComponent />
              </div>
              <div className=" flex items-center gap-4">
                <span className=" border-2 shadow-sm border-primary py-2 px-3 rounded-full">
                  <h1 className="text-slate-900 text-lg text-center font-bold ">
                    {currentUser?.initials}
                  </h1>
                </span>
                <h2 className=" font-semibold text-base">
                  {currentUser?.email}
                </h2>
              </div>
            </div>
            <div>
              {signoutStatus.status && (
                <Alerts
                  alertInfo={signoutStatus}
                  setAlertInfo={setSignoutStatus}
                />
              )}
              <Outlet />
            </div>
          </div>
        </section>

        {/* responsive navbar */}

        <Transition.Root show={mobileToogle} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setMobileToogle}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                  {/* continue */}
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-l-0"
                    enterTo="translate-l-full"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-l-full"
                    leaveTo="translate-l-0"
                  >
                    <Dialog.Panel className="pointer-events-auto relative  max-w-md">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute right-0 top-0 -mr-8 flex pl-2 pt-4 sm:-mr-10 sm:pl-4">
                          <button
                            type="button"
                            className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setMobileToogle(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      <div className="flex h-full flex-col overflow-hidden bg-slate-800 py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <Dialog.Title>
                            <Link to={"/"}>
                              <div className=" flex items-center gap-x-2">
                                <img
                                  src={Logo}
                                  alt="logo"
                                  className=" w-14 object-contain"
                                />
                                <h1 className="text-sm font-bold text-white">
                                  Catholic Archdiocese of Owerri
                                </h1>
                              </div>
                            </Link>
                          </Dialog.Title>
                        </div>
                        <div className="relative mt-20 flex-1 px-4 sm:px-6">
                          <div className="">
                            <ul className={`space-y-3`}>
                              {dashNavigation.map((item, idx) => (
                                <li
                                  className={` ${
                                    item.url === pathname
                                      ? " text-primary border-b-2 border-b-primary"
                                      : " text-white"
                                  } p-1 font-semibold`}
                                  key={idx}
                                >
                                  <Link className="" to={item.url}>
                                    {item.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="px-4">
                          <button
                            onClick={logOutWithGoogle}
                            className="bg-primary block w-full hover:bg-primary/65 transition-all ease-out duration-500 text-white py-2 px-3 rounded-md mt-10"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </AnimatedPage>
  );
}

export default DashboardLayout