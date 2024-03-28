import { Link, useLocation } from 'react-router-dom'
import LogoImg from '../../assets/cropped-AB-Ugo-Logo-1-removebg.png'
import { mainNavigation } from '../../lib/navigation'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {Bars3BottomRightIcon} from '@heroicons/react/24/solid'

const TopOffset = 50;
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

const Navbar = () => {
    const currentLocation = useLocation().pathname;
    const [open, setOpen] = useState(false)

    const [navBgChange, setNavBgChange] = useState(false)

    const handleScroll = ()=>{
        if(window.scrollY >= TopOffset){
            setNavBgChange(true)
        }else{
            setNavBgChange(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll)

        return ()=>{
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

  return (
    <nav
      className={` top-0 z-30 fixed w-full py-1 ${
        currentLocation === "/" && navBgChange
          ? " bg-white shadow-2xl"
          : currentLocation !== "/"
          ? "bg-slate-50 shadow-lg"
          : " bg-tranparent"
      }`}
    >
      <div className=" mx-auto max-w-7xl gap-x-14 px-4  flex justify-between items-center">
        <Link to={"/"}>
          <div className=" gap-x-2 flex items-center">
            <img
              className=" w-[80px] md:w-[120px] object-contain h-20 md:h-24"
              src={LogoImg}
              alt="logo"
            />
            <h1
              className={` ${
                currentLocation === "/" && navBgChange
                  ? "text-slate-950"
                  : currentLocation !== "/"
                  ? "text-slate-950"
                  : " text-white"
              } text-[20px] md:text-2xl lg:text-[28px] 2xl:text-[31px] font-bold`}
            >
              Catholic Archdiocese of Owerri
            </h1>
          </div>
        </Link>
        <div className="">
          <ul
            className={`${
              currentLocation === "/" && navBgChange
                ? "text-slate-950"
                : currentLocation !== "/"
                ? "text-slate-950"
                : "text-white"
            } hidden transition-all duration-500 ease-in-out lg:flex gap-x-3`}
          >
            {mainNavigation.map((item, idx) => (
              <li
                className={` ${
                  item.url === currentLocation && navBgChange
                    ? " text-primary border-b-2 border-b-primary"
                    : item.url !== currentLocation && navBgChange
                    ? ""
                    : item.url === currentLocation && currentLocation !== "/"
                    ? "border-b-2 border-b-primary text-primary"
                    : item.url !== currentLocation && currentLocation !== "/"
                    ? ""
                    : item.url === currentLocation &&
                      currentLocation === "/" &&
                      !navBgChange
                    ? "border-b-2 border-b-white"
                    : ""
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
        <div className="flex lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className={` ${ currentLocation === "/" && navBgChange === false ? 'border-white':  ' border-primary'}transition-all rounded-md p-2 border`}
          >
            <Bars3BottomRightIcon className={`${currentLocation === "/" && navBgChange === false ? 'fill-white':'fill-primary'}  transition-all duration-500 ease-in-out8 w-8 `} />
          </button>
        </div>
        <div className=" hidden items-center gap-x-2 lg:flex md:justify-end">
          {  currentUser &&  
                <Link to={'/dashboard'} className=' border-2 shadow-sm border-primary py-2 px-3 rounded-full'>
                  <h1 className={`${currentLocation == '/' ? 'text-white':'text-slate-900'} text-lg text-center font-bold `}>{currentUser?.initials}</h1>
                </Link>
          }  
          <button className=" bg-primary text-[13px] py-[13px] px-[40px] text-white ">
            Give Now
          </button>
        </div>
      </div>

      {/* mobile sidenav */}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                         
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="">
                          <ul
                            className={`${
                              currentLocation === "/" && navBgChange
                                ? "text-slate-950"
                                : currentLocation !== "/"
                                ? "text-slate-950"
                                : "text-slate-950"
                            } space-y-3`}
                          >
                            {mainNavigation.map((item, idx) => (
                              <li
                              onClick={()=> setOpen(false)}
                                className={` ${
                                  item.url === currentLocation ? " text-primary border-b-2 border-b-primary"
                                    : 
                                   "border-b-2 border-b-white"
                                    
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
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </nav>
  );
}

export default Navbar


    

