import {  useLocation, Link, Form, useLoaderData, useNavigation} from 'react-router-dom'
import BgImage from '../assets/james.jpg'
//import UsegetAllPriests from '../Hooks/usegetAllPriests';
import { useContext, useEffect, useState} from 'react';

import { PriestContext } from '../Context/useContextt';
import { RotatingLines } from 'react-loader-spinner';
import AnimatedPage from '../Layouts/AnimatedPage';
import { DeleteModal } from '../Components/DeleteModal';


export const ALoader = async({request}) => {
  const url = new URL(request.url);
  const searchquery = url.searchParams.get('q');
  return {searchquery}
}

const Directory = () => {
  const {allPriestsImages, allPriests} = useContext(PriestContext)
  const {searchquery} = useLoaderData()
  const {pathname} = useLocation();
  //const {allPriests:{gottenPriests}} = UsegetAllPriests();
  const navigation = useNavigation();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')
  //console.log('searching:', searching);

  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriest, setSelectedPriest] = useState(null);

  useEffect(()=> {
    document.getElementById('query').value = searchquery;

    let result;

    if(searchquery == '' || searchquery == null){
      setFilteredData(allPriests);
      return
    }

    //console.log('searching', searchquery)
      result = allPriests?.filter(item => item?.fullname?.toLowerCase()?.includes(searchquery?.toLowerCase()))
      setFilteredData(result)

   
  },
    [searchquery,allPriests])

    const handleDeleteClick =(item)=>{
      setSelectedPriest(item);
      setIsOpen(true);
    }



  
 
  return (
    <AnimatedPage>
       <section className={`${pathname == '/directory' ? 'mt-24 relative':'mt-14 relative'}` }>
        <div style={{backgroundImage:`url(${BgImage})`}} className=" bg-blend-overlay bg-opacity-80 bg-stone-900 px-12 bg-cover bg-center bg-no-repeat py-12 ">
          <div className=' max-w-7xl mx-auto'>
            <h2 className=' text-5xl font-semibold text-white'>Priests Directory</h2>
          </div>   
        </div>

        <div className=" w-full">
          <Form role='search' className="max-w-xl py-0.5 flex gap-x-2 px-4 mx-auto mt-12">
              <div className="relative w-full ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                      type="search"
                      name='q'
                      id='query'
                      defaultValue={searchquery}
                      placeholder="Search"
                      className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                  />
              </div>
              <button type='submit' className=' inline-flex gap-x-2 hover:bg-primary/75 transition-all text-white py-3 rounded-md px-5 bg-primary shadow-md font-medium'>
                Search
                {navigation.state == 'loading' && <RotatingLines visible={true} height="25" strokeColor='#fff' width="25" strokeWidth="5" animationDuration="0.75"
                 wrapperStyle={{}} wrapperClass=""/>}
              </button>
          </Form>
         {searchquery && filteredData && <h1 className=' text-primary my-2 text-lg font-medium text-center'>{filteredData.length > 1 ? `${filteredData.length} Search Results`:`${filteredData.length} Search Result`}</h1>}
        </div>

        <ul className="mt-12 divide-y">
            {
                filteredData?.map((item, idx) => (
                    <li key={idx} className="py-5 flex items-start px-4 justify-between">
                        <div className="flex gap-3">
                            <img src={allPriestsImages[item.priestID]} className="flex-none w-12 h-12 rounded-full" />
                            <div>
                                <span className="block text-sm text-gray-700 font-semibold">{item?.title} {item?.fullname}</span>
                                <span className="block text-sm text-gray-600">{item.email}</span>
                            </div>
                        </div>
                        <div className=' space-x-3'>
                          {pathname.startsWith('/directory') ? <Link to={`/directory/detail/${item.priestID}`} 
                          className="text-slate-100 text-sm border rounded-lg px-3 py-2 duration-150 bg-slate-800  hover:bg-slate-800/75">
                            View</Link>
                            :
                            <Link to={`/dashboard/directory/detail/${item.priestID}`} 
                          className="text-slate-100 text-sm border rounded-lg px-3 py-2 duration-500 transition-all bg-slate-800 hover:bg-slate-800/75">
                            View</Link>
                            }
                      {pathname !== '/directory' && <Link to={`/dashboard/update-registry/${item.priestID}`} 
                            className="text-primary border-primary shadow-md text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">
                              Update</Link>}

                              {pathname !== '/directory' &&  <button onClick={()=> handleDeleteClick(item)}
                            className="text-white text-sm border rounded-lg px-3 py-2 duration-150 bg-red-700 hover:bg-red-700/70">
                              Delete</button>}
                        </div>
                        
                    </li>
                ))
            }
        </ul>
        <DeleteModal open={isOpen} setIsOpen={setIsOpen} data={selectedPriest}/>
      </section>
    </AnimatedPage>
     
  )
}

export default Directory