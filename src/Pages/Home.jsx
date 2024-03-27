import { useState, useEffect } from 'react';
import Image1 from '../assets/brandon-morgan-GxbFfu6yRN0-unsplash-min.jpg'
import Image2 from '../assets/dawn-mcdonald-LrwpNJ2yI-A-unsplash.jpg'
import {ChevronRightIcon, ChevronLeftIcon} from '@heroicons/react/24/outline'
import AnimatedPage from '../Layouts/AnimatedPage';

const contento =[
  {image: Image1, title:'Catholic Diocese of Owerri Priests Database'},
  {image: Image2, title:'Search For Priests in the Owerri Diocese'}
]

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % contento.length);
    }, 10000); // Change transition time as needed

    return () => clearInterval(interval);
  }, []);

 
  return (
    <AnimatedPage>
      <div>
      <section style={{backgroundImage:`url(${contento[currentImageIndex].image})`}} className={` ${currentImageIndex === 0 ? ' bg-opacity-0':' bg-opacity-100'} bg-blend-overlay bg-opacity-80 bg-stone-900 relative flex md:items-center inset-0 bg-cover bg-center transition-all duration-1000 h-screen`}>
        <div className=' mx-auto justify-between items-center gap-5 flex max-w-7xl'>
          <div className=' hidden sm:block'>
            <button onClick={()=> setCurrentImageIndex((prev) =>(prev === 0 ? contento.length - 1 : prev - 1))}><ChevronLeftIcon className=' text-white w-16 h-16'/></button>
          </div>
          <div>
            <h1 className=' text-center text-white font-bold text-wrap text-6xl  md:text-7xl'>{contento[currentImageIndex].title}</h1>
          </div>
          <div className=' hidden sm:block'>
          <button onClick={()=> setCurrentImageIndex((prev) =>(prev === contento.length - 1 ? 0 : prev + 1))}><ChevronRightIcon className=' text-white w-16 h-16'/></button>
          </div>

        </div>
        <div className=' absolute bottom-3 w-full left-0  py-1 flex justify-center gap-x-2'>
          {contento.map((_, index) => ( <span key={index} className={`${ index === currentImageIndex ? 'bg-white':'bg-slate-900'} rounded-full h-3 w-3`} ></span>))}
        </div>
      </section>

      <section className="2xl:py-32 my-10 py-20">
          <div className="max-w-screen-xl mx-auto md:px-8">
              <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                  <div className="flex-1 sm:hidden lg:block">
                      <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" className="md:max-w-lg sm:rounded-lg" alt="" />
                  </div>
                  <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                      <h3 className="text-primary font-semibold">
                          Professional services
                      </h3>
                      <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                          Build your SaaS solution with help from our experts
                      </p>
                      <p className="mt-3 text-gray-600">
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                      </p>
                      <a href="#" className="inline-flex gap-x-1 items-center text-primary hover:text-indigo-500 duration-150 font-medium">
                          Learn more
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                          </svg>
                      </a>
                  </div>
              </div>
          </div>
      </section>

    </div>
    </AnimatedPage>
    
  )
}

export default Home